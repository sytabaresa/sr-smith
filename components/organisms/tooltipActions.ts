// import { Board } from 'jsxgraph'
import JXG from "jsxgraph/distrib/jsxgraphsrc"
import { createMachine, state, state as final, transition, guard, interpret, action, immediate, reduce, invoke, } from '../fsm/machine';
import { Service } from "robot3"
import { initBoard } from "../atoms/boards";
import { TooltipType } from "../atoms/tooltips/interfaces";
import TwoPointsTooltip from "../atoms/tooltips/twoPoints";
import PointTooltip from "../atoms/tooltips/point";
import SegmentTooltip from "../atoms/tooltips/segment";
import CircleTooltip from "../atoms/tooltips/circle";
import { useMachine } from "../fsm/hooks";
import CircleRadiusTooltip from "../atoms/tooltips/circleRadius";
import LineTooltip from "../atoms/tooltips/line";
import { wait } from "../utils/time";


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
        console.log('use machine')
        const out = useMachine(this.whiteboardMachine)
        this.service = out[2]
        // this.populateBoard()
        return out
    }

    populateBoard() {
        //register canvas handlers:
        if (this.board)
            this.board.on('down', this.onDownHandler);
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

    whiteboardMachine = createMachine(this.initState as any, {
        idle: state(
            transition('CHANGE_DRAW', 'pre_draw'),
            transition('DOWN', 'idle') // only for don't display annoying errors in dev ;)
        ),
        pre_draw: state(
            immediate('validatePlugin', reduce((ctx: any, ev: any) => {
                // this.tooltipSelected = ev.value
                return { ...ctx, tooltipSelected: ev.value }
            }))
        ),
        validatePlugin: state(
            immediate('tooltipSelected', guard(this.pluginExist.bind(this)),
                action((ctx) => console.log("plugin:", ctx.tooltipSelected)),
                action((ctx) => this.tooltipSelected = this.tooltipPluginMap[ctx.tooltipSelected])),
            immediate('error', action((ctx) => console.log("plugin not exists:", ctx.tooltipSelected)))
        ),
        tooltipSelected: invoke(
            wait(100),
            transition('done', 'draw')
        ),
        draw: invoke((ctx: any, event: any) =>
            this.tooltipPluginMap[ctx.tooltipSelected].machine,
            transition('done', 'draw'),
            transition('CHANGE_IDLE', 'idle'),
            transition('CHANGE_DRAW', 'pre_draw'),
            transition('EXIT', 'idle'),
        ),
        drag: state(
            transition('CHANGE_IDLE', 'idle')
        ),
        error: state(
            immediate('idle', action((ctx, ev) => console.log("error", ev)))
        )
    }, () => ({
        tooltipSelected: '',
    }))

    onDownHandler = (e) => {
        console.log('down event')
        // this.useMachine()
        this.sendEvent('DOWN', e)
    }

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

