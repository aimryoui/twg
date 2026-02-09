import { createTwg } from "src/index"

describe("createTwg()", () => {
    describe("Custom separator:", () => {
        it.each([
            {
                args: ["multiple classes", { var: "class" }],
                expected: "multiple classes var-class"
            },
            {
                /* cSpell:disable */
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
                    "Lorem ipsum dolor sit amet consectetur adipiscing elit Sed sit amet ligula ex Ut var1-in var1-suscipit var1-metus var2-vel var2-accumsan var2-orci var2-Vivamus var2-sapien var2-neque var2-dictum var2-vel var2-felis var2-maximus var3-luctus var3-var4-lorem var5-Fusce var5-malesuada var5-massa var5-eu var5-turpis var5-finibus var5-var6-mollis var5-var6-var7-In var5-var6-var7-augue var5-var6-var7-tortor var5-var6-var7-var8-porta var5-var6-var7-var8-eu var5-var6-var7-var8-erat var5-var6-var7-var8-sit var5-var6-var7-var8-amet var5-var6-var7-var8-tristique var5-var6-var7-var8-ullamcorper var5-var6-var7-var8-arcu"

                /* cSpell:enable */
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(createTwg({ separator: "-" })(...args)).toBe(expected)
        })

        it("Multiple objects:", () => {
            expect(
                createTwg({ separator: "-" })(
                    "multiple classes",
                    {
                        var1: "class",
                        var2: "multiple classes"
                    },
                    {
                        separator: "-"
                    }
                )
            ).toBe(
                "multiple classes var1-class var2-multiple var2-classes separator--"
            )
        })

        it.each([
            {
                args: [
                    "multiple classes",
                    {
                        var1: "class",
                        var2: "multiple classes"
                    }
                ],
                expected: "multiple classes var1class var2multiple var2classes"
            },
            {
                args: [
                    "multiple classes",
                    {
                        var1: "class",
                        var2: "multiple classes"
                    },
                    {
                        var3: "other classes"
                    }
                ],
                expected:
                    "multiple classes var1class var2multiple var2classes var3other var3classes"
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(createTwg({ separator: "" })(...args)).toBe(expected)
        })

        it.each([
            {
                args: [
                    "multiple classes",
                    {
                        var1: "class",
                        var2: "multiple classes"
                    }
                ],
                expected:
                    "multiple classes var1:class var2:multiple var2:classes"
            },
            {
                args: [
                    "multiple classes",
                    {
                        var1: "class",
                        var2: "multiple classes"
                    },
                    {
                        var3: "other classes"
                    }
                ],
                expected:
                    "multiple classes var1:class var2:multiple var2:classes var3:other var3:classes"
            }
        ])('"$expected"', ({ args, expected }) => {
            expect(createTwg()(...args)).toBe(expected)
        })
    })
})
