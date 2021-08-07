import { useContext, useEffect } from "react";
import JXG from "jsxgraph/build/bin/jsxgraphcore"
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.js'
import { useMediaQuery, } from "react-responsive"

import { SmithContext } from "./context";

const fullConfig = resolveConfig(tailwindConfig)

export interface ISmithBoardProps { };

const useScreen = () => {

    const isBigMobile = useMediaQuery({ minDeviceWidth: fullConfig.theme.screens.sm })
    const isTablet = useMediaQuery({ minDeviceWidth: fullConfig.theme.screens.md })
    const isDesktop = useMediaQuery({ minDeviceWidth: fullConfig.theme.screens.lg })

    if (isDesktop) return 'lg'
    if (isTablet) return 'md'
    if (isBigMobile) return 'sm'
    return 'xs'

}
export const initBoard = (boxName: string, boardOptions: any = {}, screenSize: string = 'lg') => {

    const screenBoxSizes = {
        'xs': [-1.2, 2, 1.2, -2],
        'sm': [-1, 2, 1, -2],
        'md': [-2, 3.5, 2, -2],
        'lg': [-2.5, 1.2, 1.5, -1.2],
    }

    const boundingbox = screenBoxSizes[screenSize]

    const brd = JXG.JSXGraph.initBoard(boxName, {
        boundingbox,
        // maxBoundingBox: [-4, 2, 4, -2], //TODO: revisr porque los eventos touch no funcionan bien con esto
        keepaspectratio: true,
        // grid: true,
        // axis: true,
        showFullscreen: true,
        showCopyRight: false,
        showScreenshot: true,
        pan: {
            enabled: true,
            needShift: false, // mouse panning needs pressing of the shift key
            needTwoFingers: false, // panning is done with two fingers on touch devices
        },
        zoom: {
            wheel: true,
            needShift: false,
            pinchSensitivity: 5,
            pinchHorizontal: false, // Allow pinch-to-zoom to zoom only horizontal axis
            pinchVertical: false   // Allow pinch-to-zoom to zoom only vertical axis
            // max: 1000.0,
            // min: 0.8,
        },
        ...boardOptions,
    });

    const l1 = brd.create('line', [[0, 0], [1, 0]])

    // brd.create('ticks', [l1, 0.25], {
    //     drawlabels: true,
    //     drawzero: true,
    //     // highlightstrokecolor: "#888888",
    //     insertticks: true,
    //     label: {
    //         // anchorX: "middle",
    //         // anchorY: "top",
    //         // autoPosition: false,
    //         // display: "internal",
    //         // fixed: true,
    //         // highlightStrokeColor: "black",
    //         // highlightStrokeOpacity: 0.666666,
    //         // layer: 9,
    //         // needsRegularUpdate: false,
    //         // offset: [0, -3],
    //         // parse: false,
    //         // position: "urt",
    //         // strokeColor: "black",
    //         // strokeOpacity: 1,
    //     },
    //     minorticks: 9,
    //     // minticksdistance: 5,
    //     needsregularupdate: false,
    //     // strokecolor: "#666666",
    //     strokeopacity: 0.5,
    //     strokewidth: 1,
    //     // tickendings: [0, 1],
    //     // ticksdistance: 0.1,
    //     type: "smith1",
    //     // visible: "inherit",
    // });

    brd.create('ticks', [l1, 0.05], {
        drawlabels: false,
        drawzero: true,
        // highlightstrokecolor: "#888888",
        insertticks: true,
        label: {
            // anchorX: "middle",
            // anchorY: "top",
            // autoPosition: false,
            // display: "internal",
            // fixed: true,
            // highlightStrokeColor: "black",
            // highlightStrokeOpacity: 0.666666,
            // layer: 9,
            // needsRegularUpdate: false,
            // offset: [0, -3],
            // parse: false,
            // position: "urt",
            // strokeColor: "black",
            // strokeOpacity: 1,
        },
        minorticks: 1,
        // minticksdistance: 5,
        needsregularupdate: false,
        // strokecolor: "#666666",
        strokeopacity: 0.25,
        strokewidth: 1,
        // tickendings: [0, 1],
        // ticksdistance: 0.1,
        type: "smith1",
        // visible: "inherit",
    });

    let c1 = brd.create('conic', [1, 1, -1, 0, 0, 0]);
    // let y1 = brd.create('line', [[0, 0], [0, 1]])

    brd.create('ticks', [c1], {
        insertticks: false,
        type: 'smith2',
    });

    // brd.create('ticks', [l1], {
    //     type: 'smith2',
    //     insertticks: true,
    // })

    // brd.create('axis', [[0,0], [1,0]], {
    //     ticks: {
    //         type: 'polar',         // Polar grid
    //         label: {               // Place the labels centered on the grid lines 
    //             offset:[0, -3], 
    //             anchorX: 'middle', 
    //             anchorY: 'top'
    //         }
    //     }
    // });


    // const tt = 1.185
    // const x = 0.0025
    // const y = -0.001
    // brd.create('image', ['/images/smith-chart.svg',
    //     [-tt + x, -tt + y], [2 * tt + x, 2 * tt + y]],
    //     {
    //         id: 'smith-chart-image',
    //         name: 'smith-chart-image',
    //         fixed: true,
    //         highlight: false,
    //         fillOpacity: 0.7,
    //         // highlightCssClass: 'opacity-50',
    //         // cssClass: 'opacity-50',
    //     });

    brd.create('point', [0, 0], { name: 'O', color: 'blue', size: 1, fixed: true })
    brd.create('point', [1, 0], { name: 'X10', color: 'blue', size: 1, fixed: true })
    brd.create('point', [0, 1], { name: 'X01', color: 'blue', size: 1, fixed: true })
    brd.create('point', [-1, 0], { name: 'X-10', color: 'blue', size: 1, fixed: true })
    brd.create('point', [0, -1], { name: 'X0-1', color: 'blue', size: 1, fixed: true })



    if (typeof window !== "undefined") {
        (window as any).board = brd
    }

    return brd
}

const SmithBoard: React.FC<ISmithBoardProps> = (props) => {
    const { setBoard, board, boxName } = useContext(SmithContext)

    const isDesktop = useMediaQuery({ minDeviceWidth: fullConfig.theme.screens.lg })
    const screenSize = useScreen()

    useEffect(() => {
        if (board) {
            JXG.JSXGraph.freeBoard(board);
        }
        const brd = initBoard(boxName, {}, screenSize)
        setBoard(brd)

        return () => { }
    },
        //eslint-disable-next-line
        [isDesktop]);

    return (
        <div
            id={boxName}
            className="jxgbox h-full w-full"
        // style={{ width: '500px', height: '500px' }}
        >

        </div>
    );
}

export default SmithBoard;