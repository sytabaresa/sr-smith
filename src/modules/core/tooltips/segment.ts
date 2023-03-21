import { Segment } from "jsxgraph";
import { SegmentIcon } from "@components/atoms/icons";
import { normalizeName } from "@core/utils/board";
import { TooltipType } from "./interfaces";
import TwoPointsTooltip from "./twoPoints";

class SegmentTooltip extends TwoPointsTooltip implements TooltipType {
    name = 'segment'
    jsxName = 'segment'
    tooltip = 'segment'
    icon = SegmentIcon
    paramsStr = (ob: Segment) => `${normalizeName(ob.point1.name)}, ${normalizeName(ob.point2.name)}`
}

export default SegmentTooltip