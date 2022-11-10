import { SemicircleIcon } from "../custom-icons";
import { TooltipType } from "./interfaces";
import TwoPointsTooltip from "./twoPoints";

class SemicircleTooltip extends TwoPointsTooltip implements TooltipType {
    name = 'semicircle'
    jsxName = 'semicircle'
    tooltip = 'Circunferencia por dos puntos (semicírculo)'
    description = ''
    icon = SemicircleIcon
}

export default SemicircleTooltip