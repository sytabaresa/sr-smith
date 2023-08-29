import JXG from "jsxgraph"

export const getMouseCoords = (e, i, board) => {
    var cPos = board.getCoordsTopLeftCorner(e, i),
        absPos = JXG.getPosition(e, i),
        dx = absPos[0] - cPos[0],
        dy = absPos[1] - cPos[1];

    return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board)
}

export function getIndexFinger(ctx, event) {
    let index
    if (event.value[JXG.touchProperty]) {
        // index of the finger that is used to extract the coordinates
        index = 0;
    }
    return index
}

export function removeElement(board, event) {
    // const index = getIndexFinger(ctx, event)
    const coords = getMouseCoords(event, 0, board);
    for (let el in board.objects) {
        const object = board.objects[el]
        if (object.hasPoint(coords.scrCoords[1], coords.scrCoords[2]) && !object.visProp.inmutable) {
            board.removeObject(object)
        }
    }
}

export function normalizeName(name) {
    return name.replace('}', '').replace('{', '').replace('&', '').replace(';', '')
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