<div align="center">
  <img src="../public/twg_thumbnail.webp" alt="twg thumbnail">
</div>

<h1 align="center">twg</h1>

<p align="center">
  <a href="https://github.com/hoangnhan2ka3/twg/actions"><img src="https://img.shields.io/github/actions/workflow/status/hoangnhan2ka3/twg/tests.yml?branch=main&label=tests&colorB=f279b6" alt="Tests Status"></a>
  <a href="https://github.com/hoangnhan2ka3/twg"><img src="https://img.shields.io/github/stars/hoangnhan2ka3/twg?style=flat&colorB=f279b6" alt="Repository stars"></a>
  <a href="https://bundlephobia.com/result?p=twg"><img src="https://badgen.net/bundlephobia/min/twg?label=bundle&color=f279b6" alt="Bundle Size"></a>
  <a href="https://bundlephobia.com/result?p=twg"><img src="https://badgen.net/bundlephobia/minzip/twg?label=gzip&color=f279b6" alt="Gzip Size"></a>
  <a href="https://www.npmjs.com/package/twg"><img src="https://img.shields.io/npm/dt/twg.svg?colorB=f279b6" alt="Total Downloads"></a>
  <a href="https://www.npmjs.com/package/twg"><img src="https://img.shields.io/npm/v/twg.svg?colorB=f279b6" alt="Latest Release"></a>
  <a href="https://github.com/twg/twg/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/twg.svg?colorB=f279b6" alt="License"></a>
</p>

<p align="center">
  <a href="https://bundlephobia.com/result?p=twg"><img src="https://badgen.net/bundlephobia/dependency-count/twg?label=dependencies&color=f279b6" alt="Dependency Count"></a>
  <a href="https://bundlephobia.com/result?p=twg"><img src="https://badgen.net/bundlephobia/tree-shaking/twg?label=tree-shaking&color=f279b6" alt="Tree Shakable Supports"></a>
</p>

<h3 align="center">
🪥 A utility function for grouping TailwindCSS variants.
</h3>

<h4 align="center">
A more elegant way of writing Tailwind classes. Never need to repeating the same variants over and over again 🤯.
</h4>

---

<div align="center">

| 📍 Entry point       | 📦 Bundle | 📦 Gzip  |
|:---------------------|:---------:|:---------:|
| `twg`                |   2721B   | **1442B** |
| `twg/lite` 🪶        |   2274B   | **1220B** |
| `twg/extend`         |   2756B   | **1272B** |
| `twg/extend/lite` 🪶 |   2138B   | **976B**  |

_From `v6`, each entry already contains both `twg()` and `transformer()`<sup>[1]</sup> function_

</div>

---

<sup>[1]</sup>: Previously called `replacer()` function.

## 🗝️ Features

