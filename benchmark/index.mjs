import { twg } from "../dist/index.mjs"
import pkg from "benchmark"
import clsx from "clsx"

const { Suite } = pkg

function bench(name, ...args) {
    console.log(`\n# ${name}`)
    try {
        new Suite()
            .add("clsx", () => clsx.apply(clsx, args))
            .add("twg", () => twg.apply(twg, args))
            .add("twgLite", () => twgLite.apply(twgLite, args))
            .add("twgExtend", () => twgExtend.apply(twgExtend, args))
            .add("twgExtendLite", () =>
                twgExtendLite.apply(twgExtendLite, args)
            )
            .on("cycle", (e) => console.log("  " + e.target))
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
    () => {},
    { bax: true, bux: false, 123: true },
    ["baz", { bax: false, bux: true, abc: null }, {}]
)
