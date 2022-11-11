import { SemicircleIcon } from "../custom-icons";
import { TooltipType } from "./interfaces";
import TwoPointsTooltip from "./twoPoints";

class SemicircleTooltip extends TwoPointsTooltip implements TooltipType {
    name = 'semicircle'
    jsxName = 'semicircle'
    tooltip = 'Semicircle'
    icon = SemicircleIcon
}

export default SemicircleTooltip