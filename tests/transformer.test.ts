import { transformer } from "src/transformer"

describe("transformer()", () => {
    describe("Default options:", () => {
        it.each([
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            mod1: ["c{{{{{{lass", "other classes"],
                            mod2: ["class", { "additional-mod": "other cl}}asses" }]
                        }
                    )} />
                `,
                expected: `
                    <div className={"multiple classes mod1:c{{{{{{lass mod1:other mod1:classes mod2:class mod2:additional-mod:other mod2:additional-mod:cl}}asses"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            mod1: ["class", "other classes"],
                            mod2: ["class", { "additional-mod": "other classes" }]
                        }
                    )} />
                `,
                expected: `
                    <div className={"multiple classes mod1:class mod1:other mod1:classes mod2:class mod2:additional-mod:other mod2:additional-mod:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            // comment high
                            mod1: ["class", "other classes"],
                            mod2: ["class", { "additional-mod": "other classes" }]
                        }
                    )} />
                `,
                expected: `
                    <div className={"multiple classes mod1:class mod1:other mod1:classes mod2:class mod2:additional-mod:other mod2:additional-mod:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            mod1: ["class", "other classes"],
                            // comment middle
                            mod2: ["class", { "additional-mod": "other classes" }]
                        }
                    )} />
                `,
                expected: `
                    <div className={"multiple classes mod1:class mod1:other mod1:classes mod2:class mod2:additional-mod:other mod2:additional-mod:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            mod1: ["class", "other classes"],
                            mod2: ["class", { "additional-mod": "other classes" }]
                            // comment low
                        }
                    )} />
                `,
                expected: `
                    <div className={"multiple classes mod1:class mod1:other mod1:classes mod2:class mod2:additional-mod:other mod2:additional-mod:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg([
                        "multiple classes",
                        {
                            mod1: ["class", "other classes"],
                            mod2: ["class", { "additional-mod": "other classes" }]
                        }
                    ])} />
                `,
                expected: `
                    <div className={"multiple classes mod1:class mod1:other mod1:classes mod2:class mod2:additional-mod:other mod2:additional-mod:classes"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer()(contents)).toBe(expected)
        })
    })

    describe("Custom callee:", () => {
        it.each([
            {
                contents: `
                    <div className={cn(
                        "multiple classes",
                        {
                            mod1: ["class", "other classes"],
                            mod2: ["class", { "additional-mod": "other classes" }]
                        }
                    )} />
                `,
                expected: `
                    <div className={"multiple classes mod1:class mod1:other mod1:classes mod2:class mod2:additional-mod:other mod2:additional-mod:classes"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer({ callee: "cn" })(contents)).toBe(expected)
        })

        it.each([
            {
                contents: `
                    <div className={cn(
                        "multiple classes",
                        {
                            mod1: ["class", "other classes"],
                            mod2: ["class", { "additional-mod": "other classes" }]
                        }
                    )} />
                `,
                expected: `
                    <div className={"multiple classes mod1:class mod1:other mod1:classes mod2:class mod2:additional-mod:other mod2:additional-mod:classes"} />
                `
            },
            {
                contents: `
                    <div className={clsx(
                        "multiple classes",
                        {
                            mod1: ["class", "other classes"],
                            mod2: ["class", { "additional-mod": "other classes" }]
                        }
                    )} />
                `,
                expected: `
                    <div className={"multiple classes mod1:class mod1:other mod1:classes mod2:class mod2:additional-mod:other mod2:additional-mod:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            mod1: ["class", "other classes"],
                            mod2: ["class", { "additional-mod": "other classes" }]
                        }
                    )} />
                `,
                expected: `
                    <div className={"multiple classes mod1:class mod1:other mod1:classes mod2:class mod2:additional-mod:other mod2:additional-mod:classes"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(
                transformer({ callee: ["cn", "twg", "clsx"] })(contents)
            ).toBe(expected)
        })

        it.each([
            {
                contents: `
                    <div className={cn(
                        "multiple classes",
                        {
                            mod1: ["class", "other classes"],
                            mod2: ["class", { "additional-mod": "other classes" }]
                        }
                    )} />
                `,
                expected: `
                    <div className={cn(
                        "multiple classes",
                        {
                            mod1: ["class", "other classes"],
                            mod2: ["class", { "additional-mod": "other classes" }]
                        }
                    )} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            mod1: ["class", "other classes"],
                            mod2: ["class", { "additional-mod": "other classes" }]
                        }
                    )} />
                `,
                expected: `
                    <div className={twg(
                        "multiple classes",
                        {
                            mod1: ["class", "other classes"],
                            mod2: ["class", { "additional-mod": "other classes" }]
                        }
                    )} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer({ callee: "" })(contents)).toBe(expected)
        })
    })

    describe("Custom separator:", () => {
        it.each([
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            mod1: ["class", "other classes"],
                            mod2: ["class", { "additional-mod": "other classes" }]
                        }
                    )} />
                `,
                expected: `
                    <div className={"multiple classes mod1class mod1other mod1classes mod2class mod2additional-modother mod2additional-modclasses"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer({ separator: "" })(contents)).toBe(expected)
        })

        it.each([
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            mod1: ["class", "other classes"],
                            mod2: ["class", { "additional-mod": "other classes" }]
                        }
                    )} />
                `,
                expected: `
                    <div className={"multiple classes mod1-class mod1-other mod1-classes mod2-class mod2-additional-mod-other mod2-additional-mod-classes"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer({ separator: "-" })(contents)).toBe(expected)
        })

        it.each([
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            mod1: ["class", "other classes"],
                            mod2: ["class", { "additional-mod": "other classes" }]
                        }
                    )} />
                `,
                expected: `
                    <div className={"multiple classes mod1tclass mod1tother mod1tclasses mod2tclass mod2tadditional-modtother mod2tadditional-modtclasses"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer({ separator: "t" })(contents)).toBe(expected)
        })

        it.each([
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            mod1: ["class", "other classes"],
                            mod2: ["class", { "additional-mod:": "other classes" }],
                            "mod3-": "multiple classes",
                            "mod4:": ["class", { "additional_mod:": "other classes" }]
                        }
                    )} />
                `,
                expected: `
                    <div className={"multiple classes mod1class mod1other mod1classes mod2class mod2additional-mod:other mod2additional-mod:classes mod3-multiple mod3-classes mod4:class mod4:additional_mod:other mod4:additional_mod:classes"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer({ separator: false })(contents)).toBe(expected)
        })
    })

    describe("Misleading key:", () => {
        it.each([
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            "": "other class",
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes :other :class"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            "": false
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            "": "other class",
                            "": false
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes :other :class"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer()(contents)).toBe(expected)
        })
    })

    describe("Misleading convention:", () => {
        it.each([
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            "var1": 🚀,
                        },
                        {
                            var2: 0
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={twg(
                        "multiple classes",
                        {
                            "var1": 🚀,
                        },
                        {
                            var2: 0
                        },
                        className
                    )} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            "var1": "🚀",
                        },
                        {
                            var2: 0
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:🚀"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            "var1": "🚀 class",
                        },
                        {
                            var2: 0
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:🚀 var1:class"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer()(contents)).toBe(expected)
        })
    })

    describe("Native object:", () => {
        it.each([
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: [
                                "class",
                                {
                                    var2: isAndOr1 && "class"
                                }
                            ]
                        },
                        {
                            var3: 0
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:class var1:var2:class"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            "var1": true,
                        },
                        {
                            var2: 0
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: true
                        },
                        {
                            var2: 0,
                            var3: 1
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1 var3"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: true,
                            var2: "multiple classes",
                            var3: 1,
                            var4: true
                        },
                        {
                            var6: "class",
                            var5: 0
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1 var2:multiple var2:classes var3 var4 var6:class"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: [
                                "class",
                                {
                                    var2: isAndOr
                                }
                            ]
                        },
                        {
                            var3: 0
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:class var1:var2"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: [
                                "class",
                                {
                                    var2: isAndOr(),
                                    var3: 1,
                                    var4: false
                                }
                            ]
                        },
                        {
                            var5: 0
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:class var1:var2 var1:var3"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: [
                                "class",
                                {
                                    var2: isAndOr(),
                                    var3: 10000,
                                    var4: [
                                        "multiple classes",
                                        {
                                            var5: false
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            var6: 0.1,
                            var7: 0.00001
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:class var1:var2 var1:var3:10000 var1:var4:multiple var1:var4:classes var6:0.1 var7:0.00001"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: 0,
                            var2: 1,
                            var3: 0.01,
                            var4: 1.01,
                            var5: -0.01,
                            var6: -1.01,
                            var7: -0,
                            var8: -1
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var2 var3:0.01 var4:1.01 var5:-0.01 var6:-1.01 var8:-1"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer()(contents)).toBe(expected)
        })
    })

    describe("Multiple outer objects:", () => {
        it.each([
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: "class"
                        },
                        {
                            var2: "multiple classes"
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:class var2:multiple var2:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: "class"
                        },
                        "other multiple classes",
                        {
                            var2: "multiple classes"
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:class other multiple classes var2:multiple var2:classes"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer()(contents)).toBe(expected)
        })
    })

    describe("Misleading object inside not related object:", () => {
        it.each([
            {
                contents: `
                    const [toastButtons, setToastButtons] = useState<ToastButtonProps[]>([
                        {
                            idx: "1",
                            message: "Successful Toast",
                            type: toast.success,
                            styles: twg(
                                "col-start-1", {
                                before: [
                                    "bg-mega-secondary opacity-10 transition-opacity",
                                    {
                                        dark: "bg-mega-success",
                                        hover: "opacity-20 duration-0"
                                    }
                                ]
                            }),
                            icon: <FaCircleCheck size={28} className="size-7 dark:fill-mega-success" />
                        }
                    ])
                `,
                expected: `
                    const [toastButtons, setToastButtons] = useState<ToastButtonProps[]>([
                        {
                            idx: "1",
                            message: "Successful Toast",
                            type: toast.success,
                            styles: "col-start-1 before:bg-mega-secondary before:opacity-10 before:transition-opacity before:dark:bg-mega-success before:hover:opacity-20 before:hover:duration-0",
                            icon: <FaCircleCheck size={28} className="size-7 dark:fill-mega-success" />
                        }
                    ])
                `
            },
            {
                contents: `
                    const [toastButtons, setToastButtons] = useState<ToastButtonProps[]>([
                        {
                            idx: "1",
                            message: "Successful Toast",
                            type: toast.success,
                            styles: {
                                before: "abc",
                                after: twg(
                                    "col-start-1", {
                                    before: [
                                        "bg-mega-secondary opacity-10 transition-opacity",
                                        {
                                            dark: "bg-mega-success",
                                            hover: "opacity-20 duration-0"
                                        }
                                    ]
                                })
                            },
                            icon: <FaCircleCheck size={28} className="size-7 dark:fill-mega-success" />
                        }
                    ])
                `,
                expected: `
                    const [toastButtons, setToastButtons] = useState<ToastButtonProps[]>([
                        {
                            idx: "1",
                            message: "Successful Toast",
                            type: toast.success,
                            styles: {
                                before: "abc",
                                after: "col-start-1 before:bg-mega-secondary before:opacity-10 before:transition-opacity before:dark:bg-mega-success before:hover:opacity-20 before:hover:duration-0"
                            },
                            icon: <FaCircleCheck size={28} className="size-7 dark:fill-mega-success" />
                        }
                    ])
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer()(contents)).toBe(expected)
        })
    })

    describe("Misleading object:", () => {
        it.each([
            {
                contents:
                    "<div className={twg(badgeVariants({ variant }), className)} />",
                expected: `<div className={"variant"} />`
            },
            {
                contents: `<div className={twg(badgeVariants({ variant: "primary" }), className)} />`,
                expected: `<div className={"variant:primary"} />`
                // ignores Tailwind to scan variant:primary class, anyways it's not exist
            },
            {
                // const style = "primary"
                contents:
                    "<div className={twg(badgeVariants({ variant: style }), className)} />",
                expected: `<div className={"variant"} />`
            },
            {
                // const style = "primary"
                contents: `
                    <div className={twg(
                        "multiple classes",
                        badgeVariants({ variant: style }),
                        {
                            var: "multiple classes"
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes variant var:multiple var:classes"} />
                `
            },
            {
                contents: `<div className={twg("multiple classes", badgeVariants({ variant }), className)} />`,
                expected: `<div className={"multiple classes variant"} />`
            },
            {
                contents: `<div className={twg("multiple classes", badgeVariants({ variant }), "other class", className)} />`,
                expected: `<div className={"multiple classes variant other class"} />`
            },
            {
                contents: `<div className={twg("multiple classes", badgeVariants({ variant: "primary" }), className)} />`,
                expected: `<div className={"multiple classes variant:primary"} />`
            },
            {
                contents: `<div className={twg("multiple classes", badgeVariants({ variant: "primary" }), "other class", className)} />`,
                expected: `<div className={"multiple classes variant:primary other class"} />`
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: "class"
                        },
                        badgeVariants({ variant }),
                        {
                            var2: "multiple classes"
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:class variant var2:multiple var2:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: [
                                "class",
                                {
                                    var2: [
                                        "multiple classes",
                                        badgeVariants({ variant })
                                    ]
                                }
                            ]
                        },
                        {
                            var3: "multiple classes"
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:class var1:var2:multiple var1:var2:classes var1:var2:variant var3:multiple var3:classes"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer()(contents)).toBe(expected)
        })
    })

    //*
    describe("Misleading template literal:", () => {
        it.each([
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var: [
                                "multiple classes",
                                \`other \${(!directly && borderWidth) ? "class" : ""}\`
                            ]
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var:multiple var:classes var:other var:class"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var: [
                                "multiple classes",
                                \`other \${(!directly && borderWidth) ? "class" : "multiple classes"}\`
                            ]
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var:multiple var:classes var:other var:class var:multiple var:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var: [
                                "multiple classes",
                                \`other \${
                                    (
                                        !directly
                                        && borderWidth
                                    ) ? "class" : "multiple classes"
                                }\`
                            ]
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var:multiple var:classes var:other var:class var:multiple var:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var: [
                                "multiple classes",
                                \`other \${
                                    (
                                        !directly
                                        && borderWidth
                                    )
                                        ? "class"
                                        : "multiple classes"
                                }\`
                            ]
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var:multiple var:classes var:other var:class var:multiple var:classes"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer()(contents)).toBe(expected)
        })
    })

    describe("Multiple lines classes:", () => {
        it.each([
            {
                //*
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: \`multiple
                            classes\`,
                            var2: [
                            "multiple classes", {
                                var3: \`other
                                class\`
                            }]
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes var2:multiple var2:classes var2:var3:other var2:var3:class"} />
                `
            },
            {
                //*
                contents: `
                    <div className={twg(
                        \`multiple
                        classes\`,
                        {
                            var1: \`multiple
                            classes\`,
                            var2: [
                                "multiple classes", {
                                    var3: \`other
                                    class\`
                                }
                            ]
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes var2:multiple var2:classes var2:var3:other var2:var3:class"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer()(contents)).toBe(expected)
        })
    })

    describe("Conditional classes:", () => {
        it.each([
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: conditional1 && "multiple classes"
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: conditional1 && "multiple classes"
                        },
                        {
                            var2: 0
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: conditional1 && "multiple classes",
                            var2: (conditional2) && "multiple classes",
                            var3: (conditional3) && ("multiple classes")
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes var2:multiple var2:classes var3:multiple var3:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: conditional1 ? "multiple classes" : "other multiple classes",
                            var2: conditional2 === true ? "multiple classes" : "other multiple classes"
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes var1:other var1:multiple var1:classes var2:multiple var2:classes var2:other var2:multiple var2:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: conditional1 ? "multiple classes" : \`other multiple classes\`,
                            var2: conditional2 === true ? \`multiple classes\` : "other multiple classes"
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes var1:other var1:multiple var1:classes var2:multiple var2:classes var2:other var2:multiple var2:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: (conditional1) ? ("multiple classes") : "other multiple classes",
                            var2: (conditional2 === false) ? "multiple classes" : ("other multiple classes"),
                            var3: (conditional3 === true) ? ("multiple classes") : ("other multiple classes")
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes var1:other var1:multiple var1:classes var2:multiple var2:classes var2:other var2:multiple var2:classes var3:multiple var3:classes var3:other var3:multiple var3:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: (conditional1) ? ("multiple classes") : "other multiple classes",
                            var2: (conditional2 === "true") ? "multiple classes" : ("other multiple classes"),
                            var3: (conditional3 === "false") ? ("multiple classes") : ("other multiple classes")
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes var1:other var1:multiple var1:classes var2:multiple var2:classes var2:other var2:multiple var2:classes var3:multiple var3:classes var3:other var3:multiple var3:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: (conditional1) ? " multiple classes  " : "other    multiple  classes",
                            var2: conditional2 === "true" ? ("multiple    classes") : (("other multiple classes   "))
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes var1:other var1:multiple var1:classes var2:multiple var2:classes var2:other var2:multiple var2:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: (conditional1) ? \` multiple classes  \` : "   other    multiple  classes",
                            var2: conditional2 === "true" ? ("multiple    classes   ") : ((\` other multiple classes   \`))
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes var1:other var1:multiple var1:classes var2:multiple var2:classes var2:other var2:multiple var2:classes"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer()(contents)).toBe(expected)
        })
    })

    describe("Conditional classes with arrays:", () => {
        it.each([
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: conditional1 ? "multiple classes" : [
                                "other multiple classes",
                                {
                                    var2: "multiple classes"
                                }
                            ],
                            var3: (conditional2) && "multiple classes",
                            var4: (conditional3) && ("multiple classes")
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes var1:other var1:multiple var1:classes var1:var2:multiple var1:var2:classes var3:multiple var3:classes var4:multiple var4:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: conditional1 ? \`multiple classes\` : [
                                \`other multiple classes\`,
                                {
                                    var2: "multiple classes"
                                }
                            ],
                            var3: (conditional2) && "multiple classes",
                            var4: (conditional3) && (\`multiple classes\`)
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes var1:other var1:multiple var1:classes var1:var2:multiple var1:var2:classes var3:multiple var3:classes var4:multiple var4:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "size-92 relative grid place-items-center px-4 py-2",
                        {
                            before: isTernary === "foo" ? [
                                "absolute inset-0 bg-red-500",
                                {
                                    hover: isTernary ? "bg-blue-500 text-yellow-500" : [
                                        "bg-blue-500 text-yellow-500",
                                        isAndOr && "border-2 border-white"
                                    ]
                                }
                            ] : [
                                "fixed inset-0 bg-yellow-500",
                            ],
                            "aria-expanded": "bg-red-500 text-yellow-500",
                        }
                    )} />
                `,
                expected: `
                    <div className={"size-92 relative grid place-items-center px-4 py-2 before:absolute before:inset-0 before:bg-red-500 before:hover:bg-blue-500 before:hover:text-yellow-500 before:hover:bg-blue-500 before:hover:text-yellow-500 before:hover:border-2 before:hover:border-white before:fixed before:inset-0 before:bg-yellow-500 aria-expanded:bg-red-500 aria-expanded:text-yellow-500"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "size-92 relative grid place-items-center px-4 py-2",
                        {
                            before: isTernary === "foo" ? [
                                "absolute inset-0 bg-red-500",
                                {
                                    hover: isTernary ? "bg-blue-500 text-yellow-500" : [
                                        \`bg-blue-500 text-yellow-500\`,
                                        isAndOr && "border-2 border-white"
                                    ]
                                }
                            ] : [
                                \`fixed inset-0 bg-yellow-500\`,
                            ],
                            "aria-expanded": \`bg-red-500 text-yellow-500\`,
                        }
                    )} />
                `,
                expected: `
                    <div className={"size-92 relative grid place-items-center px-4 py-2 before:absolute before:inset-0 before:bg-red-500 before:hover:bg-blue-500 before:hover:text-yellow-500 before:hover:bg-blue-500 before:hover:text-yellow-500 before:hover:border-2 before:hover:border-white before:fixed before:inset-0 before:bg-yellow-500 aria-expanded:bg-red-500 aria-expanded:text-yellow-500"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: conditional1 ? \`other multiple classes \${(!directly && borderWidth) ? "class" : ""}\` : utilClass1,
                            var2: conditional2 === true ? "multiple classes" : "avc",
                            var3: conditional3 === "foo" ? \`lorem ipsum \${(!directly && borderWidth) ? "" : "class"}\` : \`other multiple class \${(!directly && borderWidth) ? "other" : "class"}\`,
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:other var1:multiple var1:classes var1:class var2:multiple var2:classes var2:avc var3:lorem var3:ipsum var3:class var3:other var3:multiple var3:class var3:other var3:class"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer()(contents)).toBe(expected)
        })
    })

    describe("Key as classes and value as conditionals:", () => {
        it.each([
            {
                contents: "<div className={twg({ class: isAndOr1 })} />",
                expected: `<div className={"class"} />`
            },
            {
                contents: `<div className={twg({ "class": isAndOr1 })} />`,
                expected: `<div className={"class"} />`
            },
            {
                contents: `<div className={twg({ "class": isAndOr1() })} />`,
                expected: `<div className={"class"} />`
            },
            {
                contents: `<div className={twg({ "class": isAndOr1.truthy })} />`,
                expected: `<div className={"class"} />`
            },
            {
                contents: `<div className={twg({ "class": isAndOr1["false"] })} />`,
                expected: `<div className={"class"} />`
            },
            {
                contents:
                    "<div className={twg({ class: isAndOr1() && isAndOr2 })} />",
                expected: `<div className={"class"} />`
            },
            {
                contents: `<div className={twg({ "multiple classes": isAndOr1() && isAndOr2 })} />`,
                expected: `<div className={"multiple classes"} />`
            },
            {
                contents: `<div className={twg({ "multiple classes": isAndOr1 || isAndOr2() })} />`,
                expected: `<div className={"multiple classes"} />`
            },
            {
                contents: `<div className={twg({ "multiple classes": false })} />`,
                expected: `<div className={""} />`
            },
            {
                contents: `<div className={twg({ "class": false && true })} />`,
                expected: `<div className={"class"} />` //*
            },
            {
                contents: `<div className={twg({ "class": undefined })} />`,
                expected: `<div className={"class"} />`
            },
            {
                contents: `
                    <div className={twg(
                        { class: isAndOr1() && isAndOr2 },
                        { "multiple classes": isAndOr1() && isAndOr2 },
                        { "other class": isAndOr3 || isAndOr4() }
                    )} />
                `,
                expected: `
                    <div className={"class multiple classes other class"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer()(contents)).toBe(expected)
        })
    })

    describe("Multiple conditional classes:", () => {
        it.each([
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: condition1 && !condition2 ? "multiple classes" : "other multiple classes",
                            var2: !((condition2 || condition3) && !condition4) ? "multiple classes" : "other multiple classes",
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes var1:other var1:multiple var1:classes var2:multiple var2:classes var2:other var2:multiple var2:classes"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer()(contents)).toBe(expected)
        })
    })

    describe("And-or conditional objects:", () => {
        it.each([
            {
                // --- And-or condition of outer objects
                contents: `
                    <div className={twg(
                        "multiple classes",
                        isAndOr && {
                            var: [
                                "multiple classes",
                                isAndOr && "another class",
                            ]
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var:multiple var:classes var:another var:class"} />
                `
            },
            {
                // --- And-or condition of multiple outer objects
                contents: `
                    <div className={twg(
                        "multiple classes",
                        isAndOr1 || {
                            var1: [
                                "multiple classes",
                                isAndOr && "another class",
                            ]
                        },
                        isAndOr2 ?? {
                            var2: [
                                "multiple classes",
                                isAndOr && "another class",
                            ]
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes var1:another var1:class var2:multiple var2:classes var2:another var2:class"} />
                `
            },
            {
                // --- And-or condition object inside outer objects
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: [
                                "multiple classes",
                                isAndOr && {
                                    var2: [
                                        "multiple classes",
                                        isAndOr && "another class",
                                    ]
                                }
                            ],
                            "var-3": "multiple classes"
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes var1:var2:multiple var1:var2:classes var1:var2:another var1:var2:class var-3:multiple var-3:classes"} />
                `
            },
            {
                // --- And-or condition object inside outer objects
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: [
                                "multiple classes",
                                isAndOr ? {
                                    var2: [
                                        "multiple classes",
                                        isAndOr && "another class",
                                    ]
                                } : "other class",
                            ],
                            "var-3": "multiple classes"
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes var1:var2:multiple var1:var2:classes var1:var2:another var1:var2:class var1:other var1:class var-3:multiple var-3:classes"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer()(contents)).toBe(expected)
        })
    })

    describe("Ternary conditional objects:", () => {
        it.each([
            {
                // --- Ternary condition of outer objects
                contents: `
                    <div className={twg(
                        "multiple classes",
                        isTernary === "anything" ? {
                            var2: "multiple classes"
                        } : {
                            var2: [
                                "multiple classes",
                                isAndOr && "another class",
                            ]
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var2:multiple var2:classes var2:multiple var2:classes var2:another var2:class"} />
                `
            },
            {
                // --- Ternary condition of multiple outer objects
                contents: `
                    <div className={twg(
                        "multiple classes",
                        isTernary === "anything" ? {
                            var2: "multiple classes"
                        } : {
                            var2: [
                                "multiple classes",
                                isAndOr && "another class",
                            ]
                        },
                        isTernary2 === "else" ? {
                            var3: "multiple classes"
                        } : {
                            var3: [
                                "multiple classes",
                                isAndOr2 && "another class",
                            ]
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var2:multiple var2:classes var2:multiple var2:classes var2:another var2:class var3:multiple var3:classes var3:multiple var3:classes var3:another var3:class"} />
                `
            },
            {
                // --- Ternary condition object inside outer objects
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: [
                                "multiple classes",
                                isTernary === "anything" ? {
                                    var2: "multiple classes"
                                } : {
                                    var2: [
                                        "multiple classes",
                                        isAndOr && "another class",
                                    ]
                                }
                            ],
                            "var-3": "multiple classes"
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes var1:var2:multiple var1:var2:classes var1:var2:multiple var1:var2:classes var1:var2:another var1:var2:class var-3:multiple var-3:classes"} />
                `
            },
            {
                // --- Ternary condition object inside other ternary condition object inside outer objects
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: [
                                "multiple classes",
                                isTernary === "anything" ? {
                                    var2: "multiple classes"
                                } : {
                                    var2: [
                                        "multiple classes",
                                        isAndOr && "another class",
                                        isTernary === "anything" ? {
                                            var3: "multiple classes"
                                        } : {
                                            var3: ["multiple classes"]
                                        }
                                    ]
                                }
                            ],
                            "var-4": "multiple classes"
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes var1:var2:multiple var1:var2:classes var1:var2:multiple var1:var2:classes var1:var2:another var1:var2:class var1:var2:var3:multiple var1:var2:var3:classes var1:var2:var3:multiple var1:var2:var3:classes var-4:multiple var-4:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: [
                                "multiple classes",
                                isTernary === "anything" ? {
                                    var2: "multiple classes"
                                } : {
                                    var2: [
                                        "multiple classes",
                                        isAndOr && "another class",
                                        isTernary === "anything" ? {
                                            var3: [
                                                "class",
                                                isTernary === "anything" ? {
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
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes var1:var2:multiple var1:var2:classes var1:var2:multiple var1:var2:classes var1:var2:another var1:var2:class var1:var2:var3:class var1:var2:var3:var4:multiple var1:var2:var3:var4:classes var1:var2:var3:var4:multiple var1:var2:var3:var4:classes var1:var2:var3:multiple var1:var2:var3:classes var-5:multiple var-5:classes"} />
                `
            },
            {
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: [
                                "multiple classes",
                                isTernary1 === "anything1" ? {
                                    var2: "multiple classes"
                                } : {
                                    var2: [
                                        "multiple classes",
                                        isAndOr && "another class",
                                        isTernary2 === "anything2" ? {
                                            var3: [
                                                "class",
                                                isTernary3 === "anything3" ? {
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
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:classes var1:var2:multiple var1:var2:classes var1:var2:multiple var1:var2:classes var1:var2:another var1:var2:class var1:var2:var3:class var1:var2:var3:var4:multiple var1:var2:var3:var4:classes var1:var2:var3:var4:multiple var1:var2:var3:var4:classes var1:var2:var3:multiple var1:var2:var3:classes var-5:multiple var-5:classes"} />
                `
            },
            {
                // Both sides are ternary complex
                contents: `
                    <div className={twg(
                        "multiple classes",
                        {
                            var1: conditional1 ? u2() ? "multiple" : u3 ? "hello" : u4 ? u5 ? "you" : u6 ? "it's" : "my" : "world" : 'class',
                            var2: u2() ? "multiple" : u3 ? "hello" : "alo",
                            var3: "multiple classes"
                        },
                        className
                    )} />
                `,
                expected: `
                    <div className={"multiple classes var1:multiple var1:hello var1:you var1:it's var1:my var1:world var1:class var2:multiple var2:hello var2:alo var3:multiple var3:classes"} />
                `
            }
        ])('"$expected"', ({ contents, expected }) => {
            expect(transformer()(contents)).toBe(expected)
        })
    })
})
