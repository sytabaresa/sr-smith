import { MachineCtx, TooltipType } from "./interfaces";
import JXG from "jsxgraph/distrib/jsxgraphsrc"
import { getMouseCoords } from "../../utils/board";
import { createMachine, guard, immediate, state, state as final, transition, action, reduce } from "robot3";
import { selectOrDrawPoint } from "./common";

class PointTooltip implements TooltipType {
    objectSelected: any[]
    name = 'point'
    description = 'select position or line, curve, or other element'

    machine = createMachine({
        idle: state(
            transition('DOWN', 'end', reduce(selectOrDrawPoint)),
        ),
        error: final(),
        end: final(),
    })
}

export default PointTooltip