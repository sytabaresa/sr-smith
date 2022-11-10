import { Circumcircle } from "jsxgraph";
import { CircumcircleIcon } from "../custom-icons";
import { normalizeName } from "./common";
import { TooltipType } from "./interfaces";
import ThreePointsTooltip from "./threePoints";

class CircumcircleTooltip extends ThreePointsTooltip implements TooltipType {
    name = 'circumcircle'
    jsxName = 'circumcircle'
    tooltip = 'Circunferencia por 3 puntos'
    description = ''
    icon = CircumcircleIcon
}

export default CircumcircleTooltip