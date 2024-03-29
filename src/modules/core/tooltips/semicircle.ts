import { SemicircleIcon } from "@components/atoms/icons";
import { TooltipType } from "./interfaces";
import TwoPointsTooltip from "./twoPoints";

class SemicircleTooltip extends TwoPointsTooltip implements TooltipType {
    name = 'semicircle'
    jsxName = 'semicircle'
    tooltip = 'semicircle'
    icon = SemicircleIcon
}

export default SemicircleTooltip