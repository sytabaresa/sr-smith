import { SegmentIcon } from "../custom-icons";
import { TooltipType } from "./interfaces";
import TwoPointsTooltip from "./twoPoints";

class SegmentTooltip extends TwoPointsTooltip implements TooltipType {
    name = 'segment'
    jsxName = 'segment'
    tooltip = 'Segment'
    description = ''
    icon = SegmentIcon
}

export default SegmentTooltip