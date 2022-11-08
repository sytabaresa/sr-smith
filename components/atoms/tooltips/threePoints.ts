import { TooltipType } from "./interfaces";
import { createMachine, guard, immediate, state, state as final, transition, reduce } from "robot3";
import { getCodefromObject, selectOrDrawPoint } from "./common";

class TwoPointsTooltip implements TooltipType {
    name = ''
    description = 'Select two points or positions'
    jsxName = ''

    drawObject = (ctx, event) => {
        const { board, value } = event
        const { objectSelected } = ctx
        let code = ctx.code ?? ""

        const element = board.create(this.jsxName, [objectSelected[0], objectSelected[1], objectSelected[2]])
        code += getCodefromObject(element)

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
    }))
}

export default TwoPointsTooltip


