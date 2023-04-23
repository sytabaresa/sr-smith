import { atomWithMachine } from "@utils/atomWithachine";
import editorFSM from "./editorFSM";
import savingFSM from "./savingFSM";
import menuFSM from "./menuFSM";

import PointTooltip from "@tooltips/point";
import LineTooltip from "@tooltips/line";
import CircleTooltip from "@tooltips/circle";
import SegmentTooltip from "@tooltips/segment";
import SemicircleTooltip from "@tooltips/semicircle";
import CircleRadiusTooltip from "@tooltips/circleRadius";
import CircumcircleTooltip from "@tooltips/circumcircle";
import ArcTooltip from "@tooltips/arc";
import ReCircleTooltip from "@tooltips/reCircle";
import ImCircleTooltip from "@tooltips/imCircle";
import ReCircleAdTooltip from "@tooltips/reCircleAd";
import ImCircleAdTooltip from "@tooltips/imCircleAd";
import { atom } from "jotai";
import { initBoard } from "@core/initBoard";


export const editorServiceAtom = atomWithMachine(editorFSM, (get) => ({
    menuService: menuServiceAtom,
    code: ''
}))
export const savingServiceAtom = atomWithMachine(savingFSM, (get) => ({
    // id: params?.id?.[0],
    projectData: {},
    editorService: editorServiceAtom,
}))
export const menuServiceAtom = atomWithMachine(menuFSM, {
    smithMode: true,
    tooltipPlugins: [
        new PointTooltip(),
        new LineTooltip(),
        new SegmentTooltip(),
        new CircleTooltip(),
        new SemicircleTooltip(),
        new CircleRadiusTooltip(),
        new CircumcircleTooltip(),
        new ArcTooltip(),
        new ReCircleTooltip(),
        new ImCircleTooltip(),
        new ReCircleAdTooltip(),
        new ImCircleAdTooltip(),
    ]
})



function populateBoard(get, board) {
    const menuService = get(menuServiceAtom)

    //register canvas handlers:
    const sendEvent = (event: string, payload: any = null) => { //TODO: types here
        menuService.send({ type: event, value: payload, board })
    }

    let touchTimer = null
    let inTouch = false

    function downHandler(e) {
        // console.log('event:start')
        if (touchTimer)
            clearTimeout(touchTimer)
        touchTimer = setTimeout(() => inTouch = false, 100)
        inTouch = true
        // board.update
    }

    function upHandler(e) {
        // console.log('event:end', e.pointerType)
        if (!(e.pointerType == 'mouse' || inTouch)) {
            return
        }
        inTouch = false
        sendEvent('CLICK', e)
    }

    if (board) {
        board.on('down', downHandler);
        board.on('up', upHandler)
        board.on('drag', (e) => sendEvent('DRAG', e));
        board.on('hit', (event, element) => sendEvent('HIT', { event, element }))
        // this.board.on('hit', (e) => this.sendEvent('HIT', e));
    }
}

export function recreateBoard(get, params: Record<string, any>, oldBoard: any) {
    try {
        const { name, options, screenSize } = params
        const boundingBox = screenSize != '' ? screenSize : oldBoard.getBoundingBox()

        if (oldBoard) {
            JXG.JSXGraph.freeBoard(oldBoard);
        }
        // if (!this.recreatingBoard) {
        // this.recreatingBoard = true
        // console.log(boardName, options, boundingBox)
        const board = initBoard(name, options, boundingBox)

        populateBoard(get, board)
        return board
        // }
    } catch (err) {
        console.log(err)
        return null
    }
    //  finally {
    // this.recreatingBoard = false
    // }
}

const cachedBoardAtom = atom<JXG.Board>(null)
export const boardAtom = atom(
    (get) => {
        const cached = get(cachedBoardAtom)
        if (cached)
            return cached

        const board = recreateBoard(get, {}, null)
        return board

    },
    (get, set, params: Record<string, any>) => {
        const board = recreateBoard(get, params, get(cachedBoardAtom))
        set(cachedBoardAtom, board)
    }
)