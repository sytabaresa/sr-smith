import JXG from "jsxgraph"

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
        grid: true,
        axis: true,
        showFullscreen: true,
        showCopyRight: false,
        showScreenshot: true,
        resize: {enabled: true, throttle: 200},
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