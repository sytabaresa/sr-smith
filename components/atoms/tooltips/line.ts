import { LineIcon } from "../custom-icons";
import { TooltipType } from "./interfaces";
import TwoPointsTooltip from "./twoPoints";

class LineTooltip extends TwoPointsTooltip implements TooltipType {
    name = 'line'
    jsxName = 'line'
    tooltip = 'Line'
    description = ''
    icon = LineIcon
}

export default LineTooltip