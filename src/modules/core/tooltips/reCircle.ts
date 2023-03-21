import { ReCircle } from "jsxgraph";
import { ReCircleIcon } from "@components/atoms/icons";
import { normalizeName } from "@core/utils/board";
import { TooltipType } from "./interfaces";
import PointTooltip from "./point";

class ReCircleTooltip extends PointTooltip implements TooltipType {
    name = 'recircle'
    jsxName = 'recircle'
    tooltip = 'recircle'
    icon = ReCircleIcon
    isDrawObject = true
    paramsStr = (ob: ReCircle) => `${normalizeName(ob.originPoint?.name)}`
}

export default ReCircleTooltip