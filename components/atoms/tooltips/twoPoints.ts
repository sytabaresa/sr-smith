import { TooltipType } from "./interfaces";
import { createMachine, guard, immediate, state, state as final, transition, action, reduce } from "../../fsm/machine";
import { selectOrDrawPoint } from "./common";

class TwoPointsTooltip implements TooltipType {
    name = ''
    description = 'Select two points or positions'
    jsxName = ''

    drawObject = (ctx, event) => {
        const { board, value } = event
        const { objectSelected } = ctx

        board.create(this.jsxName, [objectSelected[0], objectSelected[1]])

        return ctx
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

export default TwoPointsTooltip