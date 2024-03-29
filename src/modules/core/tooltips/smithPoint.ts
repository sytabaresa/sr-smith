import { TooltipType } from "./interfaces";
import { PointIcon } from "@components/atoms/icons";
import PointTooltip from "./point";

class SmithPointTooltip extends PointTooltip implements TooltipType {
    name = 'spoint'
    tooltip = 'spoint'
    icon = PointIcon
}

export default SmithPointTooltip