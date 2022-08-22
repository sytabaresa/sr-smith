import { MachineCtx, TooltipType } from "./interfaces";
import JXG from "jsxgraph/distrib/jsxgraphsrc"
import { getMouseCoords } from "../../utils/board";
import { createMachine, guard, immediate, state, state as final, transition, action } from "robot3";

class PointTooltip implements TooltipType {
    objectSelected: any[]
    name = 'point'

    validatePoint(ctx: MachineCtx, event) {
        const { board } = event
        let index
        let canCreate = true
        if (event.value[JXG.touchProperty]) {
            // index of the finger that is used to extract the coordinates
            index = 0;
        }

        const coords = getMouseCoords(event.value, index, board);

        //TODO: validate more types of elements
        for (let el in board.objects) {
            if (JXG.isPoint(board.objects[el]) &&
                board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
                canCreate = false;
                break;
            }
        }

        return canCreate
    }

    drawPoint(ctx: MachineCtx, event) {
        const { board } = event
        let index
        if (event.value[JXG.touchProperty]) {
            // index of the finger that is used to extract the coordinates
            index = 0;
        }

        const coords = getMouseCoords(event.value, index, board);

        board.create('point', [coords.usrCoords[1], coords.usrCoords[2]]);
    }

    machine = createMachine({
        idle: state(
            immediate('drawPoint', guard(this.validatePoint)),
            immediate('error')
        ),
        drawPoint: state(
            immediate('end', action(this.drawPoint)),
        ),
        error: final(),
        end: final(),
    })
}

export default PointTooltip