import JXG from "jsxgraph/distrib/jsxgraphcore"
import "jsxgraph/distrib/jsxgraph.css"

import { useContext, useEffect } from "react";
import { SmithContext } from "./context";
import { brotliDecompress } from "zlib";

export interface ISmithBoardProps { };

export const initBoard = (boxName: string, boardOptions: any = {}) => {
    const brd = JXG.JSXGraph.initBoard(boxName, {
        boundingbox: [-2.5, 1.2, 2.5, -1.2],
        maxBoundingBox: [-4, 2, 4, -2],
        keepaspectratio: true,
        grid: true,
        axis: true,
        showFullscreen: true,
        showCopyRight: false,
        showScreenshot: true,
        pan: {
            enabled: true,
            needShift: false, // mouse panning needs pressing of the shift key
            needTwoFingers: true, // panning is done with two fingers on touch devices
        },
        zoom: {
            wheel: true,
            needShift: false,
            pinchSensitivity: 5,
            // max: 1000.0,
            // min: 0.8,
        },
        ...boardOptions,
    });

    const tt = 1.185
    const x = 0.0025
    const y = -0.001
    brd.create('image', ['/images/smith-chart.svg',
        [-tt + x, -tt + y], [2 * tt + x, 2 * tt + y]],
        {
            id: 'smith-chart-image',
            name: 'smith-chart-image',
            fixed: true,
            highlight: false,
            fillOpacity: 0.7,
            // highlightCssClass: 'opacity-50',
            // cssClass: 'opacity-50',
        });

    if (typeof window !== "undefined") {
        (window as any).board = brd
    }

    return brd
}

const SmithBoard: React.FC<ISmithBoardProps> = (props) => {
    const { setBoard, boxName } = useContext(SmithContext)

    useEffect(() => {
        const brd = initBoard(boxName)
        setBoard(brd)

        return () => { }
    },
        //eslint-disable-next-line
        []);

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