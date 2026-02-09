import {
    parseExpressionAt,
    type CallExpression,
    type Literal,
    type Node,
    type UnaryExpression
} from "acorn"
import { recursive, type RecursiveVisitors } from "acorn-walk"

// --- 1. Shared Types & Constants ---

// State được truyền xuyên suốt quá trình traverse AST
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

// --- 2. Optimized Helpers (Pure Functions) ---

// Helper tính prefix nhanh (Inline logic để tránh function call overhead nếu cần, nhưng tách ra cho gọn)
const getNextPrefix = (
    currentPrefix: string,
    key: string,
    sep: string
): string => {
    if (!currentPrefix) return key === "" ? sep : key
    const p = currentPrefix.endsWith(sep) ? currentPrefix : currentPrefix + sep
    return p + key
}

const addClass = (ctx: VisitorState, val: string) => {
    const { prefix, sep } = ctx
    const p = prefix ? (prefix.endsWith(sep) ? prefix : prefix + sep) : ""
    ctx.classes.push(p + val)
}

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
    // Xử lý số âm (-1)
    if (node.type === "UnaryExpression") {
        const u = node as UnaryExpression
        if (u.operator === "-" && u.argument.type === "Literal") {
            const val = u.argument.value
            return typeof val === "number" ? -val : null
        }
    }
    return null
}

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

// --- 3. Static Visitors (Defined ONCE for performance) ---

const visitors: RecursiveVisitors<VisitorState> = {
    Literal(node, state) {
        const n = node
        if (typeof n.value === "string") {
            // Regex match nhanh hơn split với chuỗi dài
            const parts = n.value.match(/\S+/g)
            if (parts) for (const part of parts) addClass(state, part)
        } else if (typeof n.value === "number" && n.value !== 0) {
            // FIX: Skip 0
            addClass(state, n.value.toString())
        }
    },

    UnaryExpression(node, state) {
        const val = getSimpleValue(node)
        if (typeof val === "number" && val !== 0) {
            // FIX: Skip -0
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

            // 1. Extract Key
            let key = ""
            if (prop.shorthand && prop.key.type === "Identifier") {
                key = prop.key.name
                addClass(state, key)
                return
            }

            if (prop.key.type === "Identifier") key = prop.key.name
            else if (prop.key.type === "Literal") key = String(prop.key.value)

            // Key rỗng ("": val) vẫn hợp lệ, chỉ skip nếu không xác định được key (null/undefined)
            if (!key && key !== "") return

            const valNode = prop.value
            const simpleVal = getSimpleValue(valNode)

            // 2. Handle Simple Values (Leaf Nodes)
            if (simpleVal !== null) {
                // True/1 -> Add Key
                if (simpleVal === 1 || simpleVal === true) {
                    addClass(state, key)
                }
                // Falsy (0, false, null, "") -> SKIP
                // FIX: Thêm check !simpleVal để bỏ qua 0
                else if (!simpleVal) {
                    return
                }
                // String/Number (val != 0) -> Add Prefix + Value
                else {
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

            // 3. Handle Flags (Variable/Call...) -> Add Key
            if (FLAG_TYPES.has(valNode.type)) {
                addClass(state, key)
                return
            }

            // 4. Handle Nested/Recursive Logic
            const newPrefix = getNextPrefix(state.prefix, key, state.sep)
            const nextState = { ...state, prefix: newPrefix }

            const lenBefore = state.classes.length
            c(valNode, nextState) // Recurse

            // Heuristic: Nếu đi sâu vào mà không tìm thấy class nào (chỉ toàn logic boolean)
            // thì coi cả cụm đó là điều kiện True -> Add Key
            if (state.classes.length === lenBefore) {
                if (LOGIC_TYPES.has(valNode.type)) {
                    addClass(state, key)
                }
            }
        })
    },

    // Pass-through visitors
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

// --- 4. Main Transformer Function ---

interface TransformerOptions {
    callee?: string | string[]
    separator?: string | false
    debug?: boolean
}

function transformer({
    callee = "twg",
    separator = ":",
    debug = false
}: TransformerOptions = {}) {
    const calleeList = Array.isArray(callee) ? callee : [callee]
    const sep = separator === false ? "" : separator
    // Pre-compile regex
    const regex = new RegExp(`\\b(${calleeList.join("|")})\\s*\\(`, "g")

    return (content: string): string => {
        const replacements: { start: number; end: number; value: string }[] = []
        let match: RegExpExecArray | null

        regex.lastIndex = 0

        while ((match = regex.exec(content)) !== null) {
            try {
                // 1. Find exact bounds
                const endIndex = findClosingParenthesis(content, match.index)
                if (endIndex === -1) continue

                // 2. Extract code
                const isolatedCode = content.slice(match.index, endIndex)

                // 3. Parse AST
                const ast = parseExpressionAt(isolatedCode, 0, {
                    ecmaVersion: "latest",
                    sourceType: "module",
                    ranges: true
                }) as Node

                if (ast.type !== "CallExpression") continue

                // 4. Initialize State
                const state: VisitorState = {
                    classes: [],
                    prefix: "",
                    sep
                }

                // 5. Walk AST
                const callExpr = ast as CallExpression
                callExpr.arguments.forEach((arg) => {
                    recursive(arg, state, visitors)
                })

                // 6. Queue Replacement
                replacements.push({
                    start: match.index,
                    end: endIndex,
                    value: `"${state.classes.join(" ")}"`
                })
            } catch (e) {
                if (debug) console.warn("[TWG] Skip:", (e as Error).message)
            }
        }

        // Apply replacements from bottom up
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
