// import { Board } from 'jsxgraph'
import JXG from "jsxgraph/distrib/jsxgraphsrc"
import { createMachine, state, transition, guard, interpret, Service, action, immediate } from 'robot3';

export class JXGDrawer {
    board: any
    prevState: string
    attributes: Record<string, any>
    initState: string = 'draw'

    constructor(board, attributes) {
        this.board = board
        this.attributes = attributes

        this.service = interpret(this.whiteboardMachine,
            () => { }
            //     () => {
            //     console.log(`machine: {"prev": ${this.prevState}, "current": ${this.service.machine.current}}`)
            //     this.prevState = this.service.machine.current
            // }
        );

        this.prevState = this.service.machine.current

        //register canvas handlers:
        board.on('down', this.onDownHandler);
    }

    validateDrawGuard = (ctx, event) => {
        let index
        let canCreate = true
        if (event.value[JXG.touchProperty]) {
            // index of the finger that is used to extract the coordinates
            index = 0;
        }

        const coords = this.getMouseCoords(event.value, index, this.board);

        //TODO: validate more types of elements
        for (let el in this.board.objects) {
            if (JXG.isPoint(this.board.objects[el]) &&
                this.board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
                canCreate = false;
                break;
            }
        }

        return canCreate
    }

    drawHander = (ctx, event) => {
        let index

        if (event.value[JXG.touchProperty]) {
            // index of the finger that is used to extract the coordinates
            index = 0;
        }
        const coords = this.getMouseCoords(event.value, index, this.board);

        //TODO: now by default only draw a point
        this.drawPoint(this.board, coords.usrCoords[1], coords.usrCoords[2])
        this.board.update()
    }


    whiteboardMachine = createMachine(this.initState as any, {
        idle: state(
            transition('CHANGE_DRAW', 'draw')
        ),
        draw: state(
            transition('CHANGE_DRAG', 'drag'),
            transition('DOWN', 'drawing')
        ),
        drawing: state(
            immediate('draw', guard(this.validateDrawGuard), action(this.drawHander)),
            immediate('draw')
        ),
        drag: state(
            transition('CHANGE_IDLE', 'idle')
        )

    })

    service: Service<typeof this.whiteboardMachine>


    // Geometrical constructs
    drawPoint = (board: JXG, x, y) => {
        board.create('point', [x, y]);
    }

    getMouseCoords = (e, i, board) => {
        var cPos = board.getCoordsTopLeftCorner(e, i),
            absPos = JXG.getPosition(e, i),
            dx = absPos[0] - cPos[0],
            dy = absPos[1] - cPos[1];

        return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
    }

    onDownHandler = (e) => {
        // console.log('down event')
        this.service.send({ type: 'DOWN', value: e })
    }

}

