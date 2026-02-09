import type { Config } from "prettier"

const config: Config = {
    printWidth: 80,
    tabWidth: 4,
    useTabs: false,
    semi: false,
    singleQuote: false,
    quoteProps: "as-needed",
    jsxSingleQuote: false,
    trailingComma: "none",
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: "always",
    requirePragma: false,
    insertPragma: false,
    proseWrap: "preserve",
    endOfLine: "lf",
    embeddedLanguageFormatting: "auto",
    singleAttributePerLine: false,
    plugins: ["@ianvs/prettier-plugin-sort-imports"],
    importOrder: ["<BUILTIN_MODULES>", "<THIRD_PARTY_MODULES>"],
    importOrderTypeScriptVersion: "5.9.3",
    overrides: [
        {
            files: ["*.md", "*.yml", "*.yaml"],
            options: {
                tabWidth: 2
            }
        }
    ]
}

export default config
