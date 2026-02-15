import { sep } from "node:path"
import { name as BRAND_NAME } from "../../package.json"

// #f279b6
const BRAND_COLOR = "\x1B[38;2;242;121;182m"
const resetStr = "\x1B[0m"

const identifier = `${BRAND_COLOR}[${BRAND_NAME.toUpperCase()}]${resetStr}`

const flatten = (filePath: string): string => {
    return filePath.replaceAll(process.cwd() + sep, "").replace(/\\/g, "/")
}

function logger(
    e: unknown,
    content: string,
    matchIndex: number,
    file?: string
): void {
    let lineNum = 1
    for (let k = 0; k < matchIndex; k++) {
        if (content[k] === "\n") lineNum++
    }

    const lineStart = content.lastIndexOf("\n", matchIndex) + 1
    let lineEnd = content.indexOf("\n", matchIndex)
    if (lineEnd === -1) lineEnd = content.length

    const snippet = content.slice(lineStart, lineEnd).trim()

    const fileMsg = file
        ? `\n      File: ${flatten(file)}:${lineNum.toString()}`
        : `\n      Line: ${lineNum.toString()}`

    console.warn(
        `\n${identifier} Skip: ${(e as Error).message}${fileMsg}\n      Code: ${snippet}`
    )
}

export { logger }
