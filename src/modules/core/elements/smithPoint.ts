import { SmithPoint } from "jsxgraph"
import JXG from "jsxgraph"
import { reflecImPart, reflecRePart } from "@core/utils/transforms";

JXG.OBJECT_TYPE_SMITH_POINT = 99
JXG.createSmithPoint = function (board, parents: any[], attributes) {
    if (!JXG.exists(attributes))
        attributes = {};
    const attr = JXG.copyAttributes(attributes, board.options, 'spoint');

    if (JXG.isNumber(parents[0]) && JXG.isNumber(parents[1])) {
        var a = parents[0]
        var b = parents[1]

        const re = reflecRePart(a, b)
        const im = reflecImPart(a, b)
        var sp: any = board.create('point', [re, im], attr)

        sp.type = JXG.OBJECT_TYPE_SMITH_POINT
        sp.elType = 'spoint'
        return sp as SmithPoint
    } else if (parents.length == 1 && JXG.isObject(parents[0]) && parents[0].isComplex) {
        var c: JXG.Complex = parents[0]

        const re = reflecRePart(c.real, c.imaginary)
        const im = reflecImPart(c.real, c.imaginary)
        var sp: any = board.create('point', [re, im], attr)

        sp.type = JXG.OBJECT_TYPE_SMITH_POINT
        sp.elType = 'spoint'
        return sp as SmithPoint
    } else if (parents.length == 1 && JXG.isNumber(parents[0])) {
        const re = parents[0]
        var sp: any = board.create('spoint', [re, 0], attr as Record<string, any>)
        return sp as SmithPoint
    } else {
        throw ("Can't create smith point with parent types '" + (typeof parents[0]) + " and " + (typeof parents[1]));
    }
};

JXG.registerElement('spoint', JXG.createSmithPoint);

JXG.Options.spoint = {
    strokeColor: 'blue',
    fillColor: 'blue',
}