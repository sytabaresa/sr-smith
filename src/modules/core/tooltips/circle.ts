import { Circle } from "jsxgraph";
import { CircleCenterPointIcon } from "../../../common/components/atoms/icons";
import { normalizeName } from "../utils/board";
import { TooltipType } from "./interfaces";
import TwoPointsTooltip from "./twoPoints";

class CircleTooltip extends TwoPointsTooltip implements TooltipType {
    name = 'circle'
    jsxName = 'circle'
    tooltip = 'Circle (center, point)'
    icon = CircleCenterPointIcon
    paramsStr = (ob: any) => `${normalizeName(ob.center.name)},${normalizeName(ob.point2?.name) ?? normalizeName(ob.circle?.name) ?? normalizeName(ob.line?.name)}`
}

export default CircleTooltip