import { TooltipType } from "./interfaces";
import JXG from "jsxgraph/distrib/jsxgraphsrc"
import { getMouseCoords } from "../../utils/board";


const pointTooltip: TooltipType = {
    name: () => 'point',
    validation(board, event, attrs) {
        let index
        let canCreate = true
        if (event.value[JXG.touchProperty]) {
            // index of the finger that is used to extract the coordinates
            index = 0;
        }

        const coords = getMouseCoords(event.value, index, board);

        //TODO: validate more types of elements
        for (let el in board.objects) {
            if (JXG.isPoint(board.objects[el]) &&
                board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
                canCreate = false;
                break;
            }
        }

        return canCreate
    },
    action: (board, event, attrs) => {
        let index
        if (event.value[JXG.touchProperty]) {
            // index of the finger that is used to extract the coordinates
            index = 0;
        }

        const coords = getMouseCoords(event.value, index, board);

        board.create('point', [coords.usrCoords[1], coords.usrCoords[2]]);
    }
}

export default pointTooltip