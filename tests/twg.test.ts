/* eslint-disable @typescript-eslint/prefer-includes */
/* eslint-disable @stylistic/quotes */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-constant-binary-expression */

import { twg } from "src/index"

describe("twg()", () => {
    describe("General cases:", () => {
        it.each([
            { args: [], expected: "" },
            { args: [""], expected: "" },
            { args: [{ "": "" }], expected: "" },
            { args: ["t"], expected: "t" },
            { args: [0], expected: "" },
            { args: [-0], expected: "" }, //*
            { args: [0.01], expected: "0.01" },
            { args: [-0.01], expected: "-0.01" },
            { args: [1], expected: "1" },
            { args: [-1], expected: "-1" },
            { args: [-1.01], expected: "-1.01" },
            { args: ["0"], expected: "0" },
            { args: ["1"], expected: "1" },
            { args: ["."], expected: "." },
            { args: [true, false, "", null, undefined, 0, NaN], expected: "" },
            { args: ["class"], expected: "class" },
            { args: ["Class"], expected: "Class" },
            { args: ["multiple classes"], expected: "multiple classes" },
            { args: ["Multiple classes"], expected: "Multiple classes" },
            { args: ["multiple Classes"], expected: "multiple Classes" },
            {
                args: [["multiple classes", "in", "one array"]],
                expected: "multiple classes in one array"
            },
            {
                // --- Max array depth: 3 (refer to `ClassValue` type)
                args: [[["multiple classes", "in", "one array"]]],
                expected: "multiple classes in one array"
            },
            {
                args: [["multiple classes"], ["in"], ["multiples array"]],
                expected: "multiple classes in multiples array"
            },
            {
                args: [
                    "multiple classes",
                    [true && "in", true && "array", false && "never"]
                ],
                expected: "multiple classes in array"
            },
            { args: [{ var: "" }], expected: "" },
            { args: [{ var: "" }], expected: "" },
            { args: [{ "": "" }], expected: "" },
            { args: [{ "": "class" }], expected: ":class" },
            {
                args: [{ "": "multiple classes" }],
                expected: ":multiple :classes"
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(twg(...args)).toBe(expected)
        })
    })

    // Only for testing, not for real usage because transformer() cannot handle remote classes
    describe("Remote classes:", () => {
        const remoteSingleClass = ["class"]
        const remoteMultipleClasses = ["multiple classes"]
        const remoteMultipleClassesWithVar = ["multiple classes", { var: "class" }]
        const remoteMultipleClassesWithMultipleVars = [
            "multiple classes",
            { var: "class" },
            { var: "multiple classes" }
        ]
        const remoteMultipleClassesWithObjectOnly = [{ var: "multiple classes" }]
        const remoteMultipleClassesAndVarsWithObjectOnly = [
            {
                var1: "multiple classes",
                var2: ["class", { var3: "multiple classes" }]
            }
        ]

        it.each([
            { args: remoteSingleClass, expected: "class" },
            { args: remoteMultipleClasses, expected: "multiple classes" },
            {
                args: remoteMultipleClassesWithVar,
                expected: "multiple classes var:class"
            },
            {
                args: remoteMultipleClassesWithMultipleVars,
                expected: "multiple classes var:class var:multiple var:classes"
            },
            {
                args: remoteMultipleClassesWithObjectOnly,
                expected: "var:multiple var:classes"
            },
            {
                args: remoteMultipleClassesAndVarsWithObjectOnly,
                expected:
                    "var1:multiple var1:classes var2:class var2:var3:multiple var2:var3:classes"
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(twg(...args)).toBe(expected)
        })
    })

    describe("Conditionals classes:", () => {
        const isAndOr1 = true
        const isAndOr2 = false
        const is_Ternary_1 = true
        const is_Ternary_2 = false
        const isUndefined = undefined
        const isNull = null

        const cls = "abc_)"

        it.each([
            {
                args: ["multiple classes", `bg-${isAndOr1 ? `white` : "black)"}`],
                expected: "multiple classes bg-white"
            },
            {
                args: [
                    "multiple classes",
                    /abcd_\)/.test(cls) ? "bg-white" : "bg-black"
                ],
                expected: "multiple classes bg-black"
            },
            {
                args: [
                    "multiple classes",
                    {
                        var1: [
                            "class",
                            {
                                var2: isAndOr1
                            }
                        ]
                    },
                    {
                        var3: 0
                    }
                ],
                expected: "multiple classes var1:class var1:var2"
            },
            {
                args: [
                    "multiple classes",
                    {
                        var1: [
                            "class",
                            {
                                var2: isAndOr2
                            }
                        ]
                    },
                    {
                        var3: 0
                    }
                ],
                expected: "multiple classes var1:class"
            },
            {
                args: ["multiple classes", { var: isAndOr1 && "class" }],
                expected: "multiple classes var:class"
            },
            {
                args: ["multiple classes", { var: isAndOr2 && "class" }],
                expected: "multiple classes"
            },
            {
                args: [
                    "multiple classes",
                    {
                        var1: isAndOr1 && "multiple classes",
                        var2: isAndOr2 && "class"
                    }
                ],
                expected: "multiple classes var1:multiple var1:classes"
            },
            {
                //*
                args: ["multiple classes", { var: isAndOr1 && isAndOr2 && "class" }],
                expected: "multiple classes"
            },
            {
                args: [
                    "multiple classes",
                    { var: is_Ternary_1 ? "class" : "multiple classes" }
                ],
                expected: "multiple classes var:class"
            },
            {
                args: [
                    "multiple classes",
                    { var: is_Ternary_2 ? "class" : "multiple classes" }
                ],
                expected: "multiple classes var:multiple var:classes"
            },
            {
                args: [
                    "multiple classes",
                    {
                        var:
                            is_Ternary_1 && is_Ternary_2
                                ? "class"
                                : "multiple classes"
                    }
                ],
                expected: "multiple classes var:multiple var:classes"
            },
            {
                args: [
                    "multiple classes",
                    isUndefined ?? {
                        var: ["multiple classes", isAndOr2 && "another class"]
                    }
                ],
                expected: "multiple classes var:multiple var:classes"
            },
            {
                args: [
                    "multiple classes",
                    isNull ?? {
                        var: ["multiple classes", isAndOr2 && "another class"]
                    }
                ],
                expected: "multiple classes var:multiple var:classes"
            },
            {
                args: [
                    "multiple classes",
                    is_Ternary_2 ?? {
                        var: ["multiple classes", isAndOr2 && "another class"]
                    }
                ],
                expected: "multiple classes"
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(twg(...args)).toBe(expected)
        })
    })

    describe("Conditionals classes with arrays:", () => {
        const is_Ternary_1 = true
        const is_Ternary_2 = false
        const is_Ternary_3 = "foo" as string
        it.each([
            {
                args: [
                    "multiple classes",
                    {
                        var1: is_Ternary_1
                            ? "multiple classes"
                            : [
                                  "other multiple classes",
                                  {
                                      var2: "multiple classes"
                                  }
                              ],
                        var3:
                            is_Ternary_3 === "foo"
                                ? "multiple classes"
                                : "other multiple classes",
                        var4:
                            is_Ternary_3 === "bar"
                                ? "multiple classes"
                                : "other multiple classes"
                    }
                ],
                expected:
                    "multiple classes var1:multiple var1:classes var3:multiple var3:classes var4:other var4:multiple var4:classes"
            },
            {
                args: [
                    "multiple classes",
                    {
                        var1: is_Ternary_2
                            ? "multiple classes"
                            : [
                                  "other multiple classes",
                                  {
                                      var2: "multiple classes"
                                  }
                              ],
                        var3:
                            is_Ternary_3 === "bar"
                                ? "multiple classes"
                                : "other multiple classes",
                        var4:
                            is_Ternary_3 === "foo"
                                ? "multiple classes"
                                : "other multiple classes"
                    }
                ],
                expected:
                    "multiple classes var1:other var1:multiple var1:classes var1:var2:multiple var1:var2:classes var3:other var3:multiple var3:classes var4:multiple var4:classes"
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(twg(...args)).toBe(expected)
        })
    })

    // Only for testing, not for real usage because transformer() cannot handle remote booleans
    describe("Key as classes and value as conditionals:", () => {
        const isAndOr1 = true
        const isAndOr2 = false
        const isAndOr3 = {
            truthy: true,
            falsy: false
        }
        const is_And_Or_1 = true
        const is_And_Or_2 = false
        it.each([
            { args: [{ class: isAndOr1 }], expected: "class" },
            { args: [{ class: isAndOr2 }], expected: "" },
            { args: [{ class: isAndOr3.truthy }], expected: "class" },
            { args: [{ class: isAndOr3.falsy }], expected: "" },
            /* eslint-disable @typescript-eslint/dot-notation */
            { args: [{ class: isAndOr3["truthy"] }], expected: "class" },
            { args: [{ class: isAndOr3["falsy"] }], expected: "" },
            /* eslint-enable @typescript-eslint/dot-notation */
            { args: [{ class: is_And_Or_1 }], expected: "class" },
            {
                args: [{ class: is_And_Or_1 && isAndOr1 }],
                expected: "class"
            },
            { args: [{ class: is_And_Or_1 && isAndOr2 }], expected: "" },
            { args: [{ class: is_And_Or_2 && isAndOr1 }], expected: "" },
            { args: [{ class: is_And_Or_2 && isAndOr2 }], expected: "" },
            {
                args: [{ class: isAndOr1 }, { "multiple classes": is_And_Or_2 }],
                expected: "class"
            },
            {
                args: [{ class: isAndOr1 }, { "multiple classes": true }],
                expected: "class multiple classes"
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(twg(...args)).toBe(expected)
        })
    })

    describe("Key as classes and value as number conditionals:", () => {
        it.each([
            { args: [{ class: 1 }], expected: "class" },
            { args: [{ class: 0 }], expected: "" },
            { args: [{ class: 1.01 }], expected: "class" },
            { args: [{ class: 0.01 }], expected: "class" },
            { args: [{ class: -1 }], expected: "class" },
            { args: [{ class: -0 }], expected: "" }, //*
            { args: [{ class: -1.01 }], expected: "class" },
            { args: [{ class: -0.01 }], expected: "class" }
        ])('"$expected"', ({ args, expected }) => {
            expect(twg(...args)).toBe(expected)
        })
    })

    describe("Nesting callee functions:", () => {
        it.each([
            {
                args: [
                    "multiple classes",
                    {
                        var1: [
                            "multiple classes",
                            twg("other class", {
                                var2: "in object with var"
                            })
                        ]
                    }
                ],
                expected:
                    "multiple classes var1:multiple var1:classes var1:other var1:class var1:var2:in var1:var2:object var1:var2:with var1:var2:var"
            },
            {
                args: [
                    "multiple classes",
                    {
                        var1: [
                            "multiple classes",
                            twg("other class", {
                                var2: [
                                    "in object with var",
                                    twg("other class", {
                                        var3: "in other object with var"
                                    })
                                ]
                            })
                        ]
                    }
                ],
                expected:
                    "multiple classes var1:multiple var1:classes var1:other var1:class var1:var2:in var1:var2:object var1:var2:with var1:var2:var var1:var2:other var1:var2:class var1:var2:var3:in var1:var2:var3:other var1:var2:var3:object var1:var2:var3:with var1:var2:var3:var"
            },
            {
                args: [
                    "multiple classes",
                    {
                        var1: [
                            "multiple classes",
                            twg("other class", {
                                var2: true
                            })
                        ]
                    }
                ],
                expected:
                    "multiple classes var1:multiple var1:classes var1:other var1:class var1:var2"
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(twg(...args)).toBe(expected)
        })
    })

    describe("Object only:", () => {
        it.each([
            { args: [{ var: 0 }], expected: "" },
            { args: [{ var: 1 }], expected: "var" },
            { args: [{ var: "class" }], expected: "var:class" },
            { args: [{ var: "class" }], expected: "var:class" },
            {
                //*
                args: [{ "var1 var2": "class" }],
                expected: "var1 var2:class"
            },
            {
                args: [{ var1: true }],
                expected: "var1"
            },
            {
                args: [{ "var1 var2": true }],
                expected: "var1 var2"
            },
            {
                args: [{ var: "multiple classes with var" }],
                expected: "var:multiple var:classes var:with var:var"
            },
            {
                args: [
                    {
                        var1: ["multiple classes", { var2: "in array with var" }]
                    }
                ],
                expected:
                    "var1:multiple var1:classes var1:var2:in var1:var2:array var1:var2:with var1:var2:var"
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(twg(...args)).toBe(expected)
        })
    })

    describe("Object last:", () => {
        it.each([
            {
                args: ["multiple classes", { var: "class" }],
                expected: "multiple classes var:class"
            },
            {
                args: ["multiple classes", { var: "multiple classes with var" }],
                expected:
                    "multiple classes var:multiple var:classes var:with var:var"
            },
            {
                args: [
                    "multiple classes",
                    { var: ["multiple classes", "in array with var"] }
                ],
                expected:
                    "multiple classes var:multiple var:classes var:in var:array var:with var:var"
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(twg(...args)).toBe(expected)
        })
    })

    describe("Object center:", () => {
        it.each([
            {
                args: [{ var: "class" }, "multiple classes"],
                expected: "var:class multiple classes"
            },
            {
                args: [{ var: "multiple classes with var" }, "multiple classes"],
                expected:
                    "var:multiple var:classes var:with var:var multiple classes"
            },
            {
                args: [
                    { var: ["multiple classes", "in array with var"] },
                    "multiple classes"
                ],
                expected:
                    "var:multiple var:classes var:in var:array var:with var:var multiple classes"
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(twg(...args)).toBe(expected)
        })
    })

    describe("Object first:", () => {
        it.each([
            {
                args: ["multiple classes", { var: "class" }, "class"],
                expected: "multiple classes var:class class"
            },
            {
                args: [
                    "multiple classes",
                    { var: "multiple classes with var" },
                    "and behind-object class"
                ],
                expected:
                    "multiple classes var:multiple var:classes var:with var:var and behind-object class"
            },
            {
                args: [
                    "multiple classes",
                    { var: ["multiple classes", "in array with var"] },
                    "and behind-object class"
                ],
                expected:
                    "multiple classes var:multiple var:classes var:in var:array var:with var:var and behind-object class"
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(twg(...args)).toBe(expected)
        })
    })

    describe("Object first with doubled-quoted vars:", () => {
        it.each([
            {
                args: [{ "doubled-quoted-var": "class" }, "multiple classes"],
                expected: "doubled-quoted-var:class multiple classes"
            },
            {
                args: [
                    { "doubled-quoted-var": "multiple classes with var" },
                    "multiple classes"
                ],
                expected:
                    "doubled-quoted-var:multiple doubled-quoted-var:classes doubled-quoted-var:with doubled-quoted-var:var multiple classes"
            },
            {
                args: [
                    {
                        "doubled-quoted-var": [
                            "multiple classes",
                            "in array with var"
                        ]
                    },
                    "multiple classes"
                ],
                expected:
                    "doubled-quoted-var:multiple doubled-quoted-var:classes doubled-quoted-var:in doubled-quoted-var:array doubled-quoted-var:with doubled-quoted-var:var multiple classes"
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(twg(...args)).toBe(expected)
        })
    })

    describe("Object last with doubled-quoted vars:", () => {
        it.each([
            {
                args: ["multiple classes", { "doubled-quoted-var": "class" }],
                expected: "multiple classes doubled-quoted-var:class"
            },
            {
                args: [
                    "multiple classes",
                    { "doubled-quoted-var": "multiple classes with var" }
                ],
                expected:
                    "multiple classes doubled-quoted-var:multiple doubled-quoted-var:classes doubled-quoted-var:with doubled-quoted-var:var"
            },
            {
                args: [
                    "multiple classes",
                    {
                        "doubled-quoted-var": [
                            "multiple classes",
                            "in array with var"
                        ]
                    }
                ],
                expected:
                    "multiple classes doubled-quoted-var:multiple doubled-quoted-var:classes doubled-quoted-var:in doubled-quoted-var:array doubled-quoted-var:with doubled-quoted-var:var"
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(twg(...args)).toBe(expected)
        })
    })

    describe("Object center with doubled-quoted vars:", () => {
        it.each([
            {
                args: [
                    "multiple classes",
                    { "doubled-quoted-var": "class" },
                    "class"
                ],
                expected: "multiple classes doubled-quoted-var:class class"
            },
            {
                args: [
                    "multiple classes",
                    { "doubled-quoted-var": "multiple classes with var" },
                    "and behind-object class"
                ],
                expected:
                    "multiple classes doubled-quoted-var:multiple doubled-quoted-var:classes doubled-quoted-var:with doubled-quoted-var:var and behind-object class"
            },
            {
                args: [
                    "multiple classes",
                    {
                        "doubled-quoted-var": [
                            "multiple classes",
                            "in array with var"
                        ]
                    },
                    "and behind-object class"
                ],
                expected:
                    "multiple classes doubled-quoted-var:multiple doubled-quoted-var:classes doubled-quoted-var:in doubled-quoted-var:array doubled-quoted-var:with doubled-quoted-var:var and behind-object class"
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(twg(...args)).toBe(expected)
        })
    })

    describe("Object with multiple vars and arrays inside:", () => {
        it.each([
            {
                args: [
                    "multiple vars",
                    {
                        "": "class", //*
                        var1: ["class"],
                        var2: ["class", "other classes"],
                        var3: ["class", { var4: "other classes" }]
                    }
                ],
                expected:
                    "multiple vars :class var1:class var2:class var2:other var2:classes var3:class var3:var4:other var3:var4:classes"
            },
            {
                args: [
                    "multiple vars",
                    {
                        "": "multiple classes", //*
                        var1: ["class"],
                        var2: ["class", "other classes"],
                        var3: ["class", { var4: "other classes" }]
                    }
                ],
                expected:
                    "multiple vars :multiple :classes var1:class var2:class var2:other var2:classes var3:class var3:var4:other var3:var4:classes"
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(twg(...args)).toBe(expected)
        })
    })

    describe("Multiple outer objects:", () => {
        it.each([
            {
                args: [
                    "multiple classes",
                    { var1: "class" },
                    { var2: "multiple classes" }
                ],
                expected: "multiple classes var1:class var2:multiple var2:classes"
            },
            {
                args: [
                    "multiple classes",
                    { var1: "class" },
                    "wanna join in",
                    { var2: "multiple classes" }
                ],
                expected:
                    "multiple classes var1:class wanna join in var2:multiple var2:classes"
            },
            {
                args: [
                    "multiple classes",
                    { var1: "class" },
                    { var2: "multiple classes" },
                    { var3: "class" }
                ],
                expected:
                    "multiple classes var1:class var2:multiple var2:classes var3:class"
            },
            {
                args: [
                    "multiple classes",
                    { var1: "class" },
                    "wanna join in",
                    { var2: "multiple classes" },
                    { var3: "class" }
                ],
                expected:
                    "multiple classes var1:class wanna join in var2:multiple var2:classes var3:class"
            },
            {
                args: [
                    "multiple classes",
                    { var1: "class" },
                    { var2: "multiple classes" },
                    "wanna join in",
                    { var3: "class" },
                    "yes i am in"
                ],
                expected:
                    "multiple classes var1:class var2:multiple var2:classes wanna join in var3:class yes i am in"
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(twg(...args)).toBe(expected)
        })
    })

    describe("Multiple outer objects with duplicates vars (and utils):", () => {
        it.each([
            {
                args: ["multiple classes", { var: "class" }, { var: "class" }], //*
                expected: "multiple classes var:class var:class"
            },
            {
                args: ["multiple classes", { var: "class" }, { var: "class" }], //*
                expected: "multiple classes var:class var:class"
            },
            {
                args: ["multiple classes", { var: "class-1" }, { var: "class-2" }], //*
                expected: "multiple classes var:class-1 var:class-2"
            },
            {
                args: [
                    "multiple classes",
                    { var: "class-1" },
                    { var: "class-2" },
                    { var: "class-3" }
                ], //*
                expected: "multiple classes var:class-1 var:class-2 var:class-3"
            },
            {
                args: [
                    "multiple classes",
                    { var: "class" },
                    { var: "multiple classes" }
                ],
                expected: "multiple classes var:class var:multiple var:classes"
            },
            {
                args: [
                    "multiple classes",
                    { var: "class" },
                    "wanna join in",
                    { var: "multiple classes" }
                ],
                expected:
                    "multiple classes var:class wanna join in var:multiple var:classes"
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(twg(...args)).toBe(expected)
        })
    })

    describe("Array cases:", () => {
        it.each([
            // --- Array inside array only
            {
                args: [
                    "multiple classes",
                    ["within", "one single array"],
                    ["And within a", "array inside", ["other", "array"]]
                ],
                expected:
                    "multiple classes within one single array And within a array inside other array"
            },
            // --- Multiple arrays inside each inside object
            {
                args: [
                    {
                        var1: [
                            "class",
                            "inside object and one var",
                            ["and within", "one single array"],
                            ["And within a", "array inside", ["other", "array"]]
                        ]
                    }
                ],
                expected:
                    "var1:class var1:inside var1:object var1:and var1:one var1:var var1:and var1:within var1:one var1:single var1:array var1:And var1:within var1:a var1:array var1:inside var1:other var1:array"
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(twg(...args)).toBe(expected)
        })
    })

    /**
     * @borrows https://github.com/Noriller/easy-tailwind/blob/master/src/index.spec.ts#L80C3-L120C6
     */
    describe("Complex cases:", () => {
        /* cSpell:disable */
        it.each([
            {
                args: [
                    "Lorem ipsum",
                    "dolor sit",
                    ["amet", "consectetur adipiscing elit"],
                    ["Sed sit", "amet ligula", ["ex", "Ut"]],
                    {
                        var1: "in suscipit metus",
                        var2: [
                            "vel accumsan",
                            "orci",
                            [
                                "Vivamus sapien",
                                "neque",
                                ["dictum vel", "felis maximus"]
                            ]
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
                                                    [
                                                        "tristique",
                                                        "ullamcorper",
                                                        "arcu"
                                                    ]
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                expected:
                    "Lorem ipsum dolor sit amet consectetur adipiscing elit Sed sit amet ligula ex Ut var1:in var1:suscipit var1:metus var2:vel var2:accumsan var2:orci var2:Vivamus var2:sapien var2:neque var2:dictum var2:vel var2:felis var2:maximus var3:luctus var3:var4:lorem var5:Fusce var5:malesuada var5:massa var5:eu var5:turpis var5:finibus var5:var6:mollis var5:var6:var7:In var5:var6:var7:augue var5:var6:var7:tortor var5:var6:var7:var8:porta var5:var6:var7:var8:eu var5:var6:var7:var8:erat var5:var6:var7:var8:sit var5:var6:var7:var8:amet var5:var6:var7:var8:tristique var5:var6:var7:var8:ullamcorper var5:var6:var7:var8:arcu"
            }
        ])("Handles a really complex object:", ({ args, expected }) => {
            expect(twg(...args)).toBe(expected)
        })

        /* cSpell:enable */
    })

    /**
     * @borrows https://github.com/Noriller/easy-tailwind/blob/master/src/index.spec.ts#L122C3-L127C5
     */
    describe("Falsy cases:", () => {
        const isUndefined = undefined
        const isNull = null

        it.each([
            false && "anything",
            isUndefined && "anything",
            isNull && "anything"
        ])("Handles falsy values", (falsy) => {
            expect(twg(falsy)).toBe("")
        })
    })
})
