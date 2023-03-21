import { TooltipType } from "./interfaces";
import { createMachine, state, state as final, transition, reduce } from "robot3";
import { getCodefromObject, selectOrDrawPoint } from "./common";
import { CircleCenterRadiusIcon } from "@components/atoms/icons";
import { normalizeName } from "@core/utils/board";

class CircleRadiusTooltip implements TooltipType {
    name = 'circle_radius'
    tooltip = 'circle_radius'
    description = 'circle_radius'
    jsxName = 'circle'
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
            transition('CLICK', 'drawCircle', reduce(selectOrDrawPoint)),
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