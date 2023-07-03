import { ImCircle, Point } from "jsxgraph"
import JXG from "jsxgraph"
import { zImPartAd } from "@core/utils/transforms";

JXG.OBJECT_TYPE_IMAG_CIRCLE_AD = 95

JXG.createImCircleAd = function (board, parents, attributes) {
    const origAtt = { fixed: true, visible: false }
    if (JXG.isNumber(parents[0])) {
        var r = parents[0]

        if (!JXG.exists(attributes))
            attributes = {};
        const attr = JXG.copyAttributes(attributes, board.options, 'imcircle');


        var orig = board.create('point', [1, 1 / r], origAtt)
        var c1: any = board.create('circle', [orig, 1 / r], attr);

        c1.sradius = r
        c1.type = JXG.OBJECT_TYPE_IMAG_CIRCLE_AD
        c1.elType = 'imcircle'

        return c1 as ImCircle
    } else if (JXG.isPoint(parents[0])) {
        const p = parents[0] as Point

        if (!JXG.exists(attributes))
            attributes = {};
        const attr = JXG.copyAttributes(attributes, board.options, 'imcirclead');


        const f = function () {
            const a = p.X()
            const b = p.Y()
            const r = zImPartAd(a, b)
            return 1 / r
        }
        var orig = board.create('point', [-1, f], origAtt)
        var c1: any = board.create('circle', [orig, () => Math.abs(f())], attr);

        c1.sradius = function () {
            const a = p.X()
            const b = p.Y()
            return zImPartAd(a, b)
        }
        c1.originPoint = p
        c1.type = JXG.OBJECT_TYPE_IMAG_CIRCLE_AD
        c1.elType = 'imcirclead'

        return c1 as ImCircle
    } else {
        throw ("Can't create imaginary circle with parent types '" + (typeof parents[0]));
    }
};

JXG.registerElement('imcirclead', JXG.createImCircleAd);

JXG.Options.imcirclead = {
}