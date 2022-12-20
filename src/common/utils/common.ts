

export function qStr(ob: Record<string, string>) {
    return '?' + Object.keys(ob).map((k) => {
        return `${k}=${ob[k]}`
    }).join(',')
}

export function qParams(location: string) {
    return new Proxy(new URLSearchParams(location), {
        get: (searchParams, prop) => searchParams.get(prop as string),
    }) as unknown as Record<string, string>;
}