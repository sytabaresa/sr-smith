import { ArcIcon } from "@components/atoms/icons";
import { TooltipType } from "./interfaces";
import ThreePointsTooltip from "./threePoints";

class ArcTooltip extends ThreePointsTooltip implements TooltipType  {
    name = 'arc'
    jsxName = 'arc'
    tooltip = 'arc'
    description = 'arc'
    icon = ArcIcon
}

export default ArcTooltip