import { ImCircle } from "jsxgraph";
import { ImCircleIconAd } from "../../../common/components/atoms/icons";
import { normalizeName } from "../utils/board";
import { TooltipType } from "./interfaces";
import PointTooltip from "./point";

class ImCircleAdTooltip extends PointTooltip implements TooltipType {
    name = 'imcirclead'
    jsxName = 'imcirclead'
    tooltip = 'Imaginary Circle Admitance (Point)'
    icon = ImCircleIconAd
    isDrawObject = true
    paramsStr = (ob: ImCircle) => `${normalizeName(ob.originPoint?.name)}`
}

export default ImCircleAdTooltip