import { ReCircle } from "jsxgraph";
import { ReCircleIcon } from "../../../common/components/atoms/icons";
import { normalizeName } from "../utils/board";
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