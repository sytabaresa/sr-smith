import { ImCircleIcon } from "../custom-icons";
import { TooltipType } from "./interfaces";
import PointTooltip from "./point";

class ImCircleTooltip extends PointTooltip implements TooltipType {
    name = 'imcircle'
    jsxName = 'imcircle'
    tooltip = 'Circunferencia Imaginaria (punto)'
    description = ''
    icon = ImCircleIcon
    isDrawObject = true
}

export default ImCircleTooltip