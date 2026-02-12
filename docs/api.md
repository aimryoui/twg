<div align="center">
  <img src="../public/twg_logo.webp" alt="twg logo" width="150px" height="150px">
</div>

<h1 align="center">✨ API</h1>

## 📌 Table of contents

- [`tranformer()`](#transformeroptionscontent)
- [`createTwg()`](#createtwgoptionsinputs)
- [`twg()`](#twginputs)

---

## `transformer(options)(content)`

Exports: `named`

Returns: `(content: string) => string`

_@param_ — **[options](../docs/options.md#transformer-options)**: callee, separator, debug

Types: `TransformerOptions`

```js
interface TransformerOptions {
  callee?: string | string[],
  separator?: string,
  debug?: boolean
}
```

## `createTwg(options)(...inputs)`

Exports: `named`

Returns: `(...inputs: ClassValue[]) => string`

_@param_ — **[options](../docs/options.md#createtwg-options)**: separator

Types: `TWGOptions`

```js
interface TWGOptions {
  separator?: string
}
```

_@param_ — **inputs**

Types: `ClassValue[]`

```js
type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassDictionary
  | ClassValue[]
type ClassDictionary = Record<string, any>
```

## `twg(...inputs)`

Exports: `named`

Returns: `string`

_@param_ — **inputs**

Types: `ClassValue[]`

```js
type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassDictionary
  | ClassValue[]
type ClassDictionary = Record<string, any>
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
          <a href="#-api">Scroll to top</a>
        </div>
      </th>
    </tr>
  </table>
</div>
