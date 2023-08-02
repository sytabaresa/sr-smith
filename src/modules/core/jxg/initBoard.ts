import { GeometryElement, JXGOptions, PointOptions } from "jsxgraph"
import JXG from "jsxgraph"
import { lightTheme, darkTheme } from "@core/utils/themes"
import { infoboxAtom } from "@core/atoms/smith";
import { Getter, Setter } from "jotai";
import { getMouseCoords } from "@core/utils/board";
import { addComplexSupport } from "./complex";
import { BoardConfigOptions } from "@localtypes/smith";

// default style for intercept objects
JXG.Options.intersection = JXG.merge(JXG.Options.intersection, {
    fillColor: 'gray',
    strokeColor: 'gray',
}) as PointOptions

JXG.Options.glider = JXG.merge(JXG.Options.glider, {
    fillColor: 'gray',
    strokeColor: 'gray',
}) as PointOptions

// other styles
JXG.Options.infobox.anchorY = 'bottom';
JXG.Options.infobox.anchorX = 'right';

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

export const initBoard = (options: BoardConfigOptions) => {
    // console.log(options)
    changeBoardTheme(options?.theme || 'light')

    const screenBoxSizes = {
        'xs': [-1.2, 2, 1.2, -2],
        'sm': [-1, 2, 1, -2],
        'md': [-2, 2, 2, -2],
        'lg': [-2.5, 1.2, 1.5, -1.2],
    }

    const boundingbox = typeof options.screen == 'string' ?
        screenBoxSizes[options.screen == 'unknown' ? 'xs' : options.screen] || screenBoxSizes['lg'] :
        options.screen

    let brd = JXG.JSXGraph.initBoard(options.name, {
        title: options.translations.title ?? 'Smith Chart canvas',
        description: options.translations.desc ?? 'An canvas with a smith chart',
        boundingbox,
        keepaspectratio: true,
        // grid: true,
        // axis: true,
        // fullscreen: { id: 'outer' },
        // showFullscreen: true,
        // showScreenshot: true,
        showCopyright: false,
        // showNavigation: false,
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
        infoboxDigits: options?.digits || 3,

        ...options,
    } as any);

    brd.suspendUpdate();

    // complex op support
    brd = addComplexSupport(brd)

    // JXG.Options.infobox.strokeColor = 'red';


    brd.infobox.visProp.distancex = options.infobox?.x ?? 0
    brd.infobox.visProp.distancey = options.infobox?.y ?? 0


    // taken for the original funtion, but modified
    brd.updateInfobox = function (el: GeometryElement & { infoboxText: string }) {
        var x, y, xc, yc,
            vpinfoboxdigits,
            distX, distY,
            vpsi = JXG.evaluate(el.visProp.showinfobox);
        if ((!JXG.evaluate(this.attr.showinfobox) && vpsi === "inherit") || !vpsi) {
            return this;
        }
        if (JXG.isPoint(el)) {
            xc = el.coords.usrCoords[1];
            yc = el.coords.usrCoords[2];
            distX = JXG.evaluate(this.infobox.visProp.distancex);
            distY = JXG.evaluate(this.infobox.visProp.distancey);
            vpinfoboxdigits = JXG.evaluate(el.visProp.infoboxdigits);
            this.infobox.setCoords(
                xc + distX / this.unitX,
                yc + distY / this.unitY
            );

            if (typeof el.infoboxText !== "string") {
                if (vpinfoboxdigits === "auto") {
                    x = JXG.autoDigits(xc);
                    y = JXG.autoDigits(yc);
                } else if (JXG.isNumber(vpinfoboxdigits)) {
                    x = JXG.toFixed(xc, vpinfoboxdigits);
                    y = JXG.toFixed(yc, vpinfoboxdigits);
                } else {
                    x = xc;
                    y = yc;
                }
                this.highlightInfobox(x, y, el);
            } else {
                this.highlightCustomInfobox(el.infoboxText, el);
            }
            this.displayInfobox(true);
        } else {
            const coords = this.getUsrCoordsOfMouse()
            xc = coords[0];
            yc = coords[1];
            distX = JXG.evaluate(this.infobox.visProp.distancex);
            distY = JXG.evaluate(this.infobox.visProp.distancey);
            this.infobox.setCoords(
                xc + distX / this.unitX,
                yc + distY / this.unitY
            );
            this.highlightInfobox(xc, yc, el)
            this.displayInfobox(true);
        }
        return this;
    }

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
    brd.create('image', [imgTheme[options?.theme] || imgTheme.light,
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
    brd.create('point', [0, 0], { name: 'po', color: 'blue', size: 1, fixed: true, inmutable: true })
    brd.create('point', [1, 0], { name: 'px1', color: 'blue', size: 1, fixed: true, inmutable: true })
    brd.create('point', [0, 1], { name: 'px2', color: 'blue', size: 1, fixed: true, inmutable: true })
    brd.create('point', [-1, 0], { name: 'px3', color: 'blue', size: 1, fixed: true, inmutable: true })
    brd.create('point', [0, -1], { name: 'px4', color: 'blue', size: 1, fixed: true, inmutable: true })
    brd.create('axis', [[0, 0], [1, 0]], { showinfobox: false, inmutable: true, name: 'ax_x' })
    brd.create('axis', [[0, 0], [0, 1]], { showinfobox: false, inmutable: true, name: 'ax_y' })

    brd.unsuspendUpdate()

    if (typeof window !== "undefined") {
        (window as any).board = brd
    }

    return brd
}