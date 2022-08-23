import { MachineCtx, TooltipType } from "./interfaces";
import JXG from "jsxgraph/distrib/jsxgraphsrc"
import { getMouseCoords } from "../../utils/board";
import { createMachine, guard, immediate, state, state as final, transition, action } from "../../fsm/machine";
import { selectOrDrawPoint } from "./common";

class PointTooltip implements TooltipType {
    objectSelected: any[]
    name = 'point'
    description = 'select position or line, curve, or other element'

    selectOrDrawPoint = selectOrDrawPoint

    machine = createMachine({
        idle: state(
            transition('DOWN', 'end', guard(this.selectOrDrawPoint)),
        ),
        error: final(),
        end: final(),
    })
}

export default PointTooltip