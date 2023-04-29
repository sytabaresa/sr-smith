
export function qStr(ob: Record<string, string>) {
    return '?' + Object.keys(ob).map((k) => {
        return `${k}=${encodeURIComponent(ob[k])}`
    }).join('&')
}

export function qParams(location: string) {
    return new Proxy(new URLSearchParams(location), {
        get: (searchParams, prop) => searchParams.get(prop as string),
    }) as unknown as Record<string, any>;
}

export function groupBy<T, K extends string | number | symbol>(collection: T[], iteratee: string | ((ob: T) => K)): Record<K, T[]> {
    return collection
        .reduce((r, v, _i, _a, k = typeof iteratee == 'string' ? v[iteratee] : iteratee(v)) => ((r[k] || (r[k] = [])).push(v), r), {} as Record<K, T[]>)
}

export function mapValues(obj: Record<string, any>, fn: (any) => any) {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, fn(value)]))
}

export function mapKeys(obj: Record<string, any>, fn: (string, any) => any) {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [fn(key, value), value]))
}

/**
 * Set a value inside an object with its path: example: set({}, 'a.b.c', '...') => { a: { b: { c: '...' } } }
 * If one of the keys in path doesn't exists in object, it'll be created.
 *
 * @param object Object to manipulate
 * @param path Path to the object field that need to be created/updated
 * @param value Value to set
 */
export function set(obj, path, value) {
    // Regex explained: https://regexr.com/58j0k
    const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)

    pathArray.reduce((acc, key, i) => {
        if (acc[key] === undefined) acc[key] = {}
        if (i === pathArray.length - 1) acc[key] = value
        return acc[key]
    }, obj)
}