import { ImCircle } from "jsxgraph";
import { ImCircleIconAd } from "@components/atoms/icons";
import { normalizeName } from "@core/utils/board";
import { TooltipType } from "./interfaces";
import PointTooltip from "./point";

class ImCircleAdTooltip extends PointTooltip implements TooltipType {
    name = 'imcirclead'
    jsxName = 'imcirclead'
    tooltip = 'imcirclead'
    icon = ImCircleIconAd
    isDrawObject = true
    paramsStr = (ob: ImCircle) => `${normalizeName(ob.originPoint?.name)}`
}

export default ImCircleAdTooltip