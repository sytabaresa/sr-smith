import { SmithPoint } from "jsxgraph"
import JXG from "jsxgraph"

JXG.OBJECT_TYPE_COMPLEX = 90
JXG.createComplex = function (board, parents, attributes) {
    if (JXG.isNumber(parents[0]) && JXG.isNumber(parents[1])) {
        var a = parents[0]
        var b = parents[1]

        if (!JXG.exists(attributes))
            attributes = {};
        const attr = JXG.copyAttributes(attributes, board.options, 'spoint');

        var sp: any = new JXG.Complex(a, b);

        return sp as SmithPoint
    } else {
        throw ("Can't create smith point with parent types '" + (typeof parents[0]) + " and " + (typeof parents[1]));
    }
};

JXG.registerElement('complex', JXG.createComplex);

JXG.Options.complex = {
}