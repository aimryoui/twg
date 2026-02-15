// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClassDictionary = Record<string, any>
type ClassValue =
    | string
    | number
    | boolean
    | undefined
    | null
    | ClassDictionary
    | ClassValue[]

interface TWGOptions {
    /**
     * The separator between the variant (key) and classes (values).
     *
     * @default ":"
     */
    separator?: string
}

/**
 * Main API to handle several types of class values including string, number,
 * object, array, conditionals, map key to each values inside the Object zones.
 *
 * @param options `separator`. See [docs](https://github.com/hoangnhan2ka3/twg/blob/main/docs/options.md#createtwg-options).
 * @param inputs A list of class values (strings, numbers, booleans, objects, arrays).
 *
 * @returns A function that processes class values based on the options.
 */
function createTwg(options: TWGOptions = {}) {
    const separator = options.separator ?? ":"

    function process(mix: ClassValue, prefix: string): string {
        if (!mix) return ""

        // 1. Strings / Numbers (Top-level & Array elements)
        if (typeof mix === "string" || typeof mix === "number") {
            if (!prefix) return mix + ""

            const p = prefix.endsWith(separator) ? prefix : prefix + separator
            return (mix + "").replace(/\S+/g, (val) => p + val)
        }

        // 2. Arrays / Objects
        if (typeof mix === "object") {
            let k,
                y,
                str = ""

            if (Array.isArray(mix)) {
                const len = mix.length
                for (k = 0; k < len; k++) {
                    if (mix[k]) {
                        if ((y = process(mix[k] as ClassValue, prefix))) {
                            str && (str += " ")
                            str += y
                        }
                    }
                }
            } else {
                for (k in mix) {
                    const val = (mix as Record<string, unknown>)[k]

                    if (!val) continue

                    let nextPfx: string
                    if (!prefix) {
                        nextPfx = k === "" ? separator : k
                    } else {
                        const p = prefix.endsWith(separator)
                            ? prefix
                            : prefix + separator
                        nextPfx = p + k
                    }

                    if (val === true) {
                        str && (str += " ")
                        str += nextPfx
                    } else if (typeof val === "string" || typeof val === "object") {
                        if ((y = process(val as ClassValue, nextPfx))) {
                            str && (str += " ")
                            str += y
                        }
                    } else {
                        str && (str += " ")
                        str += nextPfx
                    }
                }
            }
            return str
        }

        return ""
    }

    return function () {
        let i = 0,
            tmp: ClassValue,
            x,
            str = ""
        const len = arguments.length
        for (; i < len; i++) {
            // eslint-disable-next-line prefer-rest-params
            if ((tmp = arguments[i] as ClassValue)) {
                if ((x = process(tmp, ""))) {
                    str && (str += " ")
                    str += x
                }
            }
        }
        return str
    } as (...inputs: ClassValue[]) => string
}

/**
 * Utility function for grouping TailwindCSS variants on build time,
 * handle conditional logic, and more.
 *
 * @param inputs A list of class values (strings, numbers, booleans, objects, arrays).
 *
 * @returns The processed class string.
 */
const twg = createTwg()

export { type ClassValue, createTwg, twg, type TWGOptions }
