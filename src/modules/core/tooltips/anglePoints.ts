import { AnglePointsIcon } from "@components/atoms/icons";
import { TooltipType } from "./interfaces";
import ThreePointsTooltip from "./threePoints";

class AnglePointsTooltip extends ThreePointsTooltip implements TooltipType {
    name = 'angle_points'
    jsxName = 'angle'
    tooltip = 'angle_points'
    icon = AnglePointsIcon
}

export default AnglePointsTooltip