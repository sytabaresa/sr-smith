import JXG, { Board, Circle, GeometryElementAttributes, Point } from "jsxgraph"

JXG.createReCircle = function (board, parents, attributes) {
    const origAtt = { fixed: true, visible: false }
    if (JXG.isNumber(parents[0])) {
        var r = parents[0]

        if (!JXG.exists(attributes))
            attributes = {};

        var orig = board.create('point', [r / (r + 1), 0], origAtt)
        var c1 = board.create('circle', [orig, 1 / (r + 1)], attributes);

        return c1
    } else if (JXG.isPoint(parents[0])) {
        const p = parents[0] as Point

        if (!JXG.exists(attributes))
            attributes = {};

        var orig = board.create('point', [function () {
            const a = p.X()
            const b = p.Y()
            const r = (1 - a * a - b * b) / ((1 - a) * (1 - a) + b * b)
            return r / (r + 1)
        }, 0], origAtt)
        var c1 = board.create('circle', [orig, function () {
            const a = p.X()
            const b = p.Y()
            const r = (1 - a * a - b * b) / ((1 - a) * (1 - a) + b * b)
            return 1 / (r + 1)
        }], attributes);

        return c1
    } else {
        throw ("Can't create real circle with parent types '" + (typeof parents[0]));
    }
};

JXG.registerElement('recircle', JXG.createReCircle);

