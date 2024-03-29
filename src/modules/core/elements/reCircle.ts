import { Point, ReCircle } from "jsxgraph"
import JXG from "jsxgraph"
import { zRePart } from "@core/utils/transforms";

JXG.OBJECT_TYPE_REAL_CIRCLE = 98

JXG.createReCircle = function (board, parents, attributes) {
    const origAtt = { fixed: true, visible: false }
    if (JXG.isNumber(parents[0]) && parents[0] > 0) {
        var r = parents[0]

        if (!JXG.exists(attributes))
            attributes = {};
        const attr = JXG.copyAttributes(attributes, board.options, 'recircle');

        var orig = board.create('point', [r / (r + 1), 0], origAtt)
        var c1: any = board.create('circle', [orig, 1 / (r + 1)], attr);

        c1.sradius = r
        c1.type = JXG.OBJECT_TYPE_REAL_CIRCLE
        c1.elType = 'recircle'

        return c1 as ReCircle
    } else if (JXG.isPoint(parents[0])) {
        const p = parents[0] as Point

        if (!JXG.exists(attributes))
            attributes = {};
        const attr = JXG.copyAttributes(attributes, board.options, 'recircle');

        var orig = board.create('point', [function () {
            const a = p.X()
            const b = p.Y()
            const r = zRePart(a, b)
            return r / (r + 1)
        }, 0], origAtt)
        var c1: any = board.create('circle', [orig, function () {
            const a = p.X()
            const b = p.Y()
            const r = zRePart(a, b)
            return Math.abs(1 / (r + 1))
        }], attr);

        c1.sradius = function () {
            const a = p.X()
            const b = p.Y()
            return zRePart(a, b)
        }
        c1.originPoint = p
        c1.type = JXG.OBJECT_TYPE_REAL_CIRCLE
        c1.elType = 'recircle'

        return c1 as ReCircle
    } else {
        throw ("Can't create real circle with parent types '" + (typeof parents[0]));
    }
};

JXG.registerElement('recircle', JXG.createReCircle);

JXG.Options.recircle = {
}