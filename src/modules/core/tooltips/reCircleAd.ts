import { ReCircle } from "jsxgraph";
import { ReCircleIcon, ReCircleIconAd } from "@components/atoms/icons";
import { normalizeName } from "@core/utils/board";
import { TooltipType } from "./interfaces";
import PointTooltip from "./point";

class ReCircleAdTooltip extends PointTooltip implements TooltipType {
    name = 'recirclead'
    jsxName = 'recirclead'
    tooltip = 'Real Circle Admitance (Point)'
    icon = ReCircleIconAd
    isDrawObject = true
    paramsStr = (ob: ReCircle) => `${normalizeName(ob.originPoint?.name)}`
}

export default ReCircleAdTooltip