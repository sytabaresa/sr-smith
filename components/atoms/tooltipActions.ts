// import { Board } from 'jsxgraph'
import JXG from "jsxgraph/distrib/jsxgraphsrc"
import { createMachine, state, state as final, transition, guard, interpret, action, immediate, reduce, invoke, } from '../fsm/machine';
import { Service } from "robot3"
import { initBoard } from "./boards";
import { TooltipType } from "./tooltips/interfaces";
import LineTooltip from "./tooltips/line";
import PointTooltip from "./tooltips/point";

export class JXGDrawer {
    board: any
    boardName: string
    prevState: string
    attributes: Record<string, any>
    initState: string = 'idle'

    // private tooltipSelected: string = ''
    private tooltipPlugins: TooltipType[] = []
    private tooltipPluginsNames: string[] = []
    private tooltipPluginMap: Record<string, TooltipType> = {}
    private service: Service<typeof this.whiteboardMachine>

    constructor(attributes = {}) {
        this.attributes = attributes

        this.service = interpret(this.whiteboardMachine,
            (service) => { },
            //     (service) => {
            //     console.log(`machine: {"prev": ${this.prevState}, "current": ${service.machine.current}}`)
            //     this.prevState = service.machine.current
            // },
            {});

        this.prevState = this.service.machine.current

        //register plugins
        this.tooltipPlugins = [
            new PointTooltip(),
            new LineTooltip(),
        ]

        // other confs
        this.tooltipPluginMap = Object.fromEntries(this.tooltipPlugins.map((t) => [t.name, t]))
        this.tooltipPluginsNames = Object.keys(this.tooltipPluginMap)
    }

    populateBoard() {
        //register canvas handlers:
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
            transition('CHANGE_DRAW', 'draw'),
            transition('DOWN', 'idle') // only for don't display annoying errors in dev ;)
        ),
        draw: state(
            immediate('validatePlugin', reduce((ctx: any, ev: any) => {
                // this.tooltipSelected = ev.value
                return { ...ctx, tooltipSelected: ev.value }
            }))
        ),
        validatePlugin: state(
            immediate('drawMachine', guard(this.pluginExist.bind(this))),
            immediate('error', action(() => console.log("plugin not exists")))
        ),
        drawMachine: invoke((ctx: any, event: any) =>
            this.tooltipPluginMap[ctx.tooltipSelected].machine,
            transition('done', 'drawMachine'),
            transition('CHANGE_IDLE', 'idle'),
            transition('CHANGE_DRAW', 'draw'),
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
        // console.log('down event')
        this.sendEvent('DOWN', e)
    }

    sendEvent = (event: string, payload: any = null) => { //TODO: types here
        this.service.send({ type: event, value: payload, board: this.board })
    }

    setTooltip = (tooltip: string) => {
        this.sendEvent('CHANGE_DRAW', tooltip)
    }
}

