<div align="center">
  <img src="../public/twg_logo.webp" alt="twg logo" width="150px" height="150px">
</div>

<h1 align="center">⚙️ Options</h1>

## 📌 Table of contents

- [`transformer()` options](#-transformer-options)
- [`createTwg()` options](#-createtwg-options)
- [Custom options](#-custom-options)
  - [Custom `callee`](#-custom-callee)
  - [Custom `separator`](#-custom-separator)
  - [Turn off `debug`](#-turn-off-debug)

---

### `transformer()` options

| Options                    | Types              | Default | Description                                                                                                                                                                                                                                 |
| :------------------------- | :----------------- | :-----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `callee?`                  | string \| string[] |  "twg"  | The function name to use for detecting Tailwind classes. You can change it to whatever you like, eg. `cn`, `cx`, etc. or `["cn", "cx"]`. _(Name it as unique as possible or you'll have conflicts)_                                         |
| `separator?`<sup>[*]</sup> | string             |   ":"   | The separator used to join the variant with classes. If `""` (empty string), you may need to write it manually, eg.: `{"before:": "flex"}`. <sup>[*]</sup>Remember to **sync** this option with `separator` option in `createTwg()` option. |
| `debug?`                   | boolean            |  false  | Printing debug messages in console if there are any warnings or errors. If `false`, it will be silent                                                                                                                                       |

See [custom options](#-custom-options).

### `createTwg()` options

| Options                    | Types  | Default | Description                                                                                                                                                                                                                                   |
| :------------------------- | :----- | :-----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `separator?`<sup>[*]</sup> | string |   ":"   | The separator used to join the variant with classes. If `""` (empty string), you may need to write it manually, eg.: `{"before:": "flex"}`. <sup>[*]</sup>Remember to **sync** this option with `separator` option in `transformer()` option. |

See [custom separator](#-custom-separator).

## 🔧 Custom options

### ⏩ Custom `callee`

> [!IMPORTANT]
> You must define the `callee` option to `transformer()` before using the main function.

**1. Change the `callee` option `transformer()` to the callee name you want.**

eg. with `cn`:

```js
// tailwind.config.ts

transform: {
  DEFAULT: transformer({
    callee: "cn"
  })
}
```

eg. with `cn`, `cx`, `twg`; use an array:

```js
// tailwind.config.ts

transform: {
  DEFAULT: transformer({
    callee: ["cn", "cx", "twg"]
  })
}
```

**2. Use several ways to import it:**

- **Option 1:**

  ```jsx
  import { twg as cn } from "twg"
  ```

- **Option 2:**

  ```jsx
  // src/lib/utils.ts
  import { twg as cn } from "twg"

  export { cn }
  ```

  ```jsx
  // src/component.tsx
  import { cn } from "@/lib/utils"
  ```

- **Option 3:** [Use with wrapper like `twMerge` 👇](../docs/usage.md#best-practice-with-twmerge).

**3. Example:**

- This will work:

  ```jsx
  <div
    className={cn("size-92 relative grid place-items-center", {
      before: "absolute inset-0 bg-red-500",
      "aria-expanded": "bg-red-500 text-yellow-500"
    })}
  >
    Hello, World!
  </div>
  ```

  ```jsx
  <div
    className={cx("size-92 relative grid place-items-center", {
      before: "absolute inset-0 bg-red-500",
      "aria-expanded": "bg-red-500 text-yellow-500"
    })}
  >
    Hello, World!
  </div>
  ```

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

- This will not work:

  ```jsx
  <div
    className={clsx("size-92 relative grid place-items-center", {
      before: "absolute inset-0 bg-red-500",
      "aria-expanded": "bg-red-500 text-yellow-500"
    })}
  >
    Hello, World!
  </div>
  ```

  Because `clsx` is not included in the `callee` string/array of `transformer()`.

### ⏩ Custom `separator`

Example with separator as `"_"`:

> [!IMPORTANT]
> You must define the `separator` option to **BOTH** `createTwg()` and `transformer()`.

**1. In `transformer()` options:**

```js
// tailwind.config.ts

import { type Config } from "tailwindcss"
import { transformer } from "twg/transform"

export default {
  content: {
    // ...
    transform: {
      DEFAULT: transformer({
        callee: "cn",
        separator: "_" // Define `separator` here
      })
    }
  },
  // ...
} satisfies Config
```

**2. In `createTwg()` options:**

> [!NOTE]
> `twg()` is an alias of `createTwg()` function, that mean `twg()` is simply exported with default `createTwg()`'s `separator` option, which is `":"`. So if you want to custom the `separator`, you must define it in `createTwg()`, not in `twg()`.

```js
// src/lib/utils.ts

import { createTwg, type ClassValue } from "twg"

export function cn(...inputs: ClassValue[]) {
  return createTwg({ separator: "_" })(...inputs)
}
```

**3. Example:**

```jsx
// HelloWorld.tsx

import { cn } from "@/lib/utils"

export function HelloWorld() {
  return (
    <div
      className={cn("size-92 relative grid place-items-center px-4 py-2", {
        before: [
          "absolute inset-0 bg-red-500",
          {
            hover: "bg-blue-500 text-yellow-500"
          }
        ],
        "aria-expanded": "bg-red-500 text-yellow-500"
      })}
    >
      Hello, World!
    </div>
  )
}
```

Output (html):

```html
<div
  class="size-92 relative grid place-items-center before_absolute before_inset-0 before_bg-red-500 before_hover_bg-blue-500 before_hover_text-yellow-500 aria-expanded_bg-red-500 aria-expanded_text-yellow-500"
>
  Hello, World!
</div>
```

If `separator` option is set to `""` (empty string), you may manually define the separator yourself:

```js
// src/lib/utils.ts

import { createTwg, type ClassValue } from "twg"

export function cn(...inputs: ClassValue[]) {
  return createTwg({ separator: "" })(...inputs)
}
```

Example:

```jsx
// HelloWorld.tsx

import { cn } from "@/lib/utils"

export function HelloWorld() {
  return (
    <div className={cn(
      "size-92 relative grid place-items-center px-4 py-2",
      {
        {/* `before:` instead of `before` */}
        "before:": [
          "absolute inset-0 bg-red-500",
          {
            "hover:": "bg-blue-500 text-yellow-500"
          }
        ],
        "text-": "lg red-500 pretty",
      }
    )}>
      Hello, World!
    </div>
  )
}
```

Output (html):

```html
<div
  class="size-92 relative grid place-items-center before:absolute before:inset-0 before:bg-red-500 before:hover:bg-blue-500 before:hover:text-yellow-500 text-lg text-red-500 text-pretty"
>
  Hello, World!
</div>
```

### ⏩ Turn on `debug`

If set to `true`, printing debug messages in console if there are any warnings or errors, eg.:

```bash
[TWG] Skip: Unexpected character '🚀'
```

If set to `false` (default), it will not print any debug messages.

---

<div align="center" width="100%">
  <table>
    <tr>
      <th width="500px">
        <div align="start">
          <a href="../docs/README.md">< Back to docs</a>
        </div>
      </th>
      <th width="500px">
        <div align="center">
          MIT © <a href="https://github.com/hoangnhan2ka3">Nguyễn Hoàng Nhân</a>
        </div>
      </th>
      <th width="500px">
        <div align="end">
          <a href="#%EF%B8%8F-options">Scroll to top</a>
        </div>
      </th>
    </tr>
  </table>
</div>
