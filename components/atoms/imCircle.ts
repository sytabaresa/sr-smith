import JXG, { Board, Circle, GeometryElementAttributes, Point } from "jsxgraph"
import { zImPart } from "./smith-utils";

JXG.createImCircle = function (board, parents, attributes) {
    const origAtt = { fixed: true, visible: false }
    if (JXG.isNumber(parents[0])) {
        var r = parents[0]

        if (!JXG.exists(attributes))
            attributes = {};

        var orig = board.create('point', [1, 1 / r], origAtt)
        var c1 = board.create('circle', [orig, 1 / r], attributes);

        return c1
    } else if (JXG.isPoint(parents[0])) {
        const p = parents[0] as Point

        if (!JXG.exists(attributes))
            attributes = {};

        const f = function () {
            const a = p.X()
            const b = p.Y()
            const r = zImPart(a, b)
            return 1 / r
        }
        var orig = board.create('point', [1, f], origAtt)
        var c1 = board.create('circle', [orig, f], attributes);

        return c1
    } else {
        throw ("Can't create imaginary circle with parent types '" + (typeof parents[0]));
    }
};

JXG.registerElement('imcircle', JXG.createImCircle);

