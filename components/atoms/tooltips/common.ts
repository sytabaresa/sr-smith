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
    let objectSelected = ctx.objectSelected || []


    const index = getIndexFinger(ctx, event)
    const coords = getMouseCoords(event.value, index, board);


    for (let el in board.objects) {
        if (JXG.isPoint(board.objects[el]) &&
            board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
            objectSelected.push(el)
            break
        }
    }

    if (!objectSelected[0]) {
        let point = board.create('point', [coords.usrCoords[1], coords.usrCoords[2]]);
        objectSelected.push(point)
        //select point
    }

    return { ...ctx, objectSelected }
}