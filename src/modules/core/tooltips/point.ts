import { TooltipType } from "./interfaces";
import { createMachine, state, state as final, transition, reduce, immediate, guard } from "robot3";
import { getCodefromObject, selectOrDrawPoint } from "./common";
import { PointIcon } from "@components/atoms/icons";

class PointTooltip implements TooltipType {
    jsxName = ''
    objectSelected: any[]
    name = 'point'
    description = 'Select position, line, curve, or other point'
    tooltip = 'Point'
    icon = PointIcon
    isDrawObject = false
    paramsStr = (ob) => `${ob.X().toFixed(3)}, ${ob.X().toFixed(3)}`

    drawObject = (ctx, event) => {
        const { board, value } = event
        const { objectSelected } = ctx
        let code = ctx.code ?? ""

        const element = board.create(this.jsxName, [objectSelected[0]])
        code += getCodefromObject(this.paramsStr, element)

        return { ...ctx, code }
    }

    checkDrawObject = (ctx, event) => {
        return this.isDrawObject
    }

    machine = createMachine({
        idle: state(
            transition('CLICK', 'drawObject', reduce(selectOrDrawPoint)),
        ),
        drawObject: state(
            immediate('end', guard(this.checkDrawObject), reduce(this.drawObject.bind(this))),
            immediate('end'),
        ),
        error: final(),
        end: final(),
    }, (parentContext: any) => ({
        board: parentContext.board,
        objectSelected: [],
        smithMode: parentContext.smithMode,
    }))
}

export default PointTooltip