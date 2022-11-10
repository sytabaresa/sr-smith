import JXG, { Point } from "jsxgraph"
import { getMouseCoords } from "../../utils/board";
import { zImPart, zRePart } from "../smith-utils";

export function getIndexFinger(ctx, event) {
    let index
    if (event.value[JXG.touchProperty]) {
        // index of the finger that is used to extract the coordinates
        index = 0;
    }
    return index
}

export function selectOrDrawPoint(ctx: any, event) {
    const { board } = event
    let point
    let options: any = {}
    let inCurve = []
    let objectSelected = ctx.objectSelected ?? []
    let code = ctx.code ?? ""
    const smithMode = ctx.smithMode

    const index = getIndexFinger(ctx, event)
    const coords = getMouseCoords(event.value, index, board);

    const invalidElements = ['image', 'ticks', 'grid', 'text']
    for (let el in board.objects) {
        const object = board.objects[el]
        if (invalidElements.includes(object.elType)) {
            continue
        }
        if (object.hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
            if (JXG.isPoint(object)) {
                point = object
                break
            } else {
                inCurve.push(object)
            }
        }
    }

    // caution: this can be extracted to a new state in plugin machine if complexity increases
    // in that case: separate select and draw logic with states, guards and reducers
    if (point) {
        objectSelected.push(point)
        return { ...ctx, objectSelected }
    }

    // interception and slider in elements
    const validElements = ['curve', 'line', 'segment', 'circle']
    if (inCurve.length == 1) {
        // slider
        if (validElements.includes(inCurve[0].elType)) {
            options = {
                ...options,
                slideObject: inCurve[0],
                fillColor: 'gray',
                strokeColor: 'gray',
            }
        }
    } else if (inCurve.length >= 2) {
        // intersect
        options = {
            ...options,
            fillColor: 'gray',
            strokeColor: 'gray',
            fixed: true,
        }
        const objects = inCurve.slice(0, 2)
        if (validElements.includes(objects[0].elType) && validElements.includes(objects[1].elType)) {
            let point1 = board.create('intersection', [...objects, 0], options)
            if (point1.hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
                point = point1
                code += getCodefromObject(getParamsStrPoint, point, options)
            } else {
                board.removeObject(point1)
                point = board.create('intersection', [...objects, 1], options)
                code += getCodefromObject(getParamsStrPoint, point, options)
            }
        }
    }

    if (!point) {
        if (smithMode) {
            point = board.create('spoint', [
                zRePart(coords.usrCoords[1], coords.usrCoords[2]),
                zImPart(coords.usrCoords[1], coords.usrCoords[2])
            ], options);
        } else {
            point = board.create('point', [coords.usrCoords[1], coords.usrCoords[2]], options);
        }
        code += getCodefromObject(getParamsStrPoint, point, options)
    }

    objectSelected.push(point)
    return { ...ctx, objectSelected, code }
}

function getParamsStrPoint(ob) {
    let outStr = ''
    switch (ob.type) {
        case JXG.OBJECT_TYPE_POINT:
            outStr += `${ob.X().toFixed(3)}, ${ob.Y().toFixed(3)}`
            break
        case JXG.OBJECT_TYPE_INTERSECTION:
            outStr += `${normalizeName(ob.board.select(ob.parents[0]).name)}, ${normalizeName(ob.board.select(ob.parents[1]).name)}, ${ob.intersectionNumbers[0]}`
            break
        case JXG.OBJECT_TYPE_GLIDER:
            outStr += `${ob.coords.usrCoords[1].toFixed(3)}, ${ob.coords.usrCoords[2].toFixed(3)}, ${normalizeName(ob.board.select(ob.parents[0]).name)}`
            break
        case JXG.OBJECT_TYPE_SMITH_POINT:
            outStr += `${ob.SX().toFixed(3)}, ${ob.SY().toFixed(3)}`
            break
        default:
            break
    }
    return outStr
}

export function getCodefromObject(paramsStr, ob, options = null): string {
    // console.log(ob.name, ob, options)

    let outStr = `${ob.name != '' ? `${normalizeName(ob.name)} = ` : ''}${ob.elType}(`

    outStr += paramsStr(ob)
    const opStr = (options && Object.keys(options).length != 0) ? ' ' + stringifyJC(options) : ''
    outStr += `)${opStr};\n`
    return outStr
}

export function normalizeName(name) {
    return name.replace('}', '').replace('{', '')
}

export function stringifyJC(ob) {
    if (!ob) return null
    // console.log(ob, typeof (ob))
    let str = ''
    switch (typeof (ob)) {
        case 'object':
            // if(Object.keys(ob).length == 0) break
            str += '<<'
            str += Object.keys(ob).map(k => `${k}:${stringifyJC(ob[k])}`).join(',')
            str += '>>'
            break
        default:
            str += JSON.stringify(ob)
            break
    }
    return str
}