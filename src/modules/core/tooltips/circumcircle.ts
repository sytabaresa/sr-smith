import { CircumcircleIcon } from "@components/atoms/icons";
import { TooltipType } from "./interfaces";
import ThreePointsTooltip from "./threePoints";

class CircumcircleTooltip extends ThreePointsTooltip implements TooltipType {
    name = 'circumcircle'
    jsxName = 'circumcircle'
    tooltip = 'Circunferencia por 3 puntos'
    icon = CircumcircleIcon
}

export default CircumcircleTooltip