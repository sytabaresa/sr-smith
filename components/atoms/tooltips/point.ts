import { TooltipType } from "./interfaces";
import { createMachine, state, state as final, transition, reduce } from "robot3";
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