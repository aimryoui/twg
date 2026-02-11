import {
    parseExpressionAt,
    type CallExpression,
    type Literal,
    type Node,
    type UnaryExpression
} from "acorn"
import { recursive, type RecursiveVisitors } from "acorn-walk"

interface VisitorState {
    classes: string[]
    prefix: string
    sep: string
}

type SimpleValue = string | number | boolean | null

const FLAG_TYPES = new Set([
    "Identifier",
    "CallExpression",
    "MemberExpression",
    "BinaryExpression",
    "UnaryExpression",
    "NewExpression",
    "UpdateExpression",
    "ChainExpression",
    "ArrowFunctionExpression",
    "FunctionExpression",
    "ClassExpression"
])

const LOGIC_TYPES = new Set([
    "LogicalExpression",
    "ConditionalExpression",
    "SequenceExpression"
])

/**
 * Get next prefix.
 *
 * @param currentPrefix Current prefix.
 * @param key Key.
 * @param sep Separator.
 *
 * @returns String.
 */
const getNextPrefix = (
    currentPrefix: string,
    key: string,
    sep: string
): string => {
    if (!currentPrefix) return key === "" ? sep : key
    const p = currentPrefix.endsWith(sep) ? currentPrefix : currentPrefix + sep
    return p + key
}

/**
 * Add class to the list.
 *
 * @param ctx Context.
 * @param val Value.
 */
const addClass = (ctx: VisitorState, val: string) => {
    const { prefix, sep } = ctx
    const p = prefix ? (prefix.endsWith(sep) ? prefix : prefix + sep) : ""
    ctx.classes.push(p + val)
}

/**
 * Get simple value.
 *
 * @param node Node.
 *
 * @returns Value.
 */
const getSimpleValue = (node: Node): SimpleValue => {
    if (node.type === "Literal") {
        const val = (node as Literal).value
        if (
            typeof val === "string" ||
            typeof val === "number" ||
            typeof val === "boolean" ||
            val === null
        ) {
            return val
        }
    }
    // Handle unary (-1)
    if (node.type === "UnaryExpression") {
        const u = node as UnaryExpression
        if (u.operator === "-" && u.argument.type === "Literal") {
            const val = u.argument.value
            return typeof val === "number" ? -val : null
        }
    }
    return null
}

/**
 * Find closing parenthesis.
 *
 * @param str String.
 * @param startIndex Start index.
 *
 * @returns Index.
 */
const findClosingParenthesis = (str: string, startIndex: number): number => {
    let depth = 0
    let inString = false
    let quote = ""
    const len = str.length

    let i = str.indexOf("(", startIndex)
    if (i === -1) return -1

    depth = 1
    i++

    for (; i < len; i++) {
        const char = str[i]
        if (inString) {
            if (char === "\\") i++
            else if (char === quote) inString = false
            continue
        }
        if (char === '"' || char === "'" || char === "`") {
            inString = true
            quote = char
            continue
        }
        if (char === "(") depth++
        else if (char === ")") {
            depth--
            if (depth === 0) return i + 1
        }
    }
    return -1
}

