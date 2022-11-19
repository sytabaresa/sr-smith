import { Segment } from "jsxgraph";
import { SegmentIcon } from "../../../common/components/atoms/icons";
import { normalizeName } from "../utils/board";
import { TooltipType } from "./interfaces";
import TwoPointsTooltip from "./twoPoints";

class SegmentTooltip extends TwoPointsTooltip implements TooltipType {
    name = 'segment'
    jsxName = 'segment'
    tooltip = 'Segment'
    icon = SegmentIcon
    paramsStr = (ob: Segment) => `${normalizeName(ob.point1.name)}, ${normalizeName(ob.point2.name)}`
}

export default SegmentTooltip