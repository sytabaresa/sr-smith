import { TooltipType } from "./interfaces";
import { createMachine, state, state as final, transition, reduce } from "robot3";
import { getCodefromObject, selectOrDrawPoint } from "./common";
import { CircleCenterRadiusIcon } from "../../../common/components/atoms/icons";
import { normalizeName } from "../utils/board";

class CircleRadiusTooltip implements TooltipType {
    name = 'circleRadius'
    jsxName = 'circle'
    tooltip = 'Circle (center, radio)'
    description = 'Select center point, then enter radius'
    icon = CircleCenterRadiusIcon
    paramsStr = (ob: any) => `${normalizeName(ob.center.name)},${ob.radius}`

    drawCircle(ctx, event) {
        const { board, value } = event
        let code = ctx.code ?? ""

        const element = board.create(this.jsxName, [ctx.objectSelected[0], value])

        code += getCodefromObject(this.paramsStr, element)

        return { ...ctx, code }
    }

    machine = createMachine({
        idle: state(
            transition('DOWN', 'drawCircle', reduce(selectOrDrawPoint)),
        ),
        drawCircle: state(
            transition('RADIUS', 'end', reduce(this.drawCircle.bind(this))),
            transition('CANCEL', 'idle')
        ),
        error: final(),
        end: final(),
    }, (parentContext: any) => ({
        board: parentContext.board,
        objectSelected: [],
        smithMode: parentContext.smithMode,
    }))
}

export default CircleRadiusTooltip