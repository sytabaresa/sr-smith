
import { TooltipType } from "./interfaces";
import { createMachine, state, state as final, transition, reduce } from "robot3";
import { getCodefromObject, selectOrDrawPoint } from "./common";
import { AngleIcon } from "@components/atoms/icons";
import { normalizeName } from "@core/utils/board";
import { Angle } from "jsxgraph";

class AngleTooltip implements TooltipType {
    name = 'angle'
    jsxName = 'angle'
    tooltip = 'angle'
    description = 'angle'
    icon = AngleIcon
    paramsStr = (ob: Angle) => {
        // console.log(ob)
        return `${normalizeName(ob.point1.name)},${normalizeName(ob.point2.name)}, ${ob.value}`
    }


    drawAngle(ctx, event) {
        const { board, value } = event
        let code = ctx.code ?? ""

        const element = board.create(this.jsxName, [ctx.objectSelected[0], ctx.objectSelected[1], typeof value == 'number' ? value : 0])

        code += getCodefromObject(this.paramsStr, { ...element.angle, value: value })

        return { ...ctx, code }
    }

    machine = createMachine({
        idle: state(
            transition('CLICK', 'secondPoint', reduce(selectOrDrawPoint)),
        ),
        secondPoint: state(
            transition('CLICK', 'drawAngle', reduce(selectOrDrawPoint)),
        ),
        drawAngle: state(
            transition('ANGLE', 'end', reduce(this.drawAngle.bind(this))),
            transition('CANCEL', 'secondPoint')
        ),
        error: final(),
        end: final(),
    }, (parentContext: any) => ({
        ...parentContext,
        objectSelected: [],
        smithMode: parentContext.smithMode,
    }))
}

export default AngleTooltip