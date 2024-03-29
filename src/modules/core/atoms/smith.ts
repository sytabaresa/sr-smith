import { atomWithMachine } from "@utils/atoms";
import editorFSM from "@core/fsm/editorFSM";
import savingFSM from "@core/fsm/savingFSM";
import drawFSM from "@core/fsm/drawFSM";
import { Getter, PrimitiveAtom, Setter, WritableAtom, atom } from "jotai";
import { initBoard } from "@core/jxg/initBoard";
import { getCurrentBreakpoint } from "@hooks/useScreen";
import { atomWithReset } from "jotai/utils";
import { _dataRxdbProviderAtom } from "./db";
import { Board, GeometryElement } from "jsxgraph";
import { BoardConfigOptions, RuntimeProject, SmithProject } from "@localtypes/smith";
import { DataProvider } from "@db/db";

// tooltips:
import AngleTooltip from "@tooltips/angle";
import AnglePointsTooltip from "@tooltips/anglePoints";
import ReCircleAdTooltip from "@core/tooltips/reCircleAd";
import ImCircleAdTooltip from "@core/tooltips/imCircleAd";
import PointTooltip from "@core/tooltips/point";
import SegmentTooltip from "@core/tooltips/segment";
import LineTooltip from "@core/tooltips/line";
import CircleTooltip from "@core/tooltips/circle";
import CircleRadiusTooltip from "@core/tooltips/circleRadius";
import ImCircleTooltip from "@core/tooltips/imCircle";
import CircumcircleTooltip from "@core/tooltips/circumcircle";
import SemicircleTooltip from "@core/tooltips/semicircle";
import ArcTooltip from "@core/tooltips/arc";
import ReCircleTooltip from "@core/tooltips/reCircle";
import { PlateEditor } from "@udecode/plate-common";
import { MyValue } from "@editor/types";

export const editorServiceAtom = atomWithMachine(editorFSM, (get) => ({
    menuService: drawServiceAtom,
}))

export const savingServiceAtom = atomWithMachine(savingFSM, (get) => ({
    // id: params?.id?.[0],
    projectData: {},
    editorService: editorServiceAtom,
}))
export const drawServiceAtom = atomWithMachine(drawFSM as any, {
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
        new AngleTooltip(),
        new AnglePointsTooltip(),
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
        // board.on('hit', (e) => this.sendEvent('HIT', e));
    }
}



const initBoardWrapper = (get: Getter, set: Setter, options: BoardConfigOptions) => {
    const brd = initBoard(options)

    brd.highlightInfobox = function (x: number, y: number, el: GeometryElement) {
        set(infoboxAtom, { x, y, el })
        this.infobox.setText('')
        return this
    }

    return brd
}

export function recreateBoard(get: Getter, set: Setter, params: BoardConfigOptions, oldBoard: any) {
    try {
        const send = (event) => set(drawServiceAtom, event)

        const { screen, ...rest } = params
        const boundingBox = screen && screen != '' ? screen : oldBoard.getBoundingBox()

        if (oldBoard) {
            JXG.JSXGraph.freeBoard(oldBoard);
        }
        // if (!this.recreatingBoard) {
        // this.recreatingBoard = true
        // console.log(boardName, options, boundingBox)
        const board = initBoardWrapper(get, set, { ...rest, screen: boundingBox })

        populateBoard(send, board)
        return board
        // }
    } catch (err) {
        console.log("recreate board error :", err)
        return null
    }
    //  finally {
    // this.recreatingBoard = false
    // }
}

const cachedBoardAtom = atom(null) as WritableAtom<Board, [Board], unknown>
export const boardAtom = atom(
    (get) => {
        const cached = get(cachedBoardAtom)
        if (cached)
            return cached

        return {}
    },
    (get, set, params: Partial<BoardConfigOptions> = null) => {
        // console.log(params)
        const board = recreateBoard(get, set, { ...get(boardConfigAtom), ...params }, get(cachedBoardAtom))
        set(cachedBoardAtom, board)
        return board
    }
)

export const boardConfigAtom = atom<Partial<BoardConfigOptions>>({
    theme: 'light',
    name: 'smith-box',
    screen: getCurrentBreakpoint(),
    digits: 3,
    translations: {},
    infobox: {
        x: -10,
        y: 10
    }
})

export const _projectDataAtom = atom(null) as PrimitiveAtom<RuntimeProject>
export const projectDataAtom = atom<RuntimeProject, [Partial<SmithProject>, Partial<RuntimeProject>], void>(
    (get) => get(_projectDataAtom),
    async (get, set, project, runtime) => {
        const oldData = get(_projectDataAtom)
        set(_projectDataAtom, {
            ...oldData,
            ...runtime,
            project: {
                ...oldData.project,
                ...project
            }
        })

        if (!oldData?.readOnly) {
            const { update } = await get(_dataRxdbProviderAtom) as DataProvider

            await update({
                resource: 'projects',
                id: oldData.project.id,
                variables: {
                    ...project
                } as SmithProject
            })
        }
    }
)


export const _codeAtom = atomWithReset<string>(
    `/**
* My smith design
* @author: your name (me@example.org)
* @version: 1.0
**/
Zo = 50;`)

// read only atom
export const codeAtom = atom<string>(
    (get) => {
        return get(_codeAtom)
    }
)

export const infoboxAtom = atom<{
    x: number,
    y: number,
    el: any
}>({ x: 0, y: 0, el: undefined })

export const editorAtom = atom<React.MutableRefObject<PlateEditor<MyValue>>>(null)