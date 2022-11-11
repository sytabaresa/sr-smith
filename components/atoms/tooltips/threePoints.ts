import { createMachine, guard, immediate, state, state as final, transition, reduce } from "robot3";
import { getCodefromObject, normalizeName, selectOrDrawPoint } from "./common";

class TwoPointsTooltip {
    jsxName = ''
    description = "Select three points"
    paramsStr = (ob) => `${normalizeName(ob.board.select(ob.parents[0]).name)},${normalizeName(ob.board.select(ob.parents[1]).name)},${normalizeName(ob.board.select(ob.parents[2]).name)}`

    drawObject = (ctx, event) => {
        const { board, value } = event
        const { objectSelected } = ctx
        let code = ctx.code ?? ""

        const element = board.create(this.jsxName, [objectSelected[0], objectSelected[1], objectSelected[2]])
        code += getCodefromObject(this.paramsStr, element)

        return { ...ctx, code }
    }

    differentPoints1 = (ctx, ev) => {
        return ctx.objectSelected.at(-1) != ctx.objectSelected.at(-2)
    }

    differentPoints2 = (ctx, ev) => {
        return ctx.objectSelected.at(-1) != ctx.objectSelected.at(-2) != ctx.objectSelected.at(-3)
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
            transition('DOWN', 'thirdPoint', reduce(selectOrDrawPoint),),
        ),
        checkSecondPoint: state(
            immediate('thirdPoint', guard(this.differentPoints1)),
            immediate('secondPoint', reduce(this.removeLastObject))
        ),
        thirdPoint: state(
            transition('DOWN', 'checkThirdPoint', reduce(selectOrDrawPoint)),
        ),
        checkThirdPoint: state(
            immediate('drawObject', guard(this.differentPoints2)),
            immediate('thirdPoint', reduce(this.removeLastObject))
        ),
        drawObject: state(
            immediate('end', reduce(this.drawObject.bind(this)))
        ),
        error: final(),
        end: final(),
    }, (parentContext: any) => ({
        board: parentContext.board,
        objectSelected: [],
        smithMode: parentContext.smithMode,
    }))
}

export default TwoPointsTooltip


