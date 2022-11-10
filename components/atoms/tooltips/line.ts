import { Line } from "jsxgraph";
import { LineIcon } from "../custom-icons";
import { normalizeName } from "./common";
import { TooltipType } from "./interfaces";
import TwoPointsTooltip from "./twoPoints";

class LineTooltip extends TwoPointsTooltip implements TooltipType {
    name = 'line'
    jsxName = 'line'
    tooltip = 'Line'
    description = ''
    icon = LineIcon
    paramsStr = (ob:Line) => `${normalizeName(ob.point1.name)}, ${normalizeName(ob.point2.name)}`
}

export default LineTooltip