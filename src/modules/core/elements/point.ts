import { Point } from "jsxgraph"
import JXG from "jsxgraph"
import { zRePart, zImPart, abs } from "@core/utils/transforms";

JXG.createPointOld = JXG.createPoint
JXG.createPoint = function (board, parents: any[], attributes): Point {
    if (!JXG.exists(attributes))
        attributes = {};
    const attr = JXG.copyAttributes(attributes, board.options, 'point');
    // console.log(parents)
    if (parents.length == 1 && JXG.isObject(parents[0]) && parents[0].isComplex) {

        const c: JXG.Complex = parents[0]

        const p: any = board.create('point', [c.real, c.imaginary], attr)
        return p as Point
    } else if (parents.length == 1 && JXG.isNumber(parents[0])) {
        const re = parents[0]
        const p: any = board.create('point', [re, 0], attr)
        return p as Point
    } else {
        const p: any = JXG.createPointOld(board, parents, attr)

        p.SX = () => zRePart(p.X(), p.Y())
        p.SY = () => zImPart(p.X(), p.Y())
        p.Z = () => new JXG.Complex(p.SX(), p.SY())
        p.coef = () => new JXG.Complex(p.X(), p.Y())
        p.nCoef = () => abs(p.X(), p.Y())
        p.SWR = () => (1 + p.nCoef()) / (1 - p.nCoef())

        p.methodMap['SX'] = 'SX'
        p.methodMap['SY'] = 'SY'
        p.methodMap['Z'] = 'Z'
        p.methodMap['coef'] = 'coef'
        p.methodMap['nCoef'] = 'nCoef'
        p.methodMap['SWR'] = 'SWR'

        // console.log(sp)
        return p as Point
    }
};

JXG.registerElement('point', JXG.createPoint);

// JXG.Options.point = {
//     strokeColor: 'blue',
//     fillColor: 'blue',
// }