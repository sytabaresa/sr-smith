import { TooltipType } from "./interfaces";
import { createMachine, guard, immediate, state, state as final, transition, reduce } from "robot3";
import { getCodefromObject, selectOrDrawPoint } from "./common";
import { normalizeName } from "../utils/board";

class TwoPointsTooltip {
    jsxName = ''
    description = 'Select two points'
    paramsStr = (ob) => `${normalizeName(ob.board.select(ob.parents[0]).name)}, ${normalizeName(ob.board.select(ob.parents[1]).name)}`

    drawObject = (ctx, event) => {
        const { board, value } = event
        const { objectSelected } = ctx
        let code = ctx.code ?? ""

        const element = board.create(this.jsxName, [objectSelected[0], objectSelected[1]])
        code += getCodefromObject(this.paramsStr, element)

        return { ...ctx, code }
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
            transition('CLICK', 'secondPoint', reduce(selectOrDrawPoint)),
        ),
        secondPoint: state(
            transition('CLICK', 'checkLastPoint', reduce(selectOrDrawPoint),
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
        smithMode: parentContext.smithMode,
    }))
}

export default TwoPointsTooltip


