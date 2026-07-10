<div align="center">
  <img src="../public/twg_logo.webp" alt="twg logo" width="150px" height="150px">
</div>

<h1 align="center">📊 Benchmark</h1>

## 📌 Table of contents

- [How to run](#-how-to-run)
- [Results](#-results)

---

## 💡 How to run

First, build or rebuild the package by running at root:

```bash
pnpm build
```

Then, make sure you are in the `benchmark` folder, if not, run (from the root folder):

```bash
cd benchmark
```

Then, install the dependencies by running:

```bash
pnpm install
```

Run the benchmark by running:

```bash
pnpm bench
```

or

```bash
ts-node index.ts
```

---

## 👀 Results

### Node

These are the results while running this directory's benchmark suite in Node v22.18.0.

---

#### `twg()`

> **Note:** The `≠` denotes that the candidate has a different API and is not compatible with `classnames` usage.

```bash
# Strings
  classnames x 12,207,780 ops/sec ±0.86% (94 runs sampled)
  classcat ≠ x 12,209,138 ops/sec ±0.74% (94 runs sampled)
  twg ≠ x 12,144,133 ops/sec ±1.58% (91 runs sampled)
  clsx x 12,254,526 ops/sec ±1.28% (93 runs sampled)
  clsx/lite x 13,266,751 ops/sec ±1.06% (94 runs sampled)

# Objects
  classnames x 9,884,875 ops/sec ±1.07% (91 runs sampled)
  classcat ≠ x 10,426,481 ops/sec ±1.32% (92 runs sampled)
  twg ≠ x 9,403,628 ops/sec ±0.91% (92 runs sampled)
  clsx x 9,915,957 ops/sec ±1.73% (94 runs sampled)

# Arrays
  classnames x 8,615,768 ops/sec ±1.17% (94 runs sampled)
  classcat ≠ x 10,076,391 ops/sec ±0.86% (92 runs sampled)
  twg ≠ x 8,546,490 ops/sec ±0.77% (95 runs sampled)
  clsx x 8,894,983 ops/sec ±0.91% (92 runs sampled)

# Nested Arrays
  classnames x 6,188,246 ops/sec ±1.02% (93 runs sampled)
  classcat ≠ x 8,065,545 ops/sec ±1.03% (94 runs sampled)
  twg ≠ x 6,805,095 ops/sec ±1.31% (91 runs sampled)
  clsx x 7,227,143 ops/sec ±1.05% (94 runs sampled)

# Nested Arrays w/ Objects
  classnames x 7,137,698 ops/sec ±1.00% (91 runs sampled)
  classcat ≠ x 8,280,143 ops/sec ±1.49% (93 runs sampled)
  twg ≠ x 7,204,264 ops/sec ±1.12% (91 runs sampled)
  clsx x 7,700,898 ops/sec ±1.40% (93 runs sampled)

# Mixed
  classnames x 7,716,801 ops/sec ±1.01% (92 runs sampled)
  classcat ≠ x 8,606,574 ops/sec ±1.77% (86 runs sampled)
  twg ≠ x 7,810,431 ops/sec ±1.21% (93 runs sampled)
  clsx x 8,314,500 ops/sec ±0.97% (94 runs sampled)

# Mixed
  classnames x 2,033,325 ops/sec ±0.68% (96 runs sampled)
  classcat ≠ x 2,199,702 ops/sec ±1.05% (93 runs sampled)
  twg ≠ x 2,323,251 ops/sec ±0.74% (95 runs sampled)
  clsx x 2,266,033 ops/sec ±0.85% (91 runs sampled)
```

---

#### `transformer()`

```bash
# [v7.1.1]
  transformer x 17,765 ops/sec ±0.81% (93 runs sampled)

# [v7.1.2]
  transformer x 24,944 ops/sec ±1.23% (91 runs sampled)
```

---

<div align="center" width="100%">
  <table>
    <tr>
      <th width="500px">
        <div align="start">
          <a href="https://github.com/hoangnhan2ka3/twg">< Back to main</a>
        </div>
      </th>
      <th width="500px">
        <div align="center">
          MIT © <a href="https://github.com/hoangnhan2ka3">Nguyễn Hoàng Nhân</a>
        </div>
      </th>
      <th width="500px">
        <div align="end">
          <a href="#-benchmark">Scroll to top</a>
        </div>
      </th>
    </tr>
  </table>
</div>
