<div align="center">
  <img src="../public/twg_logo.webp" alt="twg logo" width="150px" height="150px">
</div>

<h1 align="center">💡 Usage / Use cases</h1>

## 📌 Table of contents

- [Usage](#-usage)
  - [Basic usage](#-basic-usage)
  - [Complex as ☠️ usage](#-complex-as-%EF%B8%8F-usage)
- [Use cases](#-use-cases)
  - [Conditionals](#-conditionals)
  - [Nesting callee functions](#-nesting-callee-functions)
- [Combination](#-combination)

---

> [!NOTE]
> Almost below examples using `default` version import statement. If you want to use `extend` version, you need to change the import statement from `twg/*` to `twg/extend/*`, after you've followed [Getting started with `extend` version](../.github/README.md#-extend-version).

## ✨ Usage

### ⏩ Basic usage

```jsx
// HelloWorld.tsx

import { twg } from "twg"

export function HelloWorld() {
  return (
    <div
      className={twg("size-92 relative grid place-items-center px-4 py-2", {
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
  class="size-92 relative grid place-items-center px-4 py-2 before:absolute before:inset-0 before:bg-red-500 before:hover:bg-blue-500 before:hover:text-yellow-500 aria-expanded:bg-red-500 aria-expanded:text-yellow-500"
>
  Hello, World!
</div>
```

### ⏩ Complex as ☠️ usage

```jsx
// HelloWorld.tsx

import { twg } from "twg"

export function HelloWorld() {
  return (
    <div
      className={twg(
        "Lorem ipsum",
        "dolor sit",
        ["amet", "consectetur adipiscing elit"],
        ["Sed sit", "amet ligula", ["ex", "Ut"]],
        {
          var1: "in suscipit metus",
          var2: [
            "vel accumsan",
            "orci",
            ["Vivamus sapien", "neque", ["dictum vel", "felis maximus"]]
          ],
          var3: ["luctus", { var4: "lorem" }],
          var5: [
            "Fusce malesuada massa",
            ["eu turpis finibus"],
            {
              var6: [
                "mollis",
                {
                  var7: [
                    "In augue tortor",
                    {
                      var8: [
                        "porta eu erat sit amet",
                        ["tristique", "ullamcorper", "arcu"]
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      )}
    >
      Hello, World!
    </div>
  )
}
```

Output (html):

```html
<div
  class="Lorem ipsum dolor sit amet consectetur adipiscing elit Sed sit amet ligula ex Ut var1:in var1:suscipit var1:metus var2:vel var2:accumsan var2:orci var2:Vivamus var2:sapien var2:neque var2:dictum var2:vel var2:felis var2:maximus var3:luctus var3:var4:lorem var5:Fusce var5:malesuada var5:massa var5:eu var5:turpis var5:finibus var5:var6:mollis var5:var6:var7:In var5:var6:var7:augue var5:var6:var7:tortor var5:var6:var7:var8:porta var5:var6:var7:var8:eu var5:var6:var7:var8:erat var5:var6:var7:var8:sit var5:var6:var7:var8:amet var5:var6:var7:var8:tristique var5:var6:var7:var8:ullamcorper var5:var6:var7:var8:arcu"
>
  Hello, World!
</div>
```

---

## 🪴 Use cases

> [!TIP]
> In short, just use `twg` as the way you use `clsx` or `classnames`, except for the `object zones` which you can use the `twg` way.

### ⏩ Conditionals

You can use conditional like `&& | || | ??` _(logical)_ or `isFooBar === "twg" ? "..." : "..."` _(ternary)_ as well:

- Conditional classes:

  ```jsx
  // HelloWorld.tsx

  import { twg } from "twg"
  import { useState } from "react"

  export function HelloWorld() {
    const [isAndOr, setIsAndOr] = useState(false)
    const [isTernary, setIsTernary] = useState("foo")
    // ...
    return (
      <div className={twg(
        "size-92 relative px-4 py-2",
        isTernary === "bar" ? "grid place-items-center" : "flex items-center justify-center",
        {
          before: [
            "absolute inset-0",
            isTernary === "foo" ? "bg-red-500" : "bg-green-500",
            hover: [
              "bg-blue-500 text-yellow-500",
              isAndOr && "border-2 border-white"
            ]
          ],
          "aria-expanded": isAndOr ?? "bg-red-500 text-yellow-500"
        }
      )}>
        Hello, World!
      </div>
    )
  }
  ```

- Conditional objects:

  ```jsx
  // HelloWorld.tsx

  import { useState } from "react"
  import { twg } from "twg"

  export function HelloWorld() {
    const [isAndOr, setIsAndOr] = useState(false)
    const [isTernary, setIsTernary] = useState("foo")
    // ...
    return (
      <div
        className={twg("size-92 relative grid place-items-center px-4 py-2", {
          before: [
            "absolute inset-0 bg-red-500",
            isTernary === "bar"
              ? {
                  hover: "bg-blue-500 text-yellow-500"
                }
              : {
                  hover: [
                    "bg-blue-500 text-yellow-500",
                    isAndOr && "border-2 border-white"
                  ]
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

- Or even crazy conditional objects:

  ```jsx
  // HelloWorld.tsx

  import { twg } from "twg"
  import { useState } from "react"

  export function HelloWorld() {
    const [isAndOr, setIsAndOr] = useState(false)
    const [isTernary, setIsTernary] = useState("foo")
    // ...
    return (
      <div className={twg(
        "multiple classes",
        {
          var1: [
            "multiple classes",
            isTernary === "foo" ? {
              var2: "multiple classes"
            } : {
              var2: [
                "multiple classes",
                isAndOr && "another class",
                isTernary === "bar" ? {
                  var3: [
                    "class",
                    isTernary === "baz" ? {
                      var4: "multiple classes"
                    } : {
                      var4: ["multiple classes"]
                    }
                  ]
                } : {
                  var3: ["multiple classes"]
                }
              ]
            }
          ],
          "var-5": "multiple classes"
        }
      )} />
        Hello, World!
      </div>
    )
  }
  ```

  Output _(what Tailwind will scan, not in browser's inspect tool)_:

  ```html
  <div
    className="multiple classes var1:multiple var1:classes var1:var2:multiple var1:var2:classes var1:var2:multiple var1:var2:classes var1:var2:another var1:var2:class var1:var2:var3:class var1:var2:var3:var4:multiple var1:var2:var3:var4:classes var1:var2:var3:var4:multiple var1:var2:var3:var4:classes var1:var2:var3:multiple var1:var2:var3:classes var-5:multiple var-5:classes"
  >
    Hello, World!
  </div>
  ```

- Conditional with string and array:

  ```jsx
  // HelloWorld.tsx

  import { useState } from "react"
  import { twg } from "twg"

  export function HelloWorld() {
    const [isAndOr, setIsAndOr] = useState(false)
    const [isTernary, setIsTernary] = useState("foo")
    // ...
    return (
      <div
        className={twg("size-92 relative grid place-items-center px-4 py-2", {
          before:
            isTernary === "foo"
              ? [
                  "absolute inset-0 bg-red-500",
                  {
                    hover: isTernary
                      ? "bg-blue-500 text-yellow-500"
                      : [
                          "bg-blue-500 text-yellow-500",
                          isAndOr && "border-2 border-white"
                        ]
                  }
                ]
              : ["fixed inset-0 bg-yellow-500"],
          "aria-expanded": "bg-red-500 text-yellow-500"
        })}
      >
        Hello, World!
      </div>
    )
  }
  ```

  Output _(what Tailwind will scan, not in browser's inspect tool)_:

  ```html
  <div
    className="size-92 relative grid place-items-center px-4 py-2 before:absolute before:inset-0 before:bg-red-500 before:hover:bg-blue-500 before:hover:text-yellow-500 before:hover:bg-blue-500 before:hover:text-yellow-500 before:hover:border-2 before:hover:border-white before:fixed before:inset-0 before:bg-yellow-500 aria-expanded:bg-red-500 aria-expanded:text-yellow-500"
  >
    Hello, World!
  </div>
  ```

### ⏩ Nesting callee functions

```jsx
// HelloWorld.tsx

import { useState } from "react"
import { twg } from "twg"

export function HelloWorld() {
  const [isAndOr, setIsAndOr] = useState(false)
  const [isTernary, setIsTernary] = useState("foo")
  // ...
  return (
    <div
      className={twg("size-92 relative grid place-items-center px-4 py-2", {
        before: [
          "absolute inset-0",
          twg("bg-red-500", {
            hover: [
              "bg-blue-500 text-yellow-500",
              {
                active: "border-2 border-white"
              }
            ]
          })
        ]
      })}
    >
      Hello, World!
    </div>
  )
}
```

Output _(what Tailwind will scan, not in browser's inspect tool)_:

```html
<div
  className="size-92 relative grid place-items-center px-4 py-2 before:absolute before:inset-0 before:bg-red-500 before:hover:bg-blue-500 before:hover:text-yellow-500 before:hover:active:border-2 before:hover:active:border-white"
>
  Hello, World!
</div>
```

Or even more complex:

```jsx
// HelloWorld.tsx

import { useState } from "react"
import { twg } from "twg"

export function HelloWorld() {
  const [isAndOr, setIsAndOr] = useState(false)
  const [isTernary, setIsTernary] = useState("foo")
  // ...
  return (
    <div
      className={twg("size-92 relative grid place-items-center px-4 py-2", {
        before: [
          "absolute inset-0",
          twg("bg-red-500", {
            hover: [
              "bg-blue-500 text-yellow-500",
              twg("border-0 border-purple-500", {
                active: "border-2 border-white"
              })
            ]
          })
        ]
      })}
    >
      Hello, World!
    </div>
  )
}
```

Output _(what Tailwind will scan, not in browser's inspect tool)_:

```html
<div
  className="size-92 relative grid place-items-center px-4 py-2 before:absolute before:inset-0 before:bg-red-500 before:hover:bg-blue-500 before:hover:text-yellow-500 before:hover:border-0 before:hover:border-purple-500 before:hover:active:border-2 before:hover:active:border-white"
>
  Hello, World!
</div>
```

If you wan to nest other than the `callee` function you chose.

```jsx
// HelloWorld.tsx

import clsx from "clsx"
import { twg } from "twg"

export function HelloWorld() {
  return (
    <div
      className={twg("size-92 relative grid place-items-center px-4 py-2", {
        before: [
          "absolute inset-0",
          clsx(
            //  ^^^^ DON'T DO THIS
            "bg-red-500",
            "hover:bg-blue-500 hover:text-yellow-500",
            "active:border-2 active:border-white"
          )
        ]
      })}
    >
      Hello, World!
    </div>
  )
}
```

You will receive the following error unless you define the [`nestingCallee`](./options.md#-custom-nestingcallee) option:

```bash
[TWG] Skip: clsx is not defined in:
twg("size-92 relative grid place-items-center px-4 py-2", {
  before: ["absolute inset-0", clsx("bg-red-500", "hover:bg-blue-500 hover:text-yellow-500", "active:border-2 active:border-white")]
})
```

> [!IMPORTANT]
> `twg()` behavior is similar to `clsx()` or `classnames()`, so you should not mix the use of them in order to avoid any unexpected behavior.

## 🤝 Combination

### Best practice with [`twMerge`](https://github.com/dcastil/tailwind-merge)

```js
// tailwind.config.ts

import { type Config } from "tailwindcss"
import { transformer } from "twg"

export default {
  content: {
    // ...
    transform: {
      DEFAULT: transformer({
        callee: "cn"
      })
    }
  },
  // ...
} satisfies Config
```

Default:

```js
// src/lib/utils.ts

import { twg, type ClassValue } from "twg"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(twg(...inputs))
}
```

Extend options:

```js
// src/lib/utils.ts

import { createTwg, type ClassValue } from "twg"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge<...>({
  extend: { ... }
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(createTwg({
    // Define options here, eg.:
    separator: "-"
  })(...inputs))
}
```

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
          <a href="#-usage--use-cases">Scroll to top</a>
        </div>
      </th>
    </tr>
  </table>
</div>
