import {
    parseExpressionAt,
    tokenizer,
    type ArrayExpression,
    type CallExpression,
    type ConditionalExpression,
    type Literal,
    type LogicalExpression,
    type Node,
    type ObjectExpression,
    type SequenceExpression,
    type TemplateLiteral,
    type Token,
    type UnaryExpression
} from "acorn"

interface TransformerOptions {
    /**
     * Callee name to be scanned.
     *
     * @default "twg"
     * @see {@link https://github.com/hoangnhan2ka3/twg/blob/main/docs/options.md#-custom-callee}
     */
    callee?: string | string[]
    /**
     * The divider between the key and class values.
     *
     * @default ":"
     * @see {@link https://github.com/hoangnhan2ka3/twg/blob/main/docs/options.md#-custom-separator}
     */
    separator?: string
    /**
     * Printing debug messages in console if there are any warnings or errors.
     *
     * @default false
     * @see {@link https://github.com/hoangnhan2ka3/twg/blob/main/docs/options.md#-turn-on-debug}
     */
    debug?: boolean
}

const WSPC_REGEX = /\S+/g

interface WalkState {
    cls: string[]
    sep: string
}

const addString = (state: WalkState, pfx: string, val: string) => {
    if (!val) return
    if (
        !val.includes(" ") &&
        !val.includes("\n") &&
        !val.includes("\t") &&
        !val.includes("\r")
    ) {
        state.cls.push(pfx + val)
        return
    }
    const parts = val.match(WSPC_REGEX)
    if (parts) {
        for (let i = 0, len = parts.length; i < len; i++) {
            state.cls.push(pfx + parts[i]!)
        }
    }
}

// KHÔI PHỤC NATIVE TOKENIZER: Bất tử trước mọi Edge Cases (Regex, lồng Template Literal, Comment phức tạp)
const getEndIndex = (content: string, startIndex: number): number => {
    try {
        const tokens = tokenizer(content.slice(startIndex), {
            ecmaVersion: "latest",
            sourceType: "module"
        })

        let depth = 0
        for (const token of tokens as Iterable<Token>) {
            if (token.type.label === "(") depth++
            else if (token.type.label === ")") {
                depth--
                if (depth === 0) return startIndex + token.end
            }
        }
    } catch {
        return -1
    }
    return -1
}

