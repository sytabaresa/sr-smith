import JXG from "jsxgraph/distrib/jsxgraphsrc"
import { getMouseCoords } from "../../utils/board";

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
    let objectSelected = ctx.objectSelected || []

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
            options.slideObject = inCurve[0]
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
            } else {
                board.removeObject(point1)
                point = board.create('intersection', [...objects, 1], options)
            }
        }
    }

    if (!point) {
        point = board.create('point', [coords.usrCoords[1], coords.usrCoords[2]], options);
    }

    objectSelected.push(point)
    return { ...ctx, objectSelected }
}