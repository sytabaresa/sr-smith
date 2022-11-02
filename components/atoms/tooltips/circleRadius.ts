import { TooltipType } from "./interfaces";
import { createMachine, state, state as final, transition, reduce } from "robot3";
import { getCodefromObject, selectOrDrawPoint } from "./common";

class CircleRadiusTooltip implements TooltipType {
    name = 'circleRadius'
    description = 'Select center point, then enter radius'
    jsxName = 'circle'

    selectOrDrawPoint1 = selectOrDrawPoint

    drawCircle(ctx, event) {
        const { board, value } = event
        let code = ctx.code ?? ""

        const element = board.create(this.jsxName, [ctx.objectSelected[0], value])

        code += getCodefromObject(element)

        return { ...ctx, code }
    }

    machine = createMachine({
        idle: state(
            transition('DOWN', 'drawCircle', reduce(this.selectOrDrawPoint1.bind(this))),
        ),
        drawCircle: state(
            transition('RADIUS', 'end', reduce(this.drawCircle.bind(this))),
            transition('CANCEL', 'idle')
        ),
        error: final(),
        end: final(),
    }, (parentContext: any) => ({
        board: parentContext.board,
    }))
}

export default CircleRadiusTooltip