import { ReCircleIcon } from "../custom-icons";
import { TooltipType } from "./interfaces";
import PointTooltip from "./point";

class ReCircleTooltip extends PointTooltip implements TooltipType {
    name = 'recircle'
    jsxName = 'recircle'
    tooltip = 'Circunferencia Real (punto)'
    description = ''
    icon = ReCircleIcon
    isDrawObject = true
}

export default ReCircleTooltip