import { ReCircle } from "jsxgraph";
import { ReCircleIcon } from "../custom-icons";
import { normalizeName } from "./common";
import { TooltipType } from "./interfaces";
import PointTooltip from "./point";

class ReCircleTooltip extends PointTooltip implements TooltipType {
    name = 'recircle'
    jsxName = 'recircle'
    tooltip = 'Real Circle (Point)'
    icon = ReCircleIcon
    isDrawObject = true
    paramsStr = (ob: ReCircle) => `${normalizeName(ob.originPoint?.name)}`
}

export default ReCircleTooltip