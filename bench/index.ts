/* eslint-disable import-x/no-duplicates */
import { twg } from "../dist/index.js"
import Benchmark from "benchmark"
import classcat from "classcat"
import classNames from "classnames"
import clsx from "clsx"
import clsxLite from "clsx/lite"

const { Suite } = Benchmark

type ClsxArgs = Parameters<typeof clsx>
type ClassNamesArgs = Parameters<typeof classNames>
type ClsxLiteArgs = Parameters<typeof clsxLite>
type ClasscatArg = Parameters<typeof classcat>[0]

function bench(name: string, ...args: unknown[]): void {
    console.log(`\n# ${name}`)
    try {
        new Suite()
            .add("classnames", () => {
                classNames(...(args as ClassNamesArgs))
            })
            .add("classcat ≠", () => {
                classcat(args as ClasscatArg)
            })
            .add("twg ≠", () => {
                twg(...(args as Parameters<typeof twg>))
            })
            .add("clsx", () => {
                clsx(...(args as ClsxArgs))
            })
            .add("clsx/lite", () => {
                clsxLite(...(args as ClsxLiteArgs))
            })
            .on("cycle", (event: Benchmark.Event) => {
                const benchInstance = event.target as unknown as Benchmark
                console.log("  " + benchInstance.toString())
            })
            .run()
    } catch (error) {
        console.error("An error occurred during the benchmark:", error)
    }
}

bench("Strings", "foo", "", "bar", "baz", "bax", "bux")

bench(
    "Objects",
    { foo: true, bar: true, bax: true, bux: false },
    { baz: true, bax: false, bux: true }
)

bench("Arrays", ["foo", "bar"], ["baz", "bax", "bux"])

bench("Nested Arrays", ["foo", ["bar"]], ["baz", ["bax", ["bux"]]])

bench(
    "Nested Arrays w/ Objects",
    ["foo", { bar: true, bax: true, bux: false }],
    ["bax", { bax: false, bux: true }]
)

bench("Mixed", "foo", "bar", { bax: true, bux: false }, [
    "baz",
    { bax: false, bux: true }
])

bench(
    "Mixed (Bad Data)",
    "foo",
    "bar",
    undefined,
    null,
    NaN,
    () => {
        // Do nothing
    },
    { bax: true, bux: false, 123: true },
    ["baz", { bax: false, bux: true, abc: null }, {}]
)
