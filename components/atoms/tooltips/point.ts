import { TooltipType } from "./interfaces";
import { createMachine, state, state as final, transition, reduce, immediate, guard } from "robot3";
import { getCodefromObject, selectOrDrawPoint } from "./common";
import { PointIcon } from "../custom-icons";

class PointTooltip implements TooltipType {
    jsxName = ''
    objectSelected: any[]
    name = 'point'
    description = 'select position or line, curve, or other element'
    tooltip = 'Point'
    icon = PointIcon
    isDrawObject = false

    drawObject = (ctx, event) => {
        const { board, value } = event
        const { objectSelected } = ctx
        let code = ctx.code ?? ""

        const element = board.create(this.jsxName, [objectSelected[0], objectSelected[1]])
        code += getCodefromObject(element)

        return { ...ctx, code }
    }

    checkDrawObject = (ctx, event) => {
        return this.isDrawObject
    }

    machine = createMachine({
        idle: state(
            transition('DOWN', 'drawObject', reduce(selectOrDrawPoint)),
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