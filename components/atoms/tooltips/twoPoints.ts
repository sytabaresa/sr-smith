import { TooltipType } from "./interfaces";
import { createMachine, guard, immediate, state, state as final, transition, action, reduce } from "robot3";
import { normalizeName, selectOrDrawPoint, stringifyJC } from "./common";
import JXG from "jsxgraph/distrib/jsxgraphsrc"

class TwoPointsTooltip implements TooltipType {
    name = ''
    description = 'Select two points or positions'
    jsxName = ''

    drawObject = (ctx, event) => {
        const { board, value } = event
        const { objectSelected } = ctx
        let code = ctx.code ?? ""

        const element = board.create(this.jsxName, [objectSelected[0], objectSelected[1]])
        code += getCodefromObject(element)

        return { ...ctx, code }
    }

    differentPoints = (ctx, ev) => {
        return ctx.objectSelected.at(-1) != ctx.objectSelected.at(-2)
    }

    removeLastObject = (ctx, ev) => {
        ctx.objectSelected.pop()
        return { ...ctx, objectSelected: ctx.objectSelected || [] }
    }

    machine = createMachine({
        idle: state(
            transition('DOWN', 'secondPoint', reduce(selectOrDrawPoint)),
        ),
        secondPoint: state(
            transition('DOWN', 'checkLastPoint', reduce(selectOrDrawPoint),
            ),
        ),
        checkLastPoint: state(
            immediate('drawObject', guard(this.differentPoints)),
            immediate('secondPoint', reduce(this.removeLastObject))
        ),
        drawObject: state(
            immediate('end', reduce(this.drawObject.bind(this)))
        ),
        error: final(),
        end: final(),
    }, (parentContext: any) => ({
        board: parentContext.board,
        objectSelected: [],
    }))
}

function getCodefromObject(ob, options = null): string {
    // console.log(ob.name, ob)

    let outStr = `${ob.name != '' ? `${normalizeName(ob.name)} = ` : ''}${ob.elType}(`
    switch (ob.type) {
        case JXG.OBJECT_TYPE_CIRCLE:
            outStr += `${normalizeName(ob.center.name)},${normalizeName(ob.point2?.name) ?? normalizeName(ob.circle?.name) ?? normalizeName(ob.line?.name) ?? ob.radius}`
            break
        case JXG.OBJECT_TYPE_LINE:
            outStr += `${normalizeName(ob.point1.name)}, ${normalizeName(ob.point2.name)}`
            break
    }
    const opStr = options ? ' ' + stringifyJC(options) : ''
    outStr += `)${opStr};\n`
    return outStr
}

export default TwoPointsTooltip


