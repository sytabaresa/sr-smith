import { CircleCenterPointIcon } from "@components/atoms/icons";
import { normalizeName } from "@core/utils/board";
import { TooltipType } from "./interfaces";
import TwoPointsTooltip from "./twoPoints";

class CircleTooltip extends TwoPointsTooltip implements TooltipType {
    name = 'circle'
    jsxName = 'circle'
    tooltip = 'circle'
    icon = CircleCenterPointIcon
    paramsStr = (ob: any) => `${normalizeName(ob.center.name)},${normalizeName(ob.point2?.name) ?? normalizeName(ob.circle?.name) ?? normalizeName(ob.line?.name)}`
}

export default CircleTooltip