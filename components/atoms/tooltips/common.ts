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
    let object, point
    let options: any = {}
    let inCurve = []

    const index = getIndexFinger(ctx, event)
    const coords = getMouseCoords(event.value, index, board);


    for (let el in board.objects) {
        object = board.objects[el]
        if (object.hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
            if (JXG.isPoint(object)) {
                point = el
                break
            } else {
                inCurve.push(object)
                // break
            }
        }
    }

    if (inCurve.length == 1) {
        options.slideObject = object
    } else if (inCurve.length >= 2) {
        options = {
            ...options,
            fillColor: 'gray',
            strokeColor: 'gray'
        }
        point = board.create('intersection', [...inCurve.slice(0, 2), 0], options)
    }

    if (!point) {
        point = board.create('point', [coords.usrCoords[1], coords.usrCoords[2]], options);
    }


    let objectSelected = ctx.objectSelected || []
    objectSelected.push(point)

    return { ...ctx, objectSelected }
}