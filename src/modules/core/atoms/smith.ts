import { atomWithMachine } from "@utils/atoms";
import editorFSM from "@core/fsm/editorFSM";
import savingFSM from "@core/fsm/savingFSM";
import drawFSM from "@core/fsm/drawFSM";

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
import { Getter, Setter, WritableAtom, atom } from "jotai";
import { initBoard } from "@core/jxg/initBoard";
import { getCurrentBreakpoint } from "@hooks/useScreen";
import { atomWithStorage } from "jotai/utils";
import { SmithProject } from "@localtypes/smith";
import { _dataRxdbProviderAtom, dataQLProviderAtom } from "./db";
import { Loadable } from "jotai/vanilla/utils/loadable";
import { Board } from "jsxgraph";

export const editorServiceAtom = atomWithMachine(editorFSM, (get) => ({
    menuService: drawServiceAtom,
    code:
        `/**
 * My smith design
 * @author: your name (me@example.org)
 * @version: 1.0
**/
a = 1;
Zo = 50;`
}), (get) => ({ board: get(boardAtom) }))
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

export function recreateBoard(get: Getter, set: Setter, params: BoardOptions, oldBoard: any) {
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
        const board = initBoard(get, set, { ...rest, screen: boundingBox })

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
    (get, set, params: BoardOptions = null) => {
        // console.log(params)
        const board = recreateBoard(get, set, { ...get(boardConfigAtom), ...params }, get(cachedBoardAtom))
        set(cachedBoardAtom, board)
    }
)

export interface BoardOptions {
    theme: string;
    screen: string | number[];
    name: string;
    digits: number;
    translations: Record<string, any>;
    infobox: {
        x: number,
        y: number
    }
}

export const boardConfigAtom = atom<BoardOptions>({
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

export const boardDataAtom = atomWithStorage('config', {
    coordsPresition: 3
})

export const codeAtom = atom<string>(
    (get) => {
        const current = get(editorServiceAtom)
        return current.context?.code
    }
)

const _projectDataAtom = atom<Loadable<SmithProject> & { readonly: boolean }>({
    readonly: true,
    state: 'loading'
})

const _getData = async (get) => {
    const oldProject = get(_projectDataAtom)

    if (oldProject)
        return oldProject

    const id = get(_projectIDAtom)
    console.log('loading data', id)

    try {
        const { getOne } = await get(_dataRxdbProviderAtom)
        const projectData: SmithProject = await getOne({
            resource: 'projects',
            id: id,
        })

        // console.log(projectData)
        if (projectData) {
            return { state: 'hasData', readonly: false, data: projectData }
        }
        // } else
        //     return Promise.reject('document not exists')
    } catch (err) {
        console.log("document loading error", err)
        return Promise.reject(err)
    }

    console.log('loading data (read only)', id)

    try {
        const { getOne } = await get(dataQLProviderAtom)
        const projectData: SmithProject = await getOne({
            resource: 'project',
            id: id,
            meta: {
                fields: [
                    'data',
                    'description',
                    'id',
                    'deleted',
                    'updatedAt',
                    'createdAt',
                    'name',
                    'isPublic',
                ]
            }
        })

        // console.log(projectData)
        if (projectData) {
            return { state: 'hasData', readonly: true, data: projectData.data }
        } else
            return Promise.reject('document not exists')
    } catch (err) {
        console.log("document loading error", err)
        return Promise.reject(err)
    }
}

const _projectIDAtom = atom('')
export const projectDataAtom = atom(
    (get) => {
        return get(_projectDataAtom)
    },
    async (get, set, values: Partial<SmithProject>) => {
        const oldProject = get(_projectDataAtom)
        if (oldProject.state == 'loading') {
            set(_projectDataAtom, {
                state: 'hasData',
                readOnly: values.readonly,
                data: values.data
            })
        }
        if (!oldProject.readonly) {
            const { update, getOne } = await get(_dataRxdbProviderAtom)

            await update({
                resource: 'projects',
                id: oldProject.data.id,
                variables: values
            })

            const project = await getOne({
                resource: 'projects',
                id: get(_projectDataAtom).project.id,
            })
            set(_projectDataAtom, { ...oldProject, project })
        } else {
            set(_projectDataAtom, { ...oldProject, project: { ...oldProject.project, ...values } })
        }
    }
)

export const infoboxAtom = atom<{
    x: number,
    y: number,
    el: any
}>({ x: 0, y: 0, el: undefined })