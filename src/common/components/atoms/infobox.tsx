import { abs, angle, zImPart, zRePart } from "../../../modules/core/utils/transforms";

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

    return <div className="flex">
        <div className="flex flex-col mr-1">
            <div>Γ:</div>
            <div>smith:</div>
            <div>∠:</div>
            <div>|Γ|</div>
        </div>
        <div className="flex flex-col items-end">
            <div>{`(${formatN(x as number)},${formatN(y as number)})`}</div>
            <div>{`(${formatN(sx)},${formatN(sy)})`}</div>
            <div>{`${formatN(ang)}˚`}</div>
            <div>{`${formatN(abss)}`}</div>
        </div>
    </div>
}