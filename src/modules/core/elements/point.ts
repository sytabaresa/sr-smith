import { Point } from "jsxgraph"
import JXG from "jsxgraph"
import { reflecImPart, reflecRePart } from "@core/utils/transforms";

JXG.createPointOld = JXG.createPoint
JXG.createPoint = function (board, parents: any[], attributes): Point {
    const attr = JXG.copyAttributes(attributes, board.options, 'point');
    // console.log(parents)
    if (parents.length == 1 && JXG.isObject(parents[0]) && parents[0].isComplex) {
        if (!JXG.exists(attributes))
            attributes = {};

        var c: JXG.Complex = parents[0]

        var sp: any = board.create('point', [c.real, c.imaginary], attr)
        sp.cX = () => reflecRePart(sp.X(), sp.Y())
        sp.cY = () => reflecImPart(sp.X(), sp.Y())
        return sp as Point

    } else if (parents.length == 1 && JXG.isNumber(parents[0])) {
        const re = parents[0]
        var sp: any = board.create('point', [re, 0], attr)
        return sp as Point
    } else {
        return JXG.createPointOld(board, parents, attr)
    }
};

JXG.registerElement('point', JXG.createPoint);

// JXG.Options.point = {
//     strokeColor: 'blue',
//     fillColor: 'blue',
// }