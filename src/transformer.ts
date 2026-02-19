import { walk, type WalkState } from "./lib/walker"
import { logger } from "./utils/logger"
import { Parser, type CallExpression, type Node, type Options } from "acorn"

class TWGParser extends Parser {
    static parseSingle(input: string, pos: number, options: Options): Node {
        interface InternalParser {
            nextToken(): void
            parseMaybeAssign(): Node
        }

        const p = new this(options, input, pos) as unknown as InternalParser
        p.nextToken()

        return p.parseMaybeAssign()
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
    separator = ":",
    debug = false
}: TransformerOptions = {}) {
    if (!callee || (Array.isArray(callee) && callee.length === 0)) {
        return (content: string) => content
    }

    if (!callee || (Array.isArray(callee) && callee.length === 0)) {
        return (content: string) => content
    }

    const validCallees = (Array.isArray(callee) ? callee : [callee]).filter(Boolean)

    if (validCallees.length === 0) {
        return (content: string) => content
    }

    const regex = new RegExp(`\\b(?:${validCallees.join("|")})\\s*\\(`, "g")
    const sep = separator
    const ACORN_OPTS: Options = { ecmaVersion: "latest", sourceType: "module" }

    const shouldBypass = (content: string) => {
        for (let i = 0, len = validCallees.length; i < len; i++) {
            if (content.includes(validCallees[i]!)) return false
        }
        return true
    }

    return (content: string, file?: string): string => {
        if (shouldBypass(content)) return content

        let output = ""
        let lastProcessedIndex = 0
        let match: RegExpExecArray | null

        regex.lastIndex = 0

        const state: WalkState = { out: "", sep }

        while ((match = regex.exec(content)) !== null) {
            try {
                state.out = ""

                const ast = TWGParser.parseSingle(content, match.index, ACORN_OPTS)

                if (ast.type !== "CallExpression") continue

                const callExpr = ast as unknown as CallExpression
                const endIndex = callExpr.end

                for (let i = 0, len = callExpr.arguments.length; i < len; i++) {
                    walk(callExpr.arguments[i], "", state)
                }

                output +=
                    content.substring(lastProcessedIndex, match.index) +
                    `"${state.out}"`

                lastProcessedIndex = endIndex
                regex.lastIndex = endIndex
            } catch (e) {
                if (debug) {
                    logger(e, content, match.index, file)
                }
            }
        }

        if (lastProcessedIndex === 0) return content

        output += content.substring(lastProcessedIndex)
        return output
    }
}

export { transformer, type TransformerOptions }
