// import { Board } from 'jsxgraph'
import JXG from "jsxgraph/distrib/jsxgraphsrc"
import { createMachine, state, state as final, transition, guard, interpret, Service, action, immediate, reduce, invoke } from 'robot3';
import { initBoard } from "./boards";
import { TooltipType } from "./tooltips/interfaces";
import pointTooltip from "./tooltips/point";

export class JXGDrawer {
    board: any
    boardName: string
    prevState: string
    attributes: Record<string, any>
    initState: string = 'idle'
    private tooltipPlugins: TooltipType[]
    private tooltipPluginsNames: string[]
    private tooltipPluginMap: Record<string, TooltipType>

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
        this.tooltipPlugins = [pointTooltip]


        // other confs
        this.tooltipPluginMap = Object.fromEntries(this.tooltipPlugins.map((t) => [t.name(), t]))
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

    drawHander = (ctx, event) => {
        //TODO: now by default only draw a point
        const plugin = this.tooltipPluginMap[ctx.tooltipSelected]

        plugin.action(this.board, event, {})
        this.board.update()
    }

    validationDrawHandler = (ctx, event) => {
        const plugin = this.tooltipPluginMap[ctx.tooltipSelected]

        return plugin.validation(this.board, event, {})
    }

    pluginExist = (ctx, event) => {
        console.log(ctx, event)
        return this.tooltipPluginsNames.includes(ctx.tooltipSelected)
    }

    drawMachine = createMachine('init', {
        init: state(
            immediate('validate', guard(this.pluginExist.bind(this))),
            immediate('error')
        ),
        validate: state(
            immediate('action_draw', guard(this.validationDrawHandler.bind(this))),
            immediate('no_action')
        ),
        action_draw: state( // maybe async promise?
            immediate('done', action(this.drawHander.bind(this)))
        ),
        no_action: final(),
        error: final(),
        done: final()
    }, (parentContext: any) => ({
        tooltipSelected: parentContext.tooltipSelected,
    }))

    whiteboardMachine = createMachine(this.initState as any, {
        idle: state(
            transition('CHANGE_DRAW', 'pre_draw'),
            transition('DOWN', 'idle') // only for don't display annoying errors in dev ;)
        ),
        pre_draw: state(
            immediate('draw', reduce((ctx: any, ev: any) => ({ ...ctx, tooltipSelected: ev.value })))
        ),
        draw: state(
            transition('CHANGE_DRAG', 'drag'),
            transition('DOWN', 'drawing')
        ),
        drawing: invoke(this.drawMachine,
            transition('done', 'draw')
        ),
        drag: state(
            transition('CHANGE_IDLE', 'idle')
        )

    }, (initialContext) => ({
        tooltipSelected: ''
    }))

    service: Service<typeof this.whiteboardMachine>

    onDownHandler = (e) => {
        // console.log('down event')
        this.service.send({ type: 'DOWN', value: e })
    }

    setTooltip = (tooltip: string) => {
        this.service.send({ type: 'CHANGE_DRAW', value: tooltip })
    }
}

