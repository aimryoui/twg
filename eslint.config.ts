import eslint from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin"
import eslintConfigPrettier from "eslint-config-prettier/flat"
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript"
import { importX } from "eslint-plugin-import-x"
import simpleImport from "eslint-plugin-simple-import-sort"
import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"

export default defineConfig(
    //* Global Config
    {
        //! Global ignores always stay alone
        ignores: ["**/node_modules/", "**/.git/", "**/dist/", "pnpm-lock.yaml"]
    },
    //* ESLint
    eslint.configs.recommended,
    {
        rules: {
            "no-unused-vars": 0
        }
    },
    //* TypeScript ESLint
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            tseslint.configs.recommendedTypeChecked,
            tseslint.configs.strictTypeChecked,
            tseslint.configs.stylisticTypeChecked
        ],
        plugins: {
            "@typescript-eslint": tseslint.plugin
        },
        linterOptions: {
            reportUnusedDisableDirectives: true
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        rules: {
            "@typescript-eslint/no-unused-vars": [
                1,
                {
                    args: "all",
                    argsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    varsIgnorePattern: "^_"
                }
            ],
            "@typescript-eslint/require-await": 0,
            "@typescript-eslint/no-non-null-assertion": 0,
            "@typescript-eslint/use-unknown-in-catch-callback-variable": 0,
            "@typescript-eslint/unbound-method": 0,
            "@typescript-eslint/no-unused-expressions": 0,
            "@typescript-eslint/consistent-type-definitions": 1,
            "@typescript-eslint/consistent-type-imports": [
                1,
                {
                    prefer: "type-imports",
                    fixStyle: "inline-type-imports"
                }
            ],
            "@typescript-eslint/consistent-generic-constructors": 1,
            "@typescript-eslint/no-unnecessary-condition": 1,
            "@typescript-eslint/no-unnecessary-template-expression": 1,
            "@typescript-eslint/prefer-nullish-coalescing": 1,
            "@typescript-eslint/no-unnecessary-type-parameters": 1,
            "@typescript-eslint/prefer-regexp-exec": 1
        }
    },
    //* Imports
    {
        files: ["**/*.{ts,tsx}"],
        settings: {
            "import-x/resolver-next": [
                createTypeScriptImportResolver({
                    alwaysTryTypes: true,
                    project: "./tsconfig.json"
                })
            ]
        },
        plugins: {
            //@ts-expect-error - https://github.com/un-ts/eslint-plugin-import-x/issues/421
            "import-x": importX,
            "simple-import-sort": simpleImport
        },
        rules: {
            "import-x/no-duplicates": [1, { "prefer-inline": true }],
            "import-x/no-unresolved": 1,

            "simple-import-sort/exports": 1
        }
    },
    eslintConfigPrettier,
    //* Formatting
    stylistic.configs["disable-legacy"],
    {
        plugins: {
            "@stylistic": stylistic
        },
        rules: {
            "@stylistic/quotes": [
                1,
                "double",
                { avoidEscape: true, allowTemplateLiterals: "avoidEscape" }
            ]
        }
    }
)
