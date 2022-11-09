import { ArcIcon } from "../custom-icons";
import { TooltipType } from "./interfaces";
import ThreePointsTooltip from "./threePoints";

class ArcTooltip extends ThreePointsTooltip implements TooltipType  {
    name = 'arc'
    jsxName = 'arc'
    tooltip = 'Arc'
    description = ''
    icon = ArcIcon
}

export default ArcTooltip