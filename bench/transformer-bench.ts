import { transformer } from "../dist/transformer.js"
import Benchmark from "benchmark"

const { Suite } = Benchmark

const transformConfigDefault = transformer()

const largeJSXContent = `
export default function Header() {
    return (
        <header className={twg(
            "fixed inset-x-0 top-0 z-50 transition-all duration-300",
            {
                "bg-white shadow-md": isScrolled,
                "bg-transparent": !isScrolled,
            }
        )}>
            <div className={twg("container mx-auto px-4")}>
                <nav className={twg(
                    "flex items-center justify-between py-4",
                    {
                        lg: [
                            "py-6",
                            { hover: "bg-gray-50" }
                        ]
                    }
                )}>
                    {/* Menu Item */}
                    <a href="#" className={twg(
                        "text-sm font-semibold leading-6 text-gray-900",
                        {
                            hover: isActive ? "text-indigo-600" : [
                                "text-indigo-500",
                                isAndOr && "underline decoration-2"
                            ],
                            focus: "outline-none ring-2 ring-indigo-500",
                            active: 10000,
                            dark: isActive ? "text-white" : "text-gray-300"
                        }
                    )}>
                        Products
                    </a>

                    <div className={twg(
                        "hidden",
                        {
                            md: "flex gap-x-12",
                            lg: {
                                "gap-x-14": true,
                                "gap-x-16": isLargeMonitor()
                            }
                        }
                    )}>
                        <button className={twg(
                            "btn-primary",
                            {
                                sm: "btn-sm",
                                md: "btn-md",
                                lg: isActive() ? "btn-lg" : "btn-md"
                            }
                        )}>
                            Click me
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    )
}
`

console.log("\n# Transformer Benchmark")

new Suite()
    .add("transformer", () => {
        transformConfigDefault(largeJSXContent)
    })
    .on("cycle", (event: Benchmark.Event) => {
        const benchInstance = event.target as unknown as Benchmark
        console.log("  " + benchInstance.toString())
    })
    .run()