- ✅ Elegant.
- ✅ Easy setup.
- ✅ Support for multiple objects parsing.
- ✅ Support for nesting multiple objects, arrays, and itself functions.
- ✅ Support for (multiple) conditional classes, objects, and arrays.
- ✅ Customizable `callee` name and `separator`.
- ✅ Compatible with wrappers like [`twMerge`](https://github.com/dcastil/tailwind-merge).
- ✅ "Base" support for Tailwind CSS IntelliSense (IDEs extension), as well as [Hover Preview](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss#hover-preview).
- ✅ 0 dependencies on `default` version.
- ✅ Tree-shaking friendly.
- ✅ Lite version.

---

<div align="center">

<h3 align="center">
Version comparison
</h3>

| Features                                                                 | `default` | `default/lite` | `extend` | `extend/lite` |
|:------------------------------------------------------------------------ |:---------:|:--------------:|:--------:|:-------------:|
| Accept string, number, array, object                                     |     ✓     |       ✓        |    ✓     |       ✓       |
| Accept template literal                                                  |  partial  |    partial     |    ✓     |       ✓       |
| Accept multiple outermost objects                                        |     ✓     |       ✓        |    ✓     |       ✓       |
| Accept nesting objects, arrays                                           |     ✓     |       ✓        |    ✓     |       ✓       |
| Accept nesting chosen callee inside main object(s)                       |           |                |    ✓     |       ✓       |
| Accept nesting custom callee functions inside main object(s)             |           |                |    ✓     |               |
| Accept logical conditionals                                              |     ✓     |       ✓        |    ✓     |       ✓       |
| Accept ternary conditionals                                              |  partial  |    partial     |    ✓     |       ✓       |
| Accept native object behavior (key as classes and value as conditionals) |  partial  |    partial     |    ✓     |       ✓       |
| Compatible with wrappers                                                 |     ✓     |       ✓        |    ✓     |       ✓       |
| Fully customizable                                                       |     ✓     |    partial     |    ✓     |    partial    |
| [Options](../docs/options.md) ↗️                                          |     3     |       1        |    4     |       1       |

<h3 align="center">
Which version should I use?
</h3>

<div id="image-table" align="center">
  <table>
    <tr>
      <td>
        <ul>
          <li align="start">
            <code>default</code> version seems to be suitable for almost base cases, promise that you don't need to handle very complex conditions like ternary in template literal, or nesting itself/custom functions inside main object(s).
          </li>
          <li align="start">
            In the other hand, <code>extend</code> version is the most stable and powerful, it can handle almost any cases you can imagine (if not, please open an issue), your only trade-off is that it's a very little bit slower than <code>default</code> version (because of AST parsing).
          </li>
          <li align="start">
            I think you should try with <code>default</code>, <code>default/lite</code> version first. BTW, I'm currently using <code>extend/lite</code> version.
          </li>
        </ul>
      </td>
    </tr>
  </table>
</div>

<h3 align="center">
Tested conditions
</h3>

| No. | Framework/Lib    | Version                     | Additional info                                                | Tester | Status |
|:---:|:-----------------|:----------------------------|:---------------------------------------------------------------|:------:|:------:|
| 1\. | `next`           | 15.0.0-canary.156           | With `--turbo` flag and `babel-plugin-react-compiler` enabled. | author |   ✅   |
| 2\. | `react`          | 19.0.0-rc-206df66e-20240912 |                                                                | author |   ✅   |
| 3\. | `tailwindcss`    | 3.4.11                      |                                                                | author |   ✅   |
| 4\. | `tailwind-merge` | 2.5.2                       |                                                                | author |   ✅   |

</div>

---

## 📌 Table of contents

- [News](#-news)
- [Quick intro](#-quick-intro)
- [Getting started](#-getting-started)
  - [`default` version](#-default-version)
  - [`extend` version](#-extend-version)
- [More on docs](#-docs)
- [Changelog](#-changelog)
- [Contributing](#-contributing)
- [Credits](#-credits)

## 📰 News

<details>

<summary>Click to expand/collapse this section</summary>

- 🔥 From `v6.0.2`:
  - Type `TransformerOptions` (previously `ReplacerOptions`) can now be imported from each entry point.

- 🔥 From `v6.0.0`:
  - Rename `replacer()` function to `transformer()`.
  - Remove `*/replacer` entry point, `transformer()` now is in the same entry point as `twg()`, also with `createTwg()` function. That means `transformer()` function will be combined/located in the same file with `twg()`, to take advantage of its API without rewrite it in another entry.
  - ~25% lighter bundle size in overall.

- 🔥 From `v5.0.3`:
  - Enable `tree-shaking` for the package.

- 🔥 From `v5.0.0`:
  - From now if you want to use custom `separator` option, you need to define the `separator` option in new `createTwg()` function (previously in the last Object of `twg()` function) and also in `transformer()` function like previous version.

- 🔥 From `v4.0.0`:
  - Make `extend` version (which previously called **AST** version) as optional entry point. From now if you want to use `extend` version, you need to install 4 more `@babel` dependencies, refer to docs.
  - Default version now using `combiner()` which written in native JS to parse conditionals (use with limitations).

- 🔥 From `v3.1.0`:
  - Supports nesting custom callee functions through `nestingCallee` option _(default version only)_.

    ```js
    transform: {
      DEFAULT: transformer({
        // Define options here, eg.:
        callee: "twg",
        nestingCallee: ["cn", "twg"]
      })
    }
    ```

    **Usage:** see [custom `nestingCallee`](../docs/options.md#-custom-nestingcallee).

- 🔥 From `v2.0.0`:
  - Supports native objects behavior like `clsx` (Key as classes and value as conditionals)

    ```jsx
    twg({ foo: true, bar: false, baz: isTrue() });
    //=> "foo baz"

    twg({ "you are": true, not: false, m_y: 1, "destiny": isTrue() });
    //=> "you are m_y destiny"
    ```

  - Use `@babel` AST to parse all conditional classes, objects, arrays or even both string and array.
    - **Pros:**
      - More accurate, more trust in processing.
      - Works perfectly even with complex conditionals like nested ternary and inside template literal.
      - Reduce several complex regex use to parse condition.
      - Resolve all outstanding issues related to any kind of conditionals, nested conditionals.
    - **Cons:**
      - Currently work on _(.js, .ts, .jsx, .tsx)_ file only.
      - A bit slower, especially on the first time, when nothing is cached.
      - 4 more dependencies 😢

- 🔥 Lite version:

  Same as default, but:

  - Without any options API except for custom `callee` in [`transformer()` options](../docs/options.md#transformer-options).
  - No `debug messages` (no console messages).
  - No `JSDoc` comments for each function.
  - 20 ~ 30% lighter.
  - Compile 200 ~ 300ms faster (`extend` version).

> [!TIP]
> When you tested using with default version, and everything's OK. So you could want to use lite version, for better performance.

</details>

## 🚨 Quick intro

> [!TIP]
> Simply open an Object, put the `variant` as key, and classes you want to map to that `variant` as each value.\
> And if you want to nest other variants inside a variant, you can open an Array and start use it like you've just call a callee function. See [usage / use cases](../docs/usage.md) for more details.

Example:

```jsx
<div className={twg(
  "size-92 relative grid place-items-center",
  {
    before: "absolute inset-0 bg-red-500",
    "aria-expanded": "bg-red-500 text-yellow-500",
  }
)}>
  Hello, World!
</div>
```

Output (html):

```jsx
<div class="size-92 relative grid place-items-center before:absolute before:inset-0 before:bg-red-500 aria-expanded:bg-red-500 aria-expanded:text-yellow-500">
  Hello, World!
</div>
```

## 🚀 Getting started

### ⏩ `default` version

**1. Install the package**

```bash
pnpm add twg
```

or

```bash
npm install twg
```

**2. Setup**

```js
// tailwind.config.ts

import { type Config } from "tailwindcss"
import { transformer } from "twg"

export default {
  content: {
    files: [
      "./src/app/**/*.{ts,tsx}",
      "./src/components/**/*.{ts,tsx}",
    ], // Move your old `content` to `content.files` like this
    transform: {
      DEFAULT: transformer() // Put `transformer()` here
    }
  },
  // Other configurations...
} satisfies Config
```

- Lite version:

  ```js
  // tailwind.config.ts

  import { transformer } from "twg/lite"

  // Rest like above
  ```

- If you need to override default `transformer()` options:

  ```js
  transform: {
    DEFAULT: transformer({
      // Define options here, eg.:
      callee: "cn"
    })
  }
  ```

  See all [options](../docs/options.md#-default-version) and how to [custom options](../docs/options.md#-custom-options).

**3. Use**

```jsx
import { twg } from "twg"
```

- Lite version:

  ```jsx
  import { twg } from "twg/lite"
  ```

- If you need to override default `twg()` options, you need to use `createTwg()` function (not for lite version):

  ```js
  import { createTwg } from "twg"

  createTwg({ separator: "_" })(
    //...
  )
  ```

  See [custom `separator`](../docs/options.md#-custom-separator).

**DONE!**

### ⏩ `extend` version

> [!NOTE]
>You need to install 4 more `@babel` dependencies in order to use `extend` version. Besides that, you just need to change the import statement from `twg/*` to `twg/extend/*`.

**1. Install the package**

```bash
pnpm add twg @babel/generator @babel/parser @babel/traverse @babel/types
```

or

```bash
npm install twg @babel/generator @babel/parser @babel/traverse @babel/types
```

**2. Setup**

```js
// tailwind.config.ts

import { type Config } from "tailwindcss"
import { transformer } from "twg/extend"

export default {
  content: {
    files: [
      "./src/app/**/*.{ts,tsx}",
      "./src/components/**/*.{ts,tsx}",
    ], // Move your old `content` to `content.files` like this
    transform: {
      DEFAULT: transformer() // Put `transformer()` here
    }
  },
  // Other configurations...
} satisfies Config
```

- Lite version:

  ```js
  // tailwind.config.ts

  import { transformer } from "twg/extend/lite"

  // Rest like above
  ```

- If you need to override default `transformer()` options:

  ```js
  transform: {
    DEFAULT: transformer({
      // Define options here, eg.:
      callee: "cn"
    })
  }
  ```

  See all [options](../docs/options.md#-extend-version) and how to [custom options](../docs/options.md#-custom-options).

**3. Use**

```jsx
import { twg } from "twg/extend"
```

- Lite version:

  ```jsx
  import { twg } from "twg/extend/lite"
  ```

- If you need to override default `twg()` options, you need to use `createTwg()` function (not for lite version):

  ```js
  import { createTwg } from "twg/extend"

  createTwg({ separator: "_" })(
    //...
  )
  ```

  See [custom `separator`](../docs/options.md#-custom-separator).

**DONE!**

For more information, consider reading [custom options](../docs/options.md#-custom-options) ↗️ and [best practice](../docs/usage.md#best-practice-with-twmerge) ↗️.

See [how to use](../docs/usage.md) on docs 👇.

## 📚 Docs

- [Migration Guide](../docs/migration.md) ↗️
- [Usage / Use cases](../docs/usage.md) ↗️
  - [Usage](../docs/usage.md#-usage) ↗️
    - [Basic usage](../docs/usage.md#-basic-usage) ↗️
    - [Complex as ☠️ usage](../docs/usage.md#-complex-as-%EF%B8%8F-usage) ↗️
  - [Use cases](../docs/usage.md#-use-cases) ↗️
    - [Conditionals](../docs/usage.md#-conditionals) ↗️
    - [Nesting callee functions](../docs/usage.md#-nesting-callee-functions) ↗️
  - [Combination](../docs/usage.md#-combination) ↗️
- [Options](../docs/options.md) ↗️
  - [`transformer()` options](../docs/options.md#transformer-options) ↗️
  - [`twg` options](../docs/options.md#twg-options) ↗️
  - [Custom options](../docs/options.md#-custom-options) ↗️
    - [Custom `callee`](../docs/options.md#-custom-callee) ↗️
    - [Custom `nestingCallee`](../docs/options.md#-custom-nestingcallee) ↗️
    - [Custom `separator`](../docs/options.md#-custom-separator) ↗️
    - [Turn off `debug`](../docs/options.md#-turn-off-debug) ↗️
- [API](../docs/api.md) ↗️
- [Deeper explanation](../docs/introduction.md) ↗️
  - [What is `twg`?](../docs/introduction.md#-what-is-twg) ↗️
  - [Explanation](../docs/introduction.md#%EF%B8%8F-explanation) ↗️
  - [Trade-offs](../docs/introduction.md#-trade-offs) ↗️

## 🎉 Changelog

For full & latest update changelog, please refer to [CHANGELOG.md](../CHANGELOG.md).

## 💎 Contributing

### Bugs

`twg` now work for me but maybe not for you in some edges. Consider opening an [issue](https://github.com/hoangnhan2ka3/twg/issues) if you have any problem with it that I can fix it ASAP. Or a [pull request](https://github.com/hoangnhan2ka3/twg/pulls) is welcome too.

### Features

If you have any ideas, feel free to open a [feature request](https://github.com/hoangnhan2ka3/twg/issues/new/choose) template or make a [pull request](https://github.com/hoangnhan2ka3/twg/pulls) to share your ideas.

> For **Development** and more information on contributing please read [CONTRIBUTING.md](../CONTRIBUTING.md).

## 🪪 Credits

### References

- [easy-tailwind](https://github.com/Noriller/easy-tailwind) ↗️
- [clsx](https://github.com/lukeed/clsx) ↗️
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) ↗️
- [`content.transform` API](https://tailwindcss.com/docs/content-configuration#transforming-source-files) ↗️

### Project starts on

- August 15, 2024

### 💪 Work with me

<https://www.linkedin.com/in/hoangnhan2ka3/>

### Funding

[![Donate me](https://img.shields.io/static/v1?label=Donate%20me&message=❤️&style=social)](https://github.com/sponsors/hoangnhan2ka3)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/hoangnhan2ka3
)

---

<div align="center" width="100%">
  <table>
    <tr>
      <th width="500px">
        <div align="start">
          <a href="#-getting-started">Getting started</a>
        </div>
      </th>
      <th width="500px">
        <div align="center">
          MIT © <a href="https://github.com/hoangnhan2ka3">Nguyễn Hoàng Nhân</a>
        </div>
      </th>
      <th width="500px">
        <div align="end">
          <a href="#">Scroll to top</a>
        </div>
      </th>
    </tr>
  </table>
</div>
