<div align="center">
  <img src="../public/twg_logo.webp" alt="twg logo" width="150px" height="150px">
</div>

<h1 align="center">📊 Benchmark</h1>

## 📌 Table of contents

- [How to run](#-how-to-run)
- [Results](#-results)

---

## 💡 How to run

First, make sure you are in the `benchmark` folder, if not, run (from the root folder):

```bash
cd benchmark
```

Then, install the dependencies by running:

```bash
pnpm install
```

Run the benchmark by running:

```bash
pnpm benchmark
```

or

```bash
ts-node index.ts
```

---

## 👀 Results

### Node

These are the results while running this directory's benchmark suite in Node v22.18.0.

> **Note:** The `≠` denotes that the candidate has a different API and is not compatible with `classnames` usage.

```bash
# Strings
  clsx x 12,417,515 ops/sec ±0.97% (92 runs sampled)
  clsx/lite x 13,350,310 ops/sec ±0.97% (93 runs sampled)
  classnames x 12,263,620 ops/sec ±0.62% (95 runs sampled)
  classcat ≠ x 12,376,641 ops/sec ±0.59% (92 runs sampled)
  twg x 7,447,336 ops/sec ±0.84% (91 runs sampled)

# Objects
  clsx x 10,143,833 ops/sec ±0.69% (93 runs sampled)
  clsx/lite x 50,418,289 ops/sec ±1.88% (88 runs sampled)
  classnames x 9,660,015 ops/sec ±0.54% (96 runs sampled)
  classcat ≠ x 10,595,752 ops/sec ±0.81% (93 runs sampled)
  twg x 7,270,141 ops/sec ±0.63% (96 runs sampled)

# Arrays
  clsx x 9,007,817 ops/sec ±1.09% (89 runs sampled)
  clsx/lite x 50,260,078 ops/sec ±2.16% (90 runs sampled)
  classnames x 8,714,718 ops/sec ±0.98% (95 runs sampled)
  classcat ≠ x 10,387,808 ops/sec ±0.63% (95 runs sampled)
  twg x 6,707,428 ops/sec ±1.22% (92 runs sampled)

# Nested Arrays
  clsx x 7,348,522 ops/sec ±0.51% (93 runs sampled)
  clsx/lite x 49,631,976 ops/sec ±2.63% (87 runs sampled)
  classnames x 6,233,967 ops/sec ±1.35% (96 runs sampled)
  classcat ≠ x 8,055,541 ops/sec ±1.33% (92 runs sampled)
  twg x 5,539,259 ops/sec ±0.72% (95 runs sampled)

# Nested Arrays w/ Objects
  clsx x 7,920,697 ops/sec ±0.87% (95 runs sampled)
  clsx/lite x 49,641,687 ops/sec ±2.37% (91 runs sampled)
  classnames x 6,761,362 ops/sec ±0.61% (92 runs sampled)
  classcat ≠ x 8,578,041 ops/sec ±1.57% (92 runs sampled)
  twg x 6,075,150 ops/sec ±0.70% (93 runs sampled)

# Mixed
  clsx x 8,367,941 ops/sec ±1.41% (91 runs sampled)
  clsx/lite x 25,772,955 ops/sec ±1.11% (94 runs sampled)
  classnames x 7,430,951 ops/sec ±0.58% (94 runs sampled)
  classcat ≠ x 9,002,533 ops/sec ±1.20% (90 runs sampled)
  twg x 6,059,438 ops/sec ±0.51% (92 runs sampled)

# Mixed (Bad Data)
  clsx x 2,341,168 ops/sec ±1.07% (90 runs sampled)
  clsx/lite x 21,865,850 ops/sec ±0.74% (93 runs sampled)
  classnames x 2,004,121 ops/sec ±0.59% (93 runs sampled)
  classcat ≠ x 2,239,918 ops/sec ±0.63% (93 runs sampled)
  twg x 2,020,909 ops/sec ±1.72% (93 runs sampled)
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
