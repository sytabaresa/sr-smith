// import { Board } from 'jsxgraph'
import JXG from "jsxgraph/distrib/jsxgraphsrc"
import { createMachine, state, state as final, transition, guard, interpret, action, immediate, reduce, invoke, } from 'robot3';
import { Service } from "robot3"
import { initBoard } from "../atoms/boards";
import { TooltipType } from "../atoms/tooltips/interfaces";
import TwoPointsTooltip from "../atoms/tooltips/twoPoints";
import PointTooltip from "../atoms/tooltips/point";
import SegmentTooltip from "../atoms/tooltips/segment";
import CircleTooltip from "../atoms/tooltips/circle";
import { useMachine } from "react-robot";
import CircleRadiusTooltip from "../atoms/tooltips/circleRadius";
import LineTooltip from "../atoms/tooltips/line";
import { wait } from "../utils/time";
import { useContext, useEffect } from "react";
import { SmithContext } from "../../providers/smithContext";


export function useDrawner() {
    let out = new JXGDrawer()
    out.useMachine()
    return out
}

export class JXGDrawer {
    board: any
    boardName: string
    attributes: Record<string, any>
    initState: string = 'idle'

    tooltipSelected: TooltipType
    private tooltipPlugins: TooltipType[] = []
    private tooltipPluginsNames: string[] = []
    private tooltipPluginMap: Record<string, TooltipType> = {}
    private touchTimer
    private reactContext: Record<string, any>
    private inTouch: boolean = false
    service: Service<typeof this.whiteboardMachine>

    constructor(attributes = {}) {
        this.attributes = attributes

        // this.service = interpret(this.whiteboardMachine,
        //     (service) => { },
        //     //     (service) => {
        //     //     console.log(`machine: {"prev": ${this.prevState}, "current": ${service.machine.current}}`)
        //     //     this.prevState = service.machine.current
        //     // },
        //     {});

        //register plugins
        this.tooltipPlugins = [
            new PointTooltip(),
            new TwoPointsTooltip(),
            new LineTooltip(),
            new SegmentTooltip(),
            new CircleTooltip(),
            new CircleRadiusTooltip(),
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

        // const ctxCode = out[0].context.code
        // useEffect(() => {
        //     console.log('a', ctxCode)
        //     if (ctxCode && ctxCode != '')
        //         setCode(code => code.slice(-1) == '\n' ? code + ctxCode : code + '\n' + ctxCode)
        // }, [setCode, out[0].context.code])


        // this.populateBoard()
        return out
    }

    downHandler(e) {
        // console.log('event:start')
        if (this.touchTimer)
            clearTimeout(this.touchTimer)
        const handler = () => this.inTouch = false
        this.touchTimer = setTimeout(handler.bind(this), 200)
        this.inTouch = true
    }

    upHandler(e) {
        // console.log('event:end')
        if (this.inTouch) {
            this.sendEvent('DOWN', e)
            this.inTouch = false
        }
    }

    populateBoard() {
        //register canvas handlers:
        if (this.board) {
            this.board.on('down', this.downHandler.bind(this));
            this.board.on('up', this.upHandler.bind(this))
            this.board.on('drag', (e) => this.sendEvent('DRAG', e));
            // this.board.on('hit', (e) => this.sendEvent('HIT', e));
        }
    }

    newBoard(boxName: string, boardOptions: any = {}, screenSize: string) {
        this.boardName = boxName
        this.board = initBoard(boxName, boardOptions, screenSize)
        this.populateBoard()
    }

    recreateBoard() {
        if (this.board != undefined) {
            const boundingBox = this.board.getBoundingBox()
            JXG.JSXGraph.freeBoard(this.board);
            this.board = initBoard(this.boardName, { boundingBox })
            this.populateBoard()
        }
    }

    pluginExist = (ctx, event) => {
        // console.log(ctx, event)
        return this.tooltipPluginsNames.includes(ctx.tooltipSelected)
    }

    recreateCode = (ctx, ev) => {
        const ctxCode = ev.data.code
        console.log('rec', ctxCode)
        this.reactContext.setCode(code => code.slice(-1) == '\n' ? code + ctxCode : code + '\n' + ctxCode)
        return { ...ctx, code: ctxCode }
    }

    whiteboardMachine = createMachine(this.initState as any, {
        idle: state(
            transition('CHANGE_DRAW', 'pre_draw'),
            transition('DOWN', 'idle') // only for don't display annoying errors in dev ;)
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
            wait(100),
            transition('done', 'draw'),
            transition('error', 'idle')
        ),
        draw: invoke((ctx: any, event: any) =>
            this.tooltipPluginMap[ctx.tooltipSelected].machine,
            transition('done', 'draw', reduce(this.recreateCode)),
            transition('error', 'idle'),
            transition('CHANGE_IDLE', 'post_draw'),
            transition('CHANGE_DRAW', 'pre_draw'),
            transition('EXIT', 'post_draw'),
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

