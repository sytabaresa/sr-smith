import { CircleCenterPointIcon } from "../custom-icons";
import { TooltipType } from "./interfaces";
import TwoPointsTooltip from "./twoPoints";

class CircleTooltip extends TwoPointsTooltip implements TooltipType {
    name = 'circle'
    jsxName = 'circle'
    tooltip = 'Circunferencia (centro, punto)'
    description = ''
    icon = CircleCenterPointIcon
}

export default CircleTooltip