import { MachineCtx, TooltipType } from "./interfaces";
import JXG from "jsxgraph/distrib/jsxgraphsrc"
import { getMouseCoords } from "../../utils/board";
import { createMachine, guard, immediate, state, state as final, transition, action, reduce } from "../../fsm/machine";
import { getIndexFinger, selectOrDrawPoint } from "./common";

class TwoPointsTooltip implements TooltipType {
    name = ''
    description = 'Select two points or positions'
    jsxName = ''

    selectOrDrawPoint1 = selectOrDrawPoint
    selectOrDrawPoint2 = selectOrDrawPoint

    drawObject = (ctx, event) => {
        const { board, value } = event

        const index = getIndexFinger(ctx, event)
        const coords = getMouseCoords(event.value, index, board)

        if (ctx.objectSelected[1]) {
            board.create(this.jsxName, [ctx.objectSelected[0], ctx.objectSelected[1]])
        } else {
            let point = board.create('point', [coords.usrCoords[1], coords.usrCoords[2]]);
            board.create(this.jsxName, [ctx.objectSelected[0], point])
        }
        return ctx
    }


    machine = createMachine({
        idle: state(
            transition('DOWN', 'secondPoint', reduce(this.selectOrDrawPoint1)),
        ),
        secondPoint: state(
            transition('DOWN', 'drawObject', reduce(this.selectOrDrawPoint2),
            ),
        ),
        drawObject: state(
            immediate('end', reduce(this.drawObject.bind(this)))
        ),
        error: final(),
        end: final(),
    }, (parentContext: any) => ({
        board: parentContext.board,
    }))
}

export default TwoPointsTooltip