import { Line } from "jsxgraph";
import { LineIcon } from "../../../common/components/atoms/icons";
import { normalizeName } from "../utils/board";
import { TooltipType } from "./interfaces";
import TwoPointsTooltip from "./twoPoints";

class LineTooltip extends TwoPointsTooltip implements TooltipType {
    name = 'line'
    jsxName = 'line'
    tooltip = 'Line'
    icon = LineIcon
    paramsStr = (ob:Line) => `${normalizeName(ob.point1.name)}, ${normalizeName(ob.point2.name)}`
}

export default LineTooltip