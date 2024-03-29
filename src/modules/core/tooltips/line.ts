import { Line } from "jsxgraph";
import { LineIcon } from "@components/atoms/icons";
import { normalizeName } from "@core/utils/board";
import { TooltipType } from "./interfaces";
import TwoPointsTooltip from "./twoPoints";

class LineTooltip extends TwoPointsTooltip implements TooltipType {
    name = 'line'
    jsxName = 'line'
    tooltip = 'line'
    icon = LineIcon
    paramsStr = (ob:Line) => `${normalizeName(ob.point1.name)}, ${normalizeName(ob.point2.name)}`
}

export default LineTooltip