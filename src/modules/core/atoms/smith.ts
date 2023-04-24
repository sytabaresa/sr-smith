import { atomWithMachine } from "@utils/atomWithachine";
import editorFSM from "../fsm/editorFSM";
import savingFSM from "../fsm/savingFSM";
import menuFSM from "../fsm/menuFSM";

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
import { initBoard } from "@core/jxg/initBoard";
import { getCurrentBreakpoint } from "@utils/screen";

export const editorServiceAtom = atomWithMachine(editorFSM, (get) => ({
    menuService: menuServiceAtom,
    code: ''
}), (get) => ({ board: get(boardAtom) }))
export const savingServiceAtom = atomWithMachine(savingFSM, (get) => ({
    // id: params?.id?.[0],
    projectData: {},
    editorService: editorServiceAtom,
}))
export const menuServiceAtom = atomWithMachine(menuFSM as any, {
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
}, (get) => ({ board: get(boardAtom) }))


function populateBoard(send, board) {

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
        send({ type: 'CLICK', value: e })
    }

    if (board) {
        board.on('down', downHandler);
        board.on('up', upHandler)
        board.on('drag', (e) => send({ type: 'DRAG', value: e }));
        board.on('hit', (event, element) => board.hitElement = element)
        // this.board.on('hit', (e) => this.sendEvent('HIT', e));
    }
}

export function recreateBoard(send, params: BoardOptions, oldBoard: any) {
    try {
        const { screen, ...rest } = params
        const boundingBox = screen != '' ? screen : oldBoard.getBoundingBox()

        if (oldBoard) {
            JXG.JSXGraph.freeBoard(oldBoard);
        }
        // if (!this.recreatingBoard) {
        // this.recreatingBoard = true
        // console.log(boardName, options, boundingBox)
        const board = initBoard({ ...rest, screen: boundingBox })

        populateBoard(send, board)
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

        return {}
    },
    (get, set) => {
        // console.log(params)
        const send = (event) => set(menuServiceAtom, event)
        const board = recreateBoard(send, get(boardConfigAtom), get(cachedBoardAtom))
        set(cachedBoardAtom, board)
    }
)

export interface BoardOptions {
    theme: string;
    screen: string | number[];
    name: string;
    digits: number;
}

export const boardConfigAtom = atom<BoardOptions>({
    theme: 'light',
    name: 'smith-box',
    screen: getCurrentBreakpoint(),
    digits: 3,
})
