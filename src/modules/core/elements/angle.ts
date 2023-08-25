import { Angle } from "jsxgraph"
import JXG from "jsxgraph"

JXG.createAngleOld = JXG.createAngle
JXG.createAngle = function (board, parents: any[], attributes): Angle {
    if (!JXG.exists(attributes))
        attributes = {};
    const attr = JXG.copyAttributes(attributes, board.options, 'angle');
    // console.log(parents)
    if (parents.length == 3 && JXG.isNumber(parents[2])) {
        const { name, ...rest } = attr
        const p1 = parents[0]
        const p2 = parents[1]
        const an = parents[2]

        const auxp = board.create('point', [0, 0], { ...(name && { name }) })
        const angle: Angle = board.create(Math.abs(an) > Math.PI ? 'reflexangle' : 'nonreflexangle', [p1, p2, auxp], rest)
        angle.setAngle(an)
        auxp.setAttribute({ fixed: true, })
        return auxp

    } else {
        const angle: Angle = JXG.createAngleOld(board, parents, attr)

        // console.log(sp)
        return angle
    }
};

JXG.registerElement('angle', JXG.createAngle);

// JXG.Options.angle = {
//     strokeColor: 'blue',
//     fillColor: 'blue',
// }