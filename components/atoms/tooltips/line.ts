import { MachineCtx, TooltipType } from "./interfaces";
import JXG from "jsxgraph/distrib/jsxgraphsrc"
import { getMouseCoords } from "../../utils/board";
import { createMachine, guard, immediate, state, state as final, transition, action, reduce } from "../machine";

class LineTooltip implements TooltipType {

    name = 'line'
    validatePoint(ctx: any, event) {
        const { board } = event
        let objectSelected = []
        let index: number
        let canCreate = false // can create in every situation
        if (event.value[JXG.touchProperty]) {
            // index of the finger that is used to extract the coordinates
            index = 0;
        }

        const coords = getMouseCoords(event.value, index, board);

        //TODO: validate more types of elements
        for (let el in board.objects) {
            if (JXG.isPoint(board.objects[el]) &&
                board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
                canCreate = true;
                objectSelected.push(el)
                break;
            }
        }


        return { ...ctx, objectSelected }
    }

    selectOrDrawPoint1(ctx: any, event) {
        const { board } = event
        let objectSelected = []

        let index
        if (event.value[JXG.touchProperty]) {
            // index of the finger that is used to extract the coordinates
            index = 0;
        }

        const coords = getMouseCoords(event.value, index, board);


        for (let el in board.objects) {
            if (JXG.isPoint(board.objects[el]) &&
                board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
                objectSelected.push(el)
                break
            }
        }

        if (!objectSelected[0]) {
            let point = board.create('point', [coords.usrCoords[1], coords.usrCoords[2]]);
            objectSelected.push(point)
            //select point
        }

        return { ...ctx, objectSelected }
    }

    selectOrDrawPoint2(ctx, event) {
        const { board } = event
        let index
        if (event.value[JXG.touchProperty]) {
            // index of the finger that is used to extract the coordinates
            index = 0;
        }

        const coords = getMouseCoords(event.value, index, board);

        for (let el in board.objects) {
            if (JXG.isPoint(board.objects[el]) &&
                board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
                ctx.objectSelected.push(el)
                break
            }
        }

        if (ctx.objectSelected[1]) {
            board.create('line', [ctx.objectSelected[0], ctx.objectSelected[1]])
        } else {
            let point = board.create('point', [coords.usrCoords[1], coords.usrCoords[2]]);
            board.create('line', [ctx.objectSelected[0], point])
        }
        return ctx
    }

    machine = createMachine({
        selectOrDrawPoint1: state(
            immediate('selectOrDrawPoint2', reduce(this.selectOrDrawPoint1)),
        ),
        selectOrDrawPoint2: state(
            transition('DOWN', 'end', reduce(this.selectOrDrawPoint2)),
        ),
        error: final(),
        end: final(),
    }, (parentContext: any) => ({
        board: parentContext.board,
    }))
}

export default LineTooltip