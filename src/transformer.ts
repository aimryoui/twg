import { walk, type WalkState } from "./lib/walker"
import { logger } from "./utils/logger"
import { getEndIndex } from "./utils/tokenizer"
import { parseExpressionAt } from "acorn"

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

    return (content: string, file?: string): string => {
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
                if (debug) {
                    logger(e, content, match.index, file)
                }
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
