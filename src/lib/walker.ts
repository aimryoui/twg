import {
    type ArrayExpression,
    type CallExpression,
    type ConditionalExpression,
    type Literal,
    type LogicalExpression,
    type Node,
    type ObjectExpression,
    type SequenceExpression,
    type TemplateLiteral,
    type UnaryExpression
} from "acorn"

interface WalkState {
    out: string
    sep: string
}

const addString = (state: WalkState, pfx: string, val: string) => {
    if (!val) return

    let chunkStart = -1
    let hasSpace = false

    for (let i = 0, len = val.length; i < len; i++) {
        const charCode = val.charCodeAt(i)
        if (
            charCode === 32 ||
            charCode === 9 ||
            charCode === 10 ||
            charCode === 13
        ) {
            hasSpace = true
            if (chunkStart !== -1) {
                state.out && (state.out += " ")
                state.out += pfx + val.slice(chunkStart, i)
                chunkStart = -1
            }
        } else if (chunkStart === -1) {
            chunkStart = i
        }
    }

    if (!hasSpace) {
        state.out && (state.out += " ")
        state.out += pfx + val
        return
    }

    if (chunkStart !== -1) {
        state.out && (state.out += " ")
        state.out += pfx + val.slice(chunkStart)
    }
}

function walk(node: Node | null | undefined, pfx: string, state: WalkState) {
    if (!node) return

    switch (node.type) {
        case "Literal": {
            const lit = node as Literal
            if (typeof lit.value === "string") {
                addString(state, pfx, lit.value)
            } else if (typeof lit.value === "number" && lit.value !== 0) {
                state.out && (state.out += " ")
                state.out += pfx + String(lit.value)
            }
            break
        }
        case "UnaryExpression": {
            const un = node as UnaryExpression
            if (un.operator === "-" && un.argument.type === "Literal") {
                const arg = un.argument
                if (typeof arg.value === "number" && arg.value !== 0) {
                    state.out && (state.out += " ")
                    state.out += pfx + String(-arg.value)
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
                    } else if (lit.value) {
                        state.out && (state.out += " ")
                        state.out += pfx + keyStr
                    }
                    continue
                }

                if (val.type === "UnaryExpression") {
                    const un = val
                    if (un.operator === "-" && un.argument.type === "Literal") {
                        const argLit = un.argument
                        if (argLit.value === 0) continue
                    }
                    state.out && (state.out += " ")
                    state.out += pfx + keyStr
                    continue
                }

                if (
                    val.type === "LogicalExpression" ||
                    val.type === "ConditionalExpression" ||
                    val.type === "SequenceExpression"
                ) {
                    const lenBefore = state.out.length
                    walk(val, exactNextPfx, state)
                    if (state.out.length === lenBefore) {
                        state.out && (state.out += " ")
                        state.out += pfx + keyStr
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

                state.out && (state.out += " ")
                state.out += pfx + keyStr
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

export { walk, type WalkState }