const walk = (node: Node | null | undefined, pfx: string, state: WalkState) => {
    if (!node) return

    switch (node.type) {
        case "Literal": {
            const lit = node as Literal
            if (typeof lit.value === "string") {
                addString(state, pfx, lit.value)
            } else if (typeof lit.value === "number" && lit.value !== 0) {
                state.cls.push(pfx + String(lit.value))
            }
            break
        }
        case "UnaryExpression": {
            const un = node as UnaryExpression
            if (un.operator === "-" && un.argument.type === "Literal") {
                const arg = un.argument
                if (typeof arg.value === "number" && arg.value !== 0) {
                    state.cls.push(pfx + String(-arg.value))
                }
            }
            break
        }
        case "TemplateLiteral": {
            const tpl = node as TemplateLiteral
            for (let i = 0, len = tpl.quasis.length; i < len; i++) {
                addString(state, pfx, tpl.quasis[i]!.value.raw)
            }
            for (let i = 0, len = tpl.expressions.length; i < len; i++) {
                walk(tpl.expressions[i], pfx, state)
            }
            break
        }
        case "ArrayExpression": {
            const arr = node as ArrayExpression
            for (let i = 0, len = arr.elements.length; i < len; i++) {
                walk(arr.elements[i], pfx, state)
            }
            break
        }
        case "ObjectExpression": {
            const obj = node as ObjectExpression
            for (let i = 0, len = obj.properties.length; i < len; i++) {
                const propNode = obj.properties[i]!
                if (propNode.type !== "Property") continue
                const prop = propNode
                if (prop.computed) continue

                let keyStr = ""
                if (prop.key.type === "Identifier") {
                    keyStr = prop.key.name
                } else if (prop.key.type === "Literal") {
                    keyStr = String(prop.key.value)
                }
                if (!keyStr && keyStr !== "") continue

                const val = prop.value

                let exactNextPfx = pfx
                if (keyStr === "") {
                    exactNextPfx = pfx + state.sep
                } else {
                    exactNextPfx =
                        pfx + keyStr + (keyStr.endsWith(state.sep) ? "" : state.sep)
                }

                if (val.type === "Literal") {
                    const lit = val
                    if (typeof lit.value === "string") {
                        addString(state, exactNextPfx, lit.value)
                    }
                    // Bất kỳ Literal truthy nào (!= 0, != false) đều in ra Key
                    else if (lit.value) {
                        state.cls.push(pfx + keyStr)
                    }
                    continue
                }

                if (val.type === "UnaryExpression") {
                    const un = val
                    if (un.operator === "-" && un.argument.type === "Literal") {
                        const argLit = un.argument
                        // Loại bỏ -0 (falsy)
                        if (argLit.value === 0) {
                            continue
                        }
                    }
                    // Mọi Unary khác (-100, !isValid) được coi là Truthy Flag
                    state.cls.push(pfx + keyStr)
                    continue
                }

                if (
                    val.type === "LogicalExpression" ||
                    val.type === "ConditionalExpression" ||
                    val.type === "SequenceExpression"
                ) {
                    const lenBefore = state.cls.length
                    walk(val, exactNextPfx, state)
                    if (state.cls.length === lenBefore) {
                        state.cls.push(pfx + keyStr)
                    }
                    continue
                }

                if (
                    val.type === "ObjectExpression" ||
                    val.type === "ArrayExpression" ||
                    val.type === "TemplateLiteral"
                ) {
                    walk(val, exactNextPfx, state)
                    continue
                }

                state.cls.push(pfx + keyStr)
            }
            break
        }
        case "ConditionalExpression": {
            const cond = node as ConditionalExpression
            walk(cond.consequent, pfx, state)
            walk(cond.alternate, pfx, state)
            break
        }
        case "LogicalExpression": {
            const log = node as LogicalExpression
            walk(log.left, pfx, state)
            walk(log.right, pfx, state)
            break
        }
        case "SequenceExpression": {
            const seq = node as SequenceExpression
            for (let i = 0, len = seq.expressions.length; i < len; i++) {
                walk(seq.expressions[i], pfx, state)
            }
            break
        }
        case "CallExpression": {
            const callE = node as CallExpression
            for (let i = 0, len = callE.arguments.length; i < len; i++) {
                walk(callE.arguments[i], pfx, state)
            }
            break
        }
    }
}

/**
 * Transforms the content before Tailwind scans/extracting its classes.
 *
 * @param options `callee`, `separator`, `debug`. See [docs](https://github.com/hoangnhan2ka3/twg/blob/main/docs/options.md#transformer-options).
 * @param content The content already provided by `content.files` in `tailwind.config`.
 *
 * @returns A function that processes class values based on the options.
 */
function transformer({
    callee = "twg",
    separator = ":",
    debug = false
}: TransformerOptions = {}) {
    if (!callee || (Array.isArray(callee) && callee.length === 0)) {
        return (content: string) => content
    }

    const calleeList = Array.isArray(callee) ? callee : [callee]
    const validCallees = calleeList.filter(Boolean)

    if (validCallees.length === 0) {
        return (content: string) => content
    }

    const regex = new RegExp(`\\b(?:${validCallees.join("|")})\\s*\\(`, "g")
    const sep = separator

    return (content: string): string => {
        const replacements: { start: number; end: number; value: string }[] = []
        let match: RegExpExecArray | null

        regex.lastIndex = 0

        while ((match = regex.exec(content)) !== null) {
            try {
                const endIndex = getEndIndex(content, match.index)
                if (endIndex === -1) continue

                const isolatedCode = content.slice(match.index, endIndex)

                const ast = parseExpressionAt(isolatedCode, 0, {
                    ecmaVersion: "latest",
                    sourceType: "module"
                })

                if (ast.type !== "CallExpression") continue

                const state: WalkState = {
                    cls: [],
                    sep
                }

                const callExpr = ast
                for (let i = 0, len = callExpr.arguments.length; i < len; i++) {
                    walk(callExpr.arguments[i], "", state)
                }

                replacements.push({
                    start: match.index,
                    end: endIndex,
                    value: `"${state.cls.join(" ")}"`
                })
            } catch (e) {
                if (debug) console.warn("[TWG] Skip:", (e as Error).message)
            }
        }

        let output = content
        for (let i = replacements.length - 1; i >= 0; i--) {
            const { start, end, value } = replacements[i]!
            output = output.substring(0, start) + value + output.substring(end)
        }
        return output
    }
}

export { transformer, type TransformerOptions }
