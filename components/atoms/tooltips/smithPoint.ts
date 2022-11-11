import { TooltipType } from "./interfaces";
import { PointIcon } from "../custom-icons";
import PointTooltip from "./point";

class SmithPointTooltip extends PointTooltip implements TooltipType {
    objectSelected: any[]
    name = 'spoint'
    tooltip = 'sPoint'
    icon = PointIcon
}

export default SmithPointTooltip