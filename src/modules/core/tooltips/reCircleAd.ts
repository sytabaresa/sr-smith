import { ReCircle } from "jsxgraph";
import { ReCircleIconAd } from "@components/atoms/icons";
import { normalizeName } from "@core/utils/board";
import { TooltipType } from "./interfaces";
import PointTooltip from "./point";

class ReCircleAdTooltip extends PointTooltip implements TooltipType {
    name = 'recirclead'
    jsxName = 'recirclead'
    tooltip = 'recirclead'
    icon = ReCircleIconAd
    isDrawObject = true
    paramsStr = (ob: ReCircle) => `${normalizeName(ob.originPoint?.name)}`
}

export default ReCircleAdTooltip