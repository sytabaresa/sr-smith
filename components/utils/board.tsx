import JXG from "jsxgraph/distrib/jsxgraphsrc"

export const getMouseCoords = (e, i, board) => {
    var cPos = board.getCoordsTopLeftCorner(e, i),
        absPos = JXG.getPosition(e, i),
        dx = absPos[0] - cPos[0],
        dy = absPos[1] - cPos[1];

    return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board)
}
