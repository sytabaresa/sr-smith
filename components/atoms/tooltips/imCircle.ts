import { ImCircle } from "jsxgraph";
import { ImCircleIcon } from "../custom-icons";
import { normalizeName } from "./common";
import { TooltipType } from "./interfaces";
import PointTooltip from "./point";

class ImCircleTooltip extends PointTooltip implements TooltipType {
    name = 'imcircle'
    jsxName = 'imcircle'
    tooltip = 'Circunferencia Imaginaria (punto)'
    description = ''
    icon = ImCircleIcon
    isDrawObject = true
    paramsStr = (ob: ImCircle) => `${normalizeName(ob.originPoint?.name)}`
}

export default ImCircleTooltip