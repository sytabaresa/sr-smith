import { abs, angle, zImPart, zRePart } from "@core/utils/transforms";

export interface InfoboxProps {
    x: number | string;
    y: number | string;
    el?: JXG.ElementType;
}

export function Infobox(props: InfoboxProps) {
    const { x, y, el } = props
    const sx = zRePart(Number.parseFloat(x as string), Number.parseFloat(y as string))
    const sy = zImPart(Number.parseFloat(x as string), Number.parseFloat(y as string))
    const ang = angle(x as number, y as number)
    const abss = abs(x as number, y as number)

    const formatN = (x: number) => Number.isNaN(x) ? '∞' : typeof x == 'number' ? x.toFixed(3) : x

    return <div className="flex font-mono">
        <div className="flex flex-col mr-2 items-center">
            <div>z</div>
            <div>Γ</div>
            <div>|Γ|</div>
            <div>∠</div>
        </div>
        <div className="flex flex-col items-end">
            <div>{`(${formatN(sx)},${formatN(sy)})`}</div>
            <div>{`(${formatN(x as number)},${formatN(y as number)})`}</div>
            <div>{`${formatN(abss)}`}</div>
            <div>{`${formatN(ang)}˚`}</div>
        </div>
    </div>
}