import { abs, angle, zImPart, zRePart } from "@core/utils/transforms";
import { Circle, OBJECT_TYPE_IMAG_CIRCLE_AD } from "jsxgraph";

export interface InfoboxProps {
    x: number;
    y: number;
    el?: JXG.ElementType;
}

export function Infobox(props: InfoboxProps) {
    const { x, y, el } = props

    // console.log(el)

    if (JXG.isPoint(el)) {
        const sx = zRePart(x, y)
        const sy = zImPart(x, y)
        const ang = angle(x, y)
        const abss = abs(x, y)

        const data = {
            'z': [sx, sy],
            'Γ': [x, y],
            '|Γ|': abss,
            '∠': ang,
        }

        return <Table data={data} labelsClasses="items-center" />
    } else if (JXG.isObject(el) && el.type == JXG.OBJECT_TYPE_LINE) {
        const line = el as unknown as JXG.Line
        const ang = angle((line.point2.Y() - line.point1.Y()) / (line.point2.X() - line.point1.X()))

        const data = {
            point1: line.point1,
            point2: line.point2,
            '∠': ang,
        }
        return <Table data={data} />
    } else if (JXG.isObject(el) && el.type == JXG.OBJECT_TYPE_ARC) {
        const arc = el as unknown as JXG.Arc
        const data = arc.elType == 'semicircle' ? {
            center: arc.center,
            point1: arc.anglepoint,
            point2: arc.radiuspoint,
        } : {
            center: arc.center,
            angleP: arc.anglepoint,
            radP: arc.radiuspoint,
        }
        return <Table data={data} />
    } else if (JXG.isObject(el) && [
        JXG.OBJECT_TYPE_CIRCLE,
    ].includes(el.type)) {
        const circle = el as unknown as JXG.Circle
        const data = {
            r: circle.radius,
            center: circle.center,
            ...(circle.elType == 'circumcircle' ?
                Object.fromEntries(
                    circle.parents.map((k, i) => [`point${i + 1}`, circle.ancestors[k]])
                ) :
                {
                    ...(circle.point2 && { point1: circle.point2 }),
                })
        }
        return <Table data={data} />
    } else if (JXG.isObject(el) && [
        JXG.OBJECT_TYPE_REAL_CIRCLE,
        JXG.OBJECT_TYPE_REAL_CIRCLE_AD,
    ].includes(el.type)) {
        const circle = el as unknown as JXG.ReCircle
        const data = {
            re: circle.sradius
        }
        return <Table data={data} />

    } else if (JXG.isObject(el) && [
        JXG.OBJECT_TYPE_IMAG_CIRCLE,
        JXG.OBJECT_TYPE_IMAG_CIRCLE_AD,
    ].includes(el.type)) {
        const circle = el as unknown as JXG.ImCircle
        const data = {
            im: circle.sradius
        }
        return <Table data={data} />
    } else {
        return <></>
    }
}

interface TableProps {
    data: Record<string, any>
    labelsClasses?: string
    valuesClasses?: string
}
const Table = ({
    data,
    labelsClasses = 'items-end',
    valuesClasses = 'items-end'
}: TableProps) => {

    return <div className="flex font-mono text-xs">
        <div className={`flex flex-col mr-2 ${labelsClasses}`}>
            {Object.keys(data).map(key => <div key={key}>{key}</div>)}
        </div>
        <div className={`flex flex-col ${valuesClasses}`}>
            {Object.values(data).map((values, index) => <div key={index}>{formatter(values)}</div>)}
        </div>
    </div>
}

const fmtXY = (x: number, y: number) => `(${formatN(x)},${formatN(y)})`
const fmtCoords = (el) => `(${formatN(el.X())},${formatN(el.Y())})`
const formatN = (x: number) => Number.isNaN(x) ? '∞' : typeof x == 'number' ? x.toFixed(3) : x

const formatter = (el) => {
    if (JXG.isNumber(el)) {
        return formatN(el)
    } else if (JXG.isFunction(el)) {
        return formatN(el())
    } else if (Array.isArray(el) && el.length == 2) {
        return fmtXY(el[0], el[1])
    } else if (JXG.isPoint(el)) {
        return fmtCoords(el)
    } else {
        return el?.toString()
    }
}