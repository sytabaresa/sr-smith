

export function reflecRePart(a: number, b: number): number {
    return (a * a + b * b - 1) / ((1 + a) * (1 + a) + b * b)
}

export function reflecImPart(a: number, b: number): number {
    return (2 * b) / ((1 + a) * (1 + a) + b * b)
}

export function zRePart(a: number, b: number): number {
    return (1 - a * a - b * b) / ((1 - a) * (1 - a) + b * b)
}

export function zRePartAd(a: number, b: number): number {
    return (1 - a * a - b * b) / ((1 + a) * (1 + a) + b * b)
}


export function zImPart(a: number, b: number): number {
    return (2 * b) / ((1 - a) * (1 - a) + b * b)
}

export function zImPartAd(a: number, b: number): number {
    return (2 * b) / ((1 + a) * (1 + a) + b * b)
}

export function angle(x: number, y: number = null) {
    if (y)
        return Math.atan2(y, x) * 180 / Math.PI
    else
        return Math.atan(x) * 180 / Math.PI
}

export function lambda(x: number, y: number) {
    return Math.atan2(y, x)
}

export function abs(x: number, y: number) {
    return Math.sqrt(x * x + y * y)
} 