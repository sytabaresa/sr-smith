// import { Board } from 'jsxgraph'
import JXG, { Board } from "jsxgraph"
import { createMachine, state, state as final, transition, guard, interpret, action, immediate, reduce, invoke, } from 'robot3';
import { Service } from "robot3"
import { useMachine } from "react-robot";
import { useContext, useEffect } from "react";
import { wait } from "../../../common/utils/time";
import { SmithContext, SmithContextType } from "../../../common/providers/smithContext";

import { initBoard } from "../initBoard";
import { TooltipType } from "../tooltips/interfaces";

// plugins
import PointTooltip from "../tooltips/point";
import SegmentTooltip from "../tooltips/segment";
import LineTooltip from "../tooltips/line";
import CircleTooltip from "../tooltips/circle";
import CircleRadiusTooltip from "../tooltips/circleRadius";
import CircumcircleTooltip from "../tooltips/circumcircle";
import SemicircleTooltip from "../tooltips/semicircle";
import ArcTooltip from "../tooltips/arc";
import ReCircleTooltip from "../tooltips/reCircle";
import ImCircleTooltip from "../tooltips/imCircle";
import ImCircleAdTooltip from "../tooltips/imCircleAd";
import ReCircleAdTooltip from "../tooltips/reCircleAd";
import { removeElement } from "../utils/board";


export function useDrawner() {
    let out = new JXGDrawer()
    out.useMachine()
    return out
}

export class JXGDrawer {
    board: Board
    boardName: string
    attributes: Record<string, any>
    initState: string = 'idle'
    recreatingBoard: boolean = false

    tooltipSelected: TooltipType
    private tooltipPlugins: TooltipType[] = []
    private tooltipPluginsNames: string[] = []
    private tooltipPluginMap: Record<string, TooltipType> = {}
    private touchTimer
    private reactContext: SmithContextType
    private inTouch: boolean = false
    private hitElement: any
    service: Service<typeof this.whiteboardMachine>

