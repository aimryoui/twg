type ClassValue =
    | string
    | number
    | boolean
    | undefined
    | null
    | { [key: string]: ClassValue }
    | ClassValue[]

interface TWGOptions {
    /**
     * The separator between the variant (key) and classes (values).
     * @default ":"
     */
    separator?: string
}

/**
 * Main API to handle several types of class values including
 * string, number, object, array, conditionals, map key to each
 * values inside the Object zones.
 *
 * @param options Configuration options. See [docs](https://github.com/hoangnhan2ka3/twg/blob/main/docs/options.md#twg-options).
 * @param inputs A list of class values (strings, numbers, booleans, objects, arrays).
 *
 * @returns A function that processes class values based on the options.
 */
function createTwg(options: TWGOptions = {}) {
    const separator = options.separator ?? ":"

    /**
     * Process class values based on the options.
     *
     * @param mix A class value (string, number, boolean, object, array).
     * @param prefix The key that will be memorized to map to each value, and deep into nested objects.
     *
     * @returns The processed class string.
     */
    const process = (mix: ClassValue, prefix: string): string => {
        // Discard 0, -0, false, null, undefined, empty string
        if (!mix) return ""

        // String / Number
        if (typeof mix === "string" || typeof mix === "number") {
            const str = String(mix)
            if (!prefix) return str

            const p = prefix.endsWith(separator) ? prefix : prefix + separator

            return str.replace(/\S+/g, (val) => `${p}${val}`)
        }

        // Array
        if (Array.isArray(mix)) {
            let str = ""
            for (const item of mix) {
                const val = process(item, prefix)
                if (val) str += (str && " ") + val
            }
            return str
        }

        // Object
        if (typeof mix === "object") {
            let str = ""
            for (const key in mix) {
                const val = mix[key]

                // Value is true/1 -> The key itself is the class
                if (val === true || val === 1) {
                    const p = prefix
                        ? prefix.endsWith(separator)
                            ? prefix
                            : prefix + separator
                        : key === ""
                          ? separator
                          : ""

                    const part = prefix
                        ? `${p}${key}`
                        : key === ""
                          ? separator
                          : key

                    str += (str && " ") + part
                }

                // Skip falsy values
                else if (!val && val !== "") {
                    continue
                }

                // Recursive
                else {
                    let newPrefix: string
                    if (prefix) {
                        const p = prefix.endsWith(separator)
                            ? prefix
                            : prefix + separator
                        newPrefix = p + key
                    } else {
                        newPrefix = key === "" ? separator : key
                    }

                    const resolved = process(val as ClassValue, newPrefix)
                    if (resolved) str += (str && " ") + resolved
                }
            }
            return str
        }

        return ""
    }

    return (...inputs: ClassValue[]) => process(inputs, "")
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
