import { tokenizer, type Token } from "acorn"

function getEndIndex(content: string, startIndex: number): number {
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

export { getEndIndex }