    constructor(attributes = {}) {
        this.attributes = attributes

        //register plugins
        this.tooltipPlugins = [
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

        // other confs
        this.tooltipPluginMap = Object.fromEntries(this.tooltipPlugins.map((t) => [t.name, t]))
        this.tooltipPluginsNames = Object.keys(this.tooltipPluginMap)
    }

    useMachine() {
        // console.log('use machine')
        this.reactContext = useContext(SmithContext)
        const out = useMachine(this.whiteboardMachine)
        this.service = out[2]

        return out
    }

    downHandler(e) {
        // console.log('event:start')
        if (this.touchTimer)
            clearTimeout(this.touchTimer)
        this.touchTimer = setTimeout(() => this.inTouch = false, 100)
        this.inTouch = true
        // this.board.update
    }

    upHandler(e) {
        // console.log('event:end', e.pointerType)
        if (!(e.pointerType == 'mouse' || this.inTouch)) {
            return
        }
        this.inTouch = false
        this.sendEvent('CLICK', e)
    }

    moveHandler(e, el) {
        // console.log('hit:', e, el)
        this.board.updateInfobox(el)
        this.hitElement = el
    }

    populateBoard() {
        //register canvas handlers:
        if (this.board) {
            this.board.on('down', this.downHandler.bind(this));
            this.board.on('up', this.upHandler.bind(this))
            this.board.on('drag', (e) => this.sendEvent('DRAG', e));
            this.board.on('hit', this.moveHandler.bind(this))
            // this.board.on('hit', (e) => this.sendEvent('HIT', e));
        }
    }

    newBoard(boxName: string, boardOptions: any = {}, screenSize: string) {
        try {
            if (!this.recreatingBoard) {
                this.recreatingBoard = true
                this.boardName = boxName
                this.board = initBoard(boxName, boardOptions, screenSize)
                this.populateBoard()
            }
        } catch (err) {
            console.log(err)
        } finally {
            this.recreatingBoard = false
        }
    }

    recreateBoard(options) {
        try {
            if (this.board != undefined && !this.recreatingBoard) {
                this.recreatingBoard = true
                const boundingBox = this.board.getBoundingBox()
                JXG.JSXGraph.freeBoard(this.board);
                this.board = initBoard(this.boardName, { ...options, boundingBox })
                this.populateBoard()
            }
        } catch (err) {
            console.log(err)
        } finally {
            this.recreatingBoard = false
        }
    }

    pluginExist = (ctx, event) => {
        // console.log(ctx, event)
        return this.tooltipPluginsNames.includes(ctx.tooltipSelected)
    }

    recreateCode = (ctx, ev) => {
        const ctxCode = ev.data.code
        // console.log('rec', ctxCode)
        const [current, send] = this.reactContext.editorService
        const code = current.context.code
        send({ type: 'CODE', value: code.slice(-1) == '\n' ? code + ctxCode : code + '\n' + ctxCode })
        return { ...ctx, code: ctxCode }
    }

    smithModeChange = (ctx: any, ev: any) => {
        return { ...ctx, smithMode: ev.value }
    }

    removeElement = (ctx: any, ev: any) => {
        console.log('del',this.hitElement)
        // removeElement(this.board, this.hitElement)
        this.board.removeObject(this.hitElement)
        return ctx
    }

    whiteboardMachine = createMachine(this.initState as any, {
        idle: state(
            transition('DELETE', 'idle', reduce(this.removeElement)),
            transition('CHANGE_DRAW', 'pre_draw'),
            transition('SMITH_MODE', 'idle', reduce(this.smithModeChange)),
        ),
        pre_draw: state(
            immediate('validatePlugin', reduce((ctx: any, ev: any) => {
                return { ...ctx, tooltipSelected: ev.value }
            }))
        ),
        validatePlugin: state(
            immediate('tooltipSelected', guard(this.pluginExist.bind(this)),
                action((ctx: any) => console.log("plugin:", ctx.tooltipSelected)),
                action((ctx: any) => this.tooltipSelected = this.tooltipPluginMap[ctx.tooltipSelected])),
            immediate('error', action((ctx: any) => console.log("plugin not exists:", ctx.tooltipSelected)))
        ),
        tooltipSelected: invoke(
            () => wait(100),
            transition('done', 'draw'),
            transition('error', 'idle')
        ),
        draw: invoke((ctx: any, event: any) =>
            this.tooltipPluginMap[ctx.tooltipSelected].machine,
            transition('done', 'draw', reduce(this.recreateCode)),
            transition('error', 'idle'),
            transition('SMITH_MODE', 'draw', reduce(this.smithModeChange)),
            transition('CHANGE_IDLE', 'post_draw'),
            transition('CHANGE_DRAW', 'pre_draw'),
            transition('EXIT', 'post_draw'),
            transition('DELETE', 'draw', reduce(this.removeElement)),
        ),
        post_draw: state(
            immediate('idle', reduce((ctx: any, ev: any) => {
                return { ...ctx, tooltipSelected: '' }
            }))
        ),
        drag: state(
            transition('CHANGE_IDLE', 'idle')
        ),
        error: state(
            immediate('idle', action((ctx, ev) => console.log("error", ev)))
        )
    }, () => ({
        tooltipSelected: '',
        code: '',
        smithMode: true,
    }))

    sendEvent = (event: string, payload: any = null) => { //TODO: types here
        this.service.send({ type: event, value: payload, board: this.board })
    }

    current = (deep = false) => {
        if (!deep) return this.service.machine.current
        let service = this.service
        if (!service) return ''
        let out = `${service.machine.current}`

        let child = !!service.child
        while (child) {
            out = `${out}.${service.child.machine.current}`
            service = service.child
            child = !!service.child
        }
        return out
    }

    context = () =>
        this.service.context

    setTooltip = (tooltip: string) => {
        this.sendEvent('CHANGE_DRAW', tooltip)
    }
}