const visitors: RecursiveVisitors<VisitorState> = {
    Literal(node, state) {
        const n = node
        if (typeof n.value === "string") {
            const parts = n.value.match(/\S+/g)
            if (parts) for (const part of parts) addClass(state, part)
        } else if (typeof n.value === "number" && n.value !== 0) {
            // Skip `0`
            addClass(state, n.value.toString())
        }
    },

    UnaryExpression(node, state) {
        const val = getSimpleValue(node)
        if (typeof val === "number" && val !== 0) {
            // Skip `-0`
            addClass(state, val.toString())
        }
    },

    TemplateLiteral(node, state, c) {
        const n = node
        n.quasis.forEach((q) => {
            const parts = q.value.raw.match(/\S+/g)
            if (parts) for (const part of parts) addClass(state, part)
        })
        n.expressions.forEach((e) => {
            c(e, state)
        })
    },

    ObjectExpression(node, state, c) {
        const n = node
        n.properties.forEach((prop) => {
            if (prop.type !== "Property") return

            let key = ""
            if (prop.shorthand && prop.key.type === "Identifier") {
                key = prop.key.name
                addClass(state, key)
                return
            }

            if (prop.key.type === "Identifier") key = prop.key.name
            else if (prop.key.type === "Literal") key = String(prop.key.value)

            if (!key && key !== "") return

            const valNode = prop.value
            const simpleVal = getSimpleValue(valNode)

            if (simpleVal !== null) {
                // val = true/1 -> add Key
                if (simpleVal === 1 || simpleVal === true) {
                    addClass(state, key)
                } else if (!simpleVal) {
                    return
                } else {
                    const newPrefix = getNextPrefix(
                        state.prefix,
                        key,
                        state.sep
                    )
                    const subState = { ...state, prefix: newPrefix }

                    if (typeof simpleVal === "string") {
                        const parts = simpleVal.match(/\S+/g)
                        if (parts)
                            for (const part of parts) addClass(subState, part)
                    } else {
                        addClass(subState, simpleVal.toString())
                    }
                }
                return
            }

            if (FLAG_TYPES.has(valNode.type)) {
                addClass(state, key)
                return
            }

            // Nested/Recursive logic
            const newPrefix = getNextPrefix(state.prefix, key, state.sep)
            const nextState = { ...state, prefix: newPrefix }

            const lenBefore = state.classes.length
            c(valNode, nextState) // Recurse

            // If in a nested/recursive logic, but no class found,
            // then the class is a condition, so add the key.
            if (state.classes.length === lenBefore) {
                if (LOGIC_TYPES.has(valNode.type)) {
                    addClass(state, key)
                }
            }
        })
    },

    ArrayExpression(n, s, c) {
        n.elements.forEach((e) => {
            e && c(e, s)
        })
    },
    ConditionalExpression(n, s, c) {
        c(n.consequent, s)
        c(n.alternate, s)
    },
    LogicalExpression(n, s, c) {
        c(n.left, s)
        c(n.right, s)
    },
    SequenceExpression(n, s, c) {
        n.expressions.forEach((e) => {
            c(e, s)
        })
    },
    CallExpression(n, s, c) {
        n.arguments.forEach((a) => {
            c(a, s)
        })
    }
}

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
    separator,
    debug = false
}: TransformerOptions = {}) {
    const calleeList = Array.isArray(callee) ? callee : [callee]
    const sep = separator ?? ":"
    const regex = new RegExp(`\\b(${calleeList.join("|")})\\s*\\(`, "g")

    return (content: string): string => {
        const replacements: { start: number; end: number; value: string }[] = []
        let match: RegExpExecArray | null

        regex.lastIndex = 0

        while ((match = regex.exec(content)) !== null) {
            try {
                const endIndex = findClosingParenthesis(content, match.index)
                if (endIndex === -1) continue

                const isolatedCode = content.slice(match.index, endIndex)

                const ast = parseExpressionAt(isolatedCode, 0, {
                    ecmaVersion: "latest",
                    sourceType: "module",
                    ranges: true
                }) as Node

                if (ast.type !== "CallExpression") continue

                const state: VisitorState = {
                    classes: [],
                    prefix: "",
                    sep
                }

                const callExpr = ast as CallExpression
                callExpr.arguments.forEach((arg) => {
                    recursive(arg, state, visitors)
                })

                replacements.push({
                    start: match.index,
                    end: endIndex,
                    value: `"${state.classes.join(" ")}"`
                })
            } catch (e) {
                if (debug) console.warn("[TWG] Skip:", (e as Error).message)
            }
        }

        let output = content
        for (let i = replacements.length - 1; i >= 0; i--) {
            const item = replacements[i]!
            const { start, end, value } = item
            output = output.substring(0, start) + value + output.substring(end)
        }
        return output
    }
}

export { transformer, type TransformerOptions }
