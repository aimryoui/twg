import { type Config } from "jest"

const config: Config = {
    moduleFileExtensions: ["js", "ts"],
    moduleDirectories: [
        "node_modules",
        "<rootDir>"
    ] /** @see https://stackoverflow.com/a/72437265 */,
    transform: { "^.+\\.(t|j)s$": "ts-jest" },
    testRegex: ".*\\.test\\.ts$"
}

export default config
