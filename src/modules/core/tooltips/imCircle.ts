import { ImCircle } from "jsxgraph";
import { ImCircleIcon } from "../../../common/components/atoms/icons";
import { normalizeName } from "../utils/board";
import { TooltipType } from "./interfaces";
import PointTooltip from "./point";

class ImCircleTooltip extends PointTooltip implements TooltipType {
    name = 'imcircle'
    jsxName = 'imcircle'
    tooltip = 'Imaginary Circle (Point)'
    icon = ImCircleIcon
    isDrawObject = true
    paramsStr = (ob: ImCircle) => `${normalizeName(ob.originPoint?.name)}`
}

export default ImCircleTooltip