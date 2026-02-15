<div align="center">
  <img src="../public/twg_thumbnail.webp" alt="twg thumbnail">
</div>

<h1 align="center">twg</h1>

<p align="center">
  <a href="https://github.com/hoangnhan2ka3/twg/actions"><img src="https://badgen.net/github/checks/hoangnhan2ka3/twg/main?label=tests&color=f279b6" alt="Tests Status"></a>
  <a href="https://github.com/hoangnhan2ka3/twg"><img src="https://badgen.net/github/stars/hoangnhan2ka3/twg?color=f279b6" alt="Repository stars"></a>
  <a href="https://bundlejs.com/?q=twg"><img src="https://badgen.net/bundlejs/min/twg?label=bundle&color=f279b6" alt="Bundle Size"></a>
  <a href="https://bundlejs.com/?q=twg"><img src="https://badgen.net/bundlejs/minzip/twg?label=gzip&color=f279b6" alt="Gzip Size"></a>
  <a href="https://www.npmjs.com/package/twg"><img src="https://badgen.net/npm/dt/twg?color=f279b6" alt="Total Downloads"></a>
  <a href="https://www.npmjs.com/package/twg"><img src="https://badgen.net/npm/v/twg?color=f279b6" alt="Latest Release"></a>
  <a href="https://github.com/twg/twg/blob/main/LICENSE"><img src="https://badgen.net/npm/license/twg?color=f279b6" alt="License"></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/twg?activeTab=dependencies"><img src="https://badgen.net/badge/dependencies/1?color=f279b6" alt="Dependency Count"></a>
  <a href="https://bundlephobia.com/result?p=twg"><img src="https://badgen.net/badge/tree-shaking/supported?color=f279b6" alt="Tree Shakable Supports"></a>
</p>

<h3 align="center">
🪥 A utility function for grouping Tailwind CSS variants.
</h3>

<h4 align="center">
A more elegant way of writing Tailwind classes. Never need to repeating the same variants over and over again 🤯.
</h4>

---

<div align="center">

| 📍 Entry point  | 📦 Bundle |  📦 Gzip   |
| :-------------- | :-------: | :--------: |
| `twg`           |   732 B   | **413 B**  |
| `twg/transform` |  3627 B   | **1489 B** |

</div>

---

## 🗝️ Features

- ✅ Support for normal strings.
- ✅ Support for multiple objects parsing.
- ✅ Support for nesting multiple objects, arrays, and itself functions.
- ✅ Support for (multiple) conditional classes, objects, and arrays.
- ✅ Customizable `callee` name and `separator`.
- ✅ Compatible with wrappers like [`twMerge`](https://github.com/dcastil/tailwind-merge).
- ✅ "Base" support for Tailwind CSS IntelliSense (IDEs extension), as well as [Hover Preview](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss#hover-preview).
- ✅ Tree-shaking friendly.

---

## 📃 Support

| Framework     | Version |
| :------------ | :------ |
| `tailwindcss` | `3.x`   |

> [!NOTE]
> Tailwind CSS `v4` is not supported. Because they removed [`content.transform`](https://v3.tailwindcss.com/docs/content-configuration#transforming-source-files) API.
> Currently, there is no way to intervene before Tailwind scans the classes.

---

## 📌 Table of contents

- [Quick intro](#-quick-intro)
- [Getting started](#-getting-started)
- [More on docs](#-docs)
- [Changelog](#-changelog)
- [Contributing](#-contributing)
- [Credits](#-credits)

---

## 🚨 Quick intro

Example:

```jsx
<div
  className={twg("size-92 relative grid place-items-center", {
    before: "absolute inset-0 bg-red-500",
    "aria-expanded": "bg-red-500 text-yellow-500"
  })}
>
  Hello, World!
</div>
```

Output (html):

```jsx
<div class="size-92 relative grid place-items-center before:absolute before:inset-0 before:bg-red-500 aria-expanded:bg-red-500 aria-expanded:text-yellow-500">
  Hello, World!
</div>
```

> [!TIP]
> Simply open an Object, put the `variant` as key, and classes you want to map to that `variant` as each value.
> See [usage / use cases](../docs/usage.md) for more details.

---

## 🚀 Getting started

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
import { transformer } from "twg/transform"

export default {
  content: {
    files: [
      "./src/app/**/*.{ts,tsx}",
      "./src/components/**/*.{ts,tsx}",
      "./src/content/**/*.mdx"
    ], // Move your old `content` to `content.files` like this
    transform: {
      DEFAULT: transformer() // Put `transformer()` here
    }
  },
  // ...
} satisfies Config
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

**3. Usage**

```jsx
import { twg } from "twg"
```

- If you need to override default `twg()` options, you need to use `createTwg()` function:

  ```js
  import { createTwg } from "twg"

  createTwg({ separator: "_" })(...inputs)
  //...
  ```

  See [custom `separator`](../docs/options.md#-custom-separator).

For more information, consider reading [custom options](../docs/options.md#-custom-options) ↗️ and [best practice](../docs/usage.md#best-practice-with-twmerge) ↗️.

See [how to use](../docs/usage.md) on docs 👇.

---

## 📚 Docs

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
  - [`createTwg()` options](../docs/options.md#createtwg-options) ↗️
  - [Custom options](../docs/options.md#-custom-options) ↗️
    - [Custom `callee`](../docs/options.md#-custom-callee) ↗️
    - [Custom `separator`](../docs/options.md#-custom-separator) ↗️
    - [Turn on `debug`](../docs/options.md#-turn-on-debug) ↗️
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
- [`content.transform` API](https://v3.tailwindcss.com/docs/content-configuration#transforming-source-files) ↗️

### Project starts on

- August 15, 2024

### 💪 Work with me

<https://www.linkedin.com/in/hoangnhan2ka3/>

### Funding

[![Donate me](https://img.shields.io/static/v1?label=Donate%20me&message=❤️&style=social)](https://github.com/sponsors/hoangnhan2ka3)

<a href="https://www.buymeacoffee.com/hoangnhan2ka3"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=hoangnhan2ka3&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff" /></a>

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
