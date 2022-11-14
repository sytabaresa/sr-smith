import { ArcIcon } from "../../../common/components/atoms/icons";
import { TooltipType } from "./interfaces";
import ThreePointsTooltip from "./threePoints";

class ArcTooltip extends ThreePointsTooltip implements TooltipType  {
    name = 'arc'
    jsxName = 'arc'
    tooltip = 'Arc'
    description = 'Select origin,fist point and point for angle'
    icon = ArcIcon
}

export default ArcTooltip