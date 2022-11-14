import JXG, { Board, Circle, GeometryElementAttributes, Point, SmithPoint } from "jsxgraph"
import { reflecImPart, reflecRePart, zImPart, zRePart } from "../utils/transforms";

JXG.OBJECT_TYPE_SMITH_POINT = 99
JXG.createSmithPoint = function (board, parents, attributes) {
    if (JXG.isNumber(parents[0]) && JXG.isNumber(parents[1])) {
        var a = parents[0]
        var b = parents[1]

        if (!JXG.exists(attributes))
            attributes = {};
        const attr = JXG.copyAttributes(attributes, board.options, 'spoint');

        const re = reflecRePart(a, b)
        const im = reflecImPart(a, b)
        var sp: any = board.create('point', [re, im], attr)

        sp.type = JXG.OBJECT_TYPE_SMITH_POINT
        sp.elType = 'spoint'
        sp.SX = () => zRePart(sp.X(), sp.Y())
        sp.SY = () => zImPart(sp.X(), sp.Y())
        return sp as SmithPoint
    } else {
        throw ("Can't create smith point with parent types '" + (typeof parents[0]) + " and " + (typeof parents[1]));
    }
};

JXG.registerElement('spoint', JXG.createSmithPoint);
JXG.registerElement('cpoint', JXG.createPoint);

JXG.Options.spoint = {
    strokeColor: 'blue',
    fillColor: 'blue',
}