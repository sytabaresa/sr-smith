
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
        .reduce((r, v, _i, _a, k = typeof iteratee == 'string' ? v[iteratee]: iteratee(v)) => ((r[k] || (r[k] = [])).push(v), r), {} as Record<K, T[]>)
}
