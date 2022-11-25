import JXG, { JXGOptions, PointOptions } from "jsxgraph"
import { lightTheme, darkTheme } from "./utils/themes"
import ReactDOMServer from 'react-dom/server'
import { Infobox } from "../../common/components/atoms/infobox"
import React from "react"

// default style for intercept objects
JXG.Options.intersection = JXG.merge(JXG.Options.intersection, {
    fillColor: 'gray',
    strokeColor: 'gray',
}) as PointOptions

JXG.Options.glider = JXG.merge(JXG.Options.glider, {
    fillColor: 'gray',
    strokeColor: 'gray',
}) as PointOptions

// Theme build

export const changeBoardTheme = (theme: string) => {
    // console.log(theme)
    // debugger
    if (theme == 'dark') {
        JXG.Options = JXG.merge(JXG.Options, darkTheme) as JXGOptions
    } else if (theme == 'light') {
        JXG.Options = JXG.merge(JXG.Options, lightTheme) as JXGOptions
    }
}

export interface boardOptionsProps {
    theme: string;
    digits: number;
}


export const initBoard = (boxName: string, boardOptions: boardOptionsProps, screenSize: string = 'lg') => {
    changeBoardTheme(boardOptions.theme)

    const screenBoxSizes = {
        'xs': [-1.2, 2, 1.2, -2],
        'sm': [-1, 2, 1, -2],
        'md': [-2, 2, 2, -2],
        'lg': [-2.5, 1.2, 1.5, -1.2],
    }

    const boundingbox = screenBoxSizes[screenSize]

    const brd = JXG.JSXGraph.initBoard(boxName, {
        title: 'Smith Chart canvas',
        description: 'An canvas with a smith chart, you can create points, lines, circles and other geometric contruct on top of it',
        boundingbox,
        // maxBoundingBox: [-4, 2, 4, -2], //TODO: revisr porque los eventos touch no funcionan bien con esto
        keepaspectratio: true,
        // grid: true,
        // axis: true,
        // fullscreen: { id: 'outer' },
        // showFullscreen: true,
        // showScreenshot: true,
        showCopyright: false,
        resize: { enabled: true, throttle: 200 },
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
        showInfobox: true,
        infoboxDigits: boardOptions.digits || 3,

        ...boardOptions,
    } as any);

    brd.suspendUpdate()

    JXG.Options.infobox.anchorY = 'bottom';
    JXG.Options.infobox.anchorX = 'right';
    // JXG.Options.infobox.strokeColor = 'red';

    brd.highlightInfobox = function (x, y, el) {

        const body = ReactDOMServer.renderToStaticMarkup(
            React.createElement(Infobox, { x, y })
        )
        this.infobox.setText(body);

        return this
    };
    
    (brd.infobox as any).distanceX = 0;
    (brd.infobox as any).distanceY = 10;

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


    const imgTheme = {
        'dark': '/images/smith-chart-dark.svg',
        'light': '/images/smith-chart.svg'
    }
    const tt = 1.1555
    // const x = 0.0025
    // const y = -0.001
    brd.create('image', [imgTheme[boardOptions.theme] || imgTheme.light,
    [-tt, -tt], [2 * tt, 2 * tt]],
        {
            id: 'smith-chart-image',
            name: 'smith-chart-image',
            fixed: true,
            highlight: false,
            fillOpacity: 0.7,
            inmutable: true
            // highlightCssClass: 'opacity-50',
            // cssClass: 'opacity-50',
        });

    // debugger
    brd.create('point', [0, 0], { name: 'O', color: 'blue', size: 1, fixed: true, inmutable: true })
    brd.create('point', [1, 0], { name: 'X1', color: 'blue', size: 1, fixed: true, inmutable: true })
    brd.create('point', [0, 1], { name: 'X2', color: 'blue', size: 1, fixed: true, inmutable: true })
    brd.create('point', [-1, 0], { name: 'X3', color: 'blue', size: 1, fixed: true, inmutable: true })
    brd.create('point', [0, -1], { name: 'X4', color: 'blue', size: 1, fixed: true, inmutable: true })
    brd.create('axis', [[0, 0], [1, 0]], { inmutable: true, name: 'x' })
    brd.create('axis', [[0, 0], [0, 1]], { inmutable: true, name: 'y' })

    brd.unsuspendUpdate()

    if (typeof window !== "undefined") {
        (window as any).board = brd
    }

    return brd
}