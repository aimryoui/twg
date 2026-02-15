# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Undocumented APIs should be considered internal and may change without warning.

## [Unreleased]

- Nothing yet!

## [7.1.1] - 2026-02-15

### Changed

- Split `transformer()` function into multiple dev files for better readability.
- Improve debug message.

## [7.1.0] - 2026-02-15

### Changed

- Change behavior of handling number values function. Only `0` and `-0` will be treated as `false`, other numbers will be treated as `true`.

### Fixed

- Refactor `createTwg()` & `transformer()` function to improve performance. See [benchmark](https://github.com/hoangnhan2ka3/twg/blob/main/bench/README.md).
- More tests more fun.

## [7.0.1] - 2026-02-11

### Changed

- Fix `twg/transform` entry point.

### Fixed

- Update `ClassValue` type definition.

## [7.0.0] - 2026-02-09

### 🚀 First stable release

## [6.0.2] - 2024-09-15

### Added

- Type `TransformerOptions` (previously `ReplacerOptions`) can now be imported from each entry point.

### Refactor

- Refactor all `export` statement to the end of files due to `tsup` dts export issue.
- Fixed some misleading `import` statement.

### Docs

- Add [`Migration Guide`](./docs/migration.md) to docs.
- Add `README.md` to `benchmark` folder.
- Add `Types definition` section to [`api.md`](./docs/api.md#-types-definition).

## [6.0.1] - 2024-09-15

### Fixed

- Fixed misleading `src` module on bundle.

## [6.0.0] - 2024-09-15

### Breaking change

- Rename `replacer()` function to `transformer()`.
- Remove `*/replacer` entry point, `transformer()` now is in the same entry point as `twg()`, also with `createTwg()` function. That means `transformer()` function will be combined/located in the same file with `twg()`, to take advantage of its API without rewrite it in another entry.

### Core change

- Deprecated `reducer()` and `parser()` functions because `twg()` can handle it now.
- Change `toVal()` function's logic to handle mapping key with values process.
- Add `bigint` to `ClassValue` type (related to [this](<(https://github.com/lukeed/clsx/pull/96)>) `clsx` issue).

### Refactor

- Change `native object` detecting convention from `"🚀"` to `1`.
- Refactor some `JSDoc` for functions and fix typo.
- Delete unused bracket pair in `combiner()` function.
- Refactor `ClassValue` import path to `src/index` in every entry point.

### Chore

- Bump `@types/node` version to `v22.5.5`.
- Add `benchmark` with `clsx`.

## [5.0.11] - 2024-09-14

### Refactor

- Refactor `toVal()` and `createTwg()` function's logic to use `&&` instead of `if` statement.

### Chore

- Update `JSDoc` for `toVal()` and `createTwg()` function.

## [5.0.10] - 2024-09-14

### Docs

- Update `Version comparison` table.
- Update `bundle size` section in docs.

### Chore

- Remove unused `console.log` in `transformer()` function of `extend` version.

## [5.0.9] - 2024-09-13

### Core change

- Remove unused `!innerPath.node.shorthand` condition in both `extend` and `extend/lite` version.
- Better handling `nestingCallee` option in `extend` version.

### Refactor

- Refactor `toVal()` function logic in `extend` version.
- Make `reducer()` function's filter more concise.

### Chore

- Bump `pnpm` version to `9.10.0`.
- Update `pnpm-lock.yaml`.
- Add more default test cases for `twg()` and `replacer()` function.

## [5.0.8] - 2024-09-13

### Refactor

- Import exactly what is needed from `@babel` in `ast.ts` to improve tree-shaking.

## [5.0.7] - 2024-09-13

### Docs

- Sync npm `README.md` with GitHub `README.md`.

### Chore

- Bump `terser` and other dev dependencies version.
- Update tests for compatibility with `typescript@5.6.x`.

## [5.0.6] - 2024-09-08

### Docs

- Update `twg` thumbnail image.
- Update `twg` logo in the start of every docs.

### Chore

- Update `twg` logo in the start of every markdown file.

## [5.0.5] - 2024-09-08

### Core change

- Added conditions to remove the `path` in case the `key` in `ObjectProperty` is not `Identifier` and `StringLiteral` for `extend` version.

### Chore

- Add more test cases for `extend` version.

## [5.0.4] - 2024-09-07

### Docs

- Fix some typo and add more shields in `README.md`.

### Chore

- Added `ISSUE_TEMPLATE` to `.github` folder.
- Add `CONTRIBUTING.md` file.
- Update `LICENSE` file format.

## [5.0.3] - 2024-09-07

### Core change

- Add `"sideEffects": false` in `package.json` for tree shakable bundle.

### Docs

- Relocated recommendation for `tailwindCSS.experimental.classRegex` in `introduction.md`.

### Chore

- Bump dev dependencies version.

## [5.0.2] - 2024-09-06

### Fixed

- Sync `createTwg()` between `default` and `extend` version by using `const` instead of `function`.

### Docs

- Update bundle size shield links in npm `README.md`.

## [5.0.1] - 2024-09-06

### Fixed

- Fixed `createTwg()` misleading default `separator` option.

### Docs

- Rename `twg()` function to `createTwg()` in `options.md` because `options` parameter is not in `twg()` function anymore.
- Update bundle size section in docs.

### Chore

- Update test cases for default `separator` option.

## [5.0.0] - 2024-09-06

### Breaking change

- Use a more elegant way to handle `separator` option in `twg()` of both versions.
- Add `createTwg()` API function.

### Core change

- From now if you want to use custom `separator` option, you need to define the `separator` option in new `createTwg()` function (previously in the last Object of `twg()` function) and also in `replacer()` function like previous version.
- `twg()` function now being exported by using `createTwg()`.

### Refactor

- Sync `toVal()` function condition between `extend` and `extend/lite` version.
- Remove `divider` constant processing in `parser()` function.
- Refactor `JSDoc` for functions and fix typo.

### Docs

- Update `api.md` for new `createTwg()` API function.
- Update bundle size section in docs.
- Add recommendation for `tailwindCSS.experimental.classRegex` in `introduction.md`.

### Chore

- Add `JSDoc` for `type/interface`.
- Move and refactor `Custom separator` tests to new test files for `createTwg()` function.

## [4.0.1] - 2024-09-05

### Fixed

- Fixed `replacer()` function in `default` version has no effect on 'no cover brackets' logical conditions classes.

### Docs

- Add author own opinions in `What version should I use` (previously named `My recommendation`).
- Update entry point size in docs.
- Delete unsupported `inline-styles` in `options.md`.

### Chore

- Add more test cases for `replacer()` function in `default` version.

## [4.0.0] - 2024-09-04

### Breaking change

- Make `extend` version (which previously called **AST** version) as optional entry point. From now if you want to use `extend` version, you need to install 4 more `@babel` dependencies, refer to docs.
- Default version now using `combiner()` which written in native JS to parse conditionals (use with limitations).

### Core change

- Bring back `v1` version of `replacer()` and `twg()` function.
- Add `combiner()` function for helping to parse conditionals.
- Improve filtering logic of outermost object(s) inside callee function.

### Refactor

- Refactor outermost object filter logic from regex to checking for `shorthand` by AST in `replacer()` function of `extend` version.
- Improve ternary conditional parsing in `replacer()` function of `extend` version.

### Docs

- Separate `README.md` into multiple files located in `docs/` folder, remaining `Quick intro`, `Getting started` and few other related sections.

### Chore

- Update folder structure.
- Update `.npmignore` to ignore `docs/` folder.
- Update `tsconfig.json`, `eslint.config.js` and `tsup.config.ts`.
- Add more test cases.
- Separate tests for 2 versions.

### Misc

- Make 4 `@babel` dependencies as peerDependencies.

## [3.1.1] - 2024-08-30

### Refactor

- Change `reducer()` logic from `forEach` to `for...of` loop.
- Change `native object` detect convention from `"1"` to `"NaN"`.

### Chore

- Add more test for `Misleading key`.
- Update `CHANGELOG.md` & `README.md`.

## [3.1.0] - 2024-08-30

### Core change

- Added `nestingCallee` option to `replacer()` function. Now you can choose which callee function to allow nesting inside the callee function you defined in `callee` option. (Affect only default version)

### Refactor

- Refactor filter logic of nested callee in the lite version of `transformer()` function.
- Refactor default version of `transformer()` function to handle new `nestingCallee` option.

### Chore

- Update docs for `nestingCallee` option.
- Refactor some style in docs.
- Add more test cases for `nestingCallee` option.

## [3.0.4] - 2024-08-30

### Chore

- Refactor JSDoc for functions and fix typo.
- Bump `@babel` dependencies version to `7.25.6`.

## [3.0.3] - 2024-08-29

### Refactor

- Refactor `debug` message to be lead to `Usage / Use cases` section in docs.

### Chore

- Update `Usage / Use cases` section in docs:
  - Add `Nesting callee functions` section on Usage.
  - Refactor this section to expand/collapse panel for clearer reading.
- Ignore `misc.spec.ts` file in `.gitignore`.

## [3.0.2] - 2024-08-29

### Chore

- Remove accidentally test code in `transformer()` function.

## [3.0.1] - 2024-08-29

### Fixed

- Fixed problem in AST cause misleading finding parent object which lead to wrong outermost object parsing in `v3.0.0`.

### Chore

- Add test cases for `misleading object inside not related object`.

## [3.0.0] - 2024-08-29

### Core change

- Deprecated `extractor()` function due to AST `transformer()`. Now `replacer()` is almost base on AST.
- Change the behavior of `debug message` as limited AST output.

### Refactor

- Refactor AST `transformer()` to handle nested callee functions.
- Refactor `twg()` and its lite version to handle native Object behavior.
- Refactor `parser()` to reduce complexity and better handle native Object behavior.

### Chore

- Remove `extractor()` function test.
- Add more test cases for nested callee functions, native Object behavior.

## [2.0.7] - 2024-08-28

### Refactor

- Refactor invalid `callee` detection logic.

### Misc

- Update `callee` option types of `transformer()`.
- Update `debug` message for error `callee` in `replacer()`.

## [2.0.6] - 2024-08-28

### Refactor

- Shorten `toVal()` function of both versions.

### Chore

- Remove unused `@returns` value in `extractor()` function.

## [2.0.5] - 2024-08-28

### Core change

- Shorten lite version of `replacer()` function.

### Chore

- Bump `pnpm` version to `9.9.0`.
- Bump package versions.
- Fix typo in debug message of `replacer()` function.
- Add more context in test case.

### Misc

- Update example for `conditional string and array` in README.
- Fix `complex conditional objects` example.

## [2.0.4] - 2024-08-27

### Core change

- Move the parsing logic of `Key as classes and value as conditionals` in objects to AST transformer.

### Chore

- Pure `console.log` with `terser` minify options to avoid accidentally logging in production.
- Add more context to performance section in `Trade-offs` of README about `v2`.
- Add more test cases for new objects behavior.

## [2.0.3] - 2024-08-27

### Chore

- Shorten the `return` of AST transformer.
- Rename `transformConditional()` to `transformer()` in `src/processor/ast.ts`.

## [2.0.2] - 2024-08-27

### Chore

- Fix `exports` in `package.json` to resolve right import.

## [2.0.1] - 2024-08-27

### Chore

- Remove unused console.log in `src/processor/ast.ts`.

## [2.0.0] - 2024-08-27

### Core change

- Use `@babel` AST to parse all conditional classes, objects, arrays or even both string and array.
  - **Pros:**
    - More accurate, more trust in processing.
    - Works perfectly even with complex conditionals like nested ternary and inside template literal.
    - Reduce several complex regex use to parse condition.
    - Lighter bundle.
  - **Cons:**
    - Currently work on _(.js, .ts, .jsx, .tsx)_ file only.
    - A bit slower, especially on the first time, when nothing is cached.
    - 4 more dependencies 😢
- Supports native objects behavior like `clsx` (Key as classes and value as conditionals) [[docs](https://github.com/hoangnhan2ka3/twg?tab=readme-ov-file#-news)].
- Refactor lite version of `parser()` function to accept new objects behavior.

### Chore

- Add more test cases for new objects behavior.
- Fixed npm README's shields links.
- Bump dependencies version.

### Misc

- Deleted unused `(e)` in catch block of lite version of `replacer()` function.

## [1.2.6] - 2024-08-24

### Refactor

- Revert `const char = content[i]` in `v1.2.4` refactor of `extractor()` function, which caused error on `v1.2.5`.

### Chore

- Add more test cases for `extractor()` function.
- Update npm README.

## [1.2.5] - 2024-08-24

### Core change

- Return original `content` whenever `callee` option is not valid, instead of being overridden by default value.

### Refactor

- Revert `v1.2.3` refactor, because `reducer()` doesn't need to regenerate every time the `parser()` is called.
- Fixed debug message duplicated ":" typo.

### Chore

- Fixed some test cases in context of core change.
- Temporarily remove Ko-fi funding button in README, because of PayPal error.

## [1.2.4] - 2024-08-24

### Refactor

- Refactor `extractor()` function.
- Export `replacer()` as both `default` and `named` export.

### Chore

- Fixed typo in README.
- Update bundle shield links in npm README.

## [1.2.3] - 2024-08-24

### Core change

- Collapses `reducer()` into `parser()` function.
- Improves `reducer()` function, does not need to handle Array anymore.

### Refactor

- Refactor lite `parser()` function.

### Chore

- Test also lite `replacer()` and `twg()` function.
- Add more test cases.

## [1.2.2] - 2024-08-24

### Chore

- Move GitHub README to `.github` to reduce package size on `npm`.

## [1.2.1] - 2024-08-23

### Chore

- Update `.npmignore` to ignore `/public` folder.
- Update funding button in README.

## [1.2.0] - 2024-08-23

### Core change

- Change the behavior of `extractor()` to scan also callee function and outer object(s) inside it.
- Doesn't need regex to match `callee` function anymore.
- Lead to API change in `replacer()` options, now `matchFunction` is deprecated.
- New `replacer()` options: `debug`. Now user can turn off debug message right in options.

### Refactor

- Update README to satisfied new API changes.
- Add section about `Tailwind CSS IntelliSense` in `trade-offs` of README.
- refactor folder structure for readability and clean function name.

### Chore

- Add more test cases, especially ternary and multiple consequent parts of ternary and and-or conditionals.

### Misc

- Update all packages to latest version, delete unused files.

## [1.1.2] - 2024-08-22

### Core change

- Fixed accidentally warning message because of misleading `replacer()` options when give the options object a name.
- Update docs for latest API name.

### Chore

- Refactor JSDoc for functions and fix typo.

## [1.1.1] - 2024-08-21

### Refactor

- Improved regex for parsing nested condition objects.

### Chore

- Add more tests and refactor `ci.yml`.

### Misc

- Update more example for `nesting conditional objects`.

## [1.1.0] - 2024-08-21

### 🚀 First release

[unreleased]: https://github.com/hoangnhan2ka3/twg/compare/7.1.1...HEAD
[7.1.1]: https://github.com/hoangnhan2ka3/twg/compare/7.1.0...7.1.1
[7.1.0]: https://github.com/hoangnhan2ka3/twg/compare/7.0.1...7.1.0
[7.0.1]: https://github.com/hoangnhan2ka3/twg/compare/7.0.0...7.0.1
[7.0.0]: https://github.com/hoangnhan2ka3/twg/compare/6.0.2...7.0.0
[6.0.2]: https://github.com/hoangnhan2ka3/twg/compare/6.0.1...6.0.2
[6.0.1]: https://github.com/hoangnhan2ka3/twg/compare/6.0.0...6.0.1
[6.0.0]: https://github.com/hoangnhan2ka3/twg/compare/5.0.11...6.0.0
[5.0.11]: https://github.com/hoangnhan2ka3/twg/compare/5.0.10...5.0.11
[5.0.10]: https://github.com/hoangnhan2ka3/twg/compare/5.0.9...5.0.10
[5.0.9]: https://github.com/hoangnhan2ka3/twg/compare/5.0.8...5.0.9
[5.0.8]: https://github.com/hoangnhan2ka3/twg/compare/5.0.7...5.0.8
[5.0.7]: https://github.com/hoangnhan2ka3/twg/compare/5.0.6...5.0.7
[5.0.6]: https://github.com/hoangnhan2ka3/twg/compare/5.0.5...5.0.6
[5.0.5]: https://github.com/hoangnhan2ka3/twg/compare/5.0.4...5.0.5
[5.0.4]: https://github.com/hoangnhan2ka3/twg/compare/5.0.3...5.0.4
[5.0.3]: https://github.com/hoangnhan2ka3/twg/compare/5.0.2...5.0.3
[5.0.2]: https://github.com/hoangnhan2ka3/twg/compare/5.0.1...5.0.2
[5.0.1]: https://github.com/hoangnhan2ka3/twg/compare/5.0.0...5.0.1
[5.0.0]: https://github.com/hoangnhan2ka3/twg/compare/4.0.1...5.0.0
[4.0.1]: https://github.com/hoangnhan2ka3/twg/compare/4.0.0...4.0.1
[4.0.0]: https://github.com/hoangnhan2ka3/twg/compare/3.1.1...4.0.0
[3.1.1]: https://github.com/hoangnhan2ka3/twg/compare/3.1.0...3.1.1
[3.1.0]: https://github.com/hoangnhan2ka3/twg/compare/3.0.4...3.1.0
[3.0.4]: https://github.com/hoangnhan2ka3/twg/compare/3.0.3...3.0.4
[3.0.3]: https://github.com/hoangnhan2ka3/twg/compare/3.0.2...3.0.3
[3.0.2]: https://github.com/hoangnhan2ka3/twg/compare/3.0.1...3.0.2
[3.0.1]: https://github.com/hoangnhan2ka3/twg/compare/3.0.0...3.0.1
[3.0.0]: https://github.com/hoangnhan2ka3/twg/compare/2.0.7...3.0.0
[2.0.7]: https://github.com/hoangnhan2ka3/twg/compare/2.0.6...2.0.7
[2.0.6]: https://github.com/hoangnhan2ka3/twg/compare/2.0.5...2.0.6
[2.0.5]: https://github.com/hoangnhan2ka3/twg/compare/2.0.4...2.0.5
[2.0.4]: https://github.com/hoangnhan2ka3/twg/compare/2.0.3...2.0.4
[2.0.3]: https://github.com/hoangnhan2ka3/twg/compare/2.0.2...2.0.3
[2.0.2]: https://github.com/hoangnhan2ka3/twg/compare/2.0.1...2.0.2
[2.0.1]: https://github.com/hoangnhan2ka3/twg/compare/2.0.0...2.0.1
[2.0.0]: https://github.com/hoangnhan2ka3/twg/compare/1.2.6...2.0.0
[1.2.6]: https://github.com/hoangnhan2ka3/twg/compare/1.2.5...1.2.6
[1.2.5]: https://github.com/hoangnhan2ka3/twg/compare/1.2.4...1.2.5
[1.2.4]: https://github.com/hoangnhan2ka3/twg/compare/1.2.3...1.2.4
[1.2.3]: https://github.com/hoangnhan2ka3/twg/compare/1.2.2...1.2.3
[1.2.2]: https://github.com/hoangnhan2ka3/twg/compare/1.2.1...1.2.2
[1.2.1]: https://github.com/hoangnhan2ka3/twg/compare/1.2.0...1.2.1
[1.2.0]: https://github.com/hoangnhan2ka3/twg/compare/1.1.2...1.2.0
[1.1.2]: https://github.com/hoangnhan2ka3/twg/compare/1.1.1...1.1.2
[1.1.1]: https://github.com/hoangnhan2ka3/twg/compare/1.1.0...1.1.1
[1.1.0]: https://github.com/hoangnhan2ka3/twg/compare/1.0.0...1.1.0
