declare namespace JXG {
    export const touchProperty: string;

    export const version: version;
    export const licenseText: string;
    export const COORDS_BY_USER: string;
    export const COORDS_BY_SCREEN: JXG.CoordType;;

    // object types
    export const OBJECT_TYPE_ARC: number;
    export const OBJECT_TYPE_ARROW: number;
    export const OBJECT_TYPE_AXIS: number;
    export const OBJECT_TYPE_AXISPOINT: number;
    export const OBJECT_TYPE_TICKS: number;
    export const OBJECT_TYPE_CIRCLE: number;
    export const OBJECT_TYPE_CONIC: number;
    export const OBJECT_TYPE_CURVE: number;
    export const OBJECT_TYPE_GLIDER: number;
    export const OBJECT_TYPE_IMAGE: number;
    export const OBJECT_TYPE_LINE: number;
    export const OBJECT_TYPE_POINT: number;
    export const OBJECT_TYPE_SLIDER: number;
    export const OBJECT_TYPE_CAS: number;
    export const OBJECT_TYPE_GXTCAS: number;
    export const OBJECT_TYPE_POLYGON: number;
    export const OBJECT_TYPE_SECTOR: number;
    export const OBJECT_TYPE_TEXT: number;
    export const OBJECT_TYPE_ANGLE: number;
    export const OBJECT_TYPE_INTERSECTION: number;
    export const OBJECT_TYPE_TURTLE: number;
    export const OBJECT_TYPE_VECTOR: number;
    export const OBJECT_TYPE_OPROJECT: number;
    export const OBJECT_TYPE_GRID: number;
    export const OBJECT_TYPE_TANGENT: number;
    export const OBJECT_TYPE_HTMLSLIDER: number;
    export const OBJECT_TYPE_CHECKBOX: number;
    export const OBJECT_TYPE_INPUT: number;
    export const OBJECT_TYPE_BUTTON: number;
    export const OBJECT_TYPE_TRANSFORMATION: number;
    export const OBJECT_TYPE_FOREIGNOBJECT: number;
    export const OBJECT_TYPE_VIEW3D: number;
    export const OBJECT_TYPE_POINT3D: number;
    export const OBJECT_TYPE_LINE3D: number;
    export const OBJECT_TYPE_PLANE3D: number;
    export const OBJECT_TYPE_CURVE3D: number;
    export const OBJECT_TYPE_SURFACE3D: number;
    export const OBJECT_CLASS_POINT: number;
    export const OBJECT_CLASS_LINE: number;
    export const OBJECT_CLASS_CIRCLE: number;
    export const OBJECT_CLASS_CURVE: number;
    export const OBJECT_CLASS_AREA: number;
    export const OBJECT_CLASS_OTHER: number;
    export const OBJECT_CLASS_TEXT: number;
    export const OBJECT_CLASS_3D: number;
    export const GENTYPE_ABC: number;
    export const GENTYPE_AXIS: number;
    export const GENTYPE_MID: number;
    export const GENTYPE_MIRRORELEMENT: number;
    export const GENTYPE_REFLECTION_ON_LINE: number;
    export const GENTYPE_REFLECTION_ON_POINT: number;
    export const GENTYPE_TANGENT: number;
    export const GENTYPE_PARALLEL: number;
    export const GENTYPE_BISECTORLINES: number;
    export const GENTYPE_BOARDIMG: number;
    export const GENTYPE_BISECTOR: number;
    export const GENTYPE_NORMAL: number;
    export const GENTYPE_POINT: number;
    export const GENTYPE_GLIDER: number;
    export const GENTYPE_INTERSECTION: number;
    export const GENTYPE_CIRCLE: number;
    export const GENTYPE_CIRCLE2POINTS: number;
    export const GENTYPE_LINE: number;
    export const GENTYPE_TRIANGLE: number;
    export const GENTYPE_QUADRILATERAL: number;
    export const GENTYPE_TEXT: number;
    export const GENTYPE_POLYGON: number;
    export const GENTYPE_REGULARPOLYGON: number;
    export const GENTYPE_SECTOR: number;
    export const GENTYPE_ANGLE: number;
    export const GENTYPE_PLOT: number;
    export const GENTYPE_SLIDER: number;
    export const GENTYPE_TRUNCATE: number;
    export const GENTYPE_JCODE: number;
    export const GENTYPE_MOVEMENT: number;
    export const GENTYPE_COMBINED: number;
    export const GENTYPE_RULER: number;
    export const GENTYPE_SLOPETRIANGLE: number;
    export const GENTYPE_PERPSEGMENT: number;
    export const GENTYPE_LABELMOVEMENT: number;
    export const GENTYPE_VECTOR: number;
    export const GENTYPE_NONREFLEXANGLE: number;
    export const GENTYPE_REFLEXANGLE: number;
    export const GENTYPE_PATH: number;
    export const GENTYPE_DERIVATIVE: number;
    export const GENTYPE_DELETE: number;
    export const GENTYPE_COPY: number;
    export const GENTYPE_MIRROR: number;
    export const GENTYPE_ROTATE: number;
    export const GENTYPE_ABLATION: number;
    export const GENTYPE_MIGRATE: number;
    export const GENTYPE_VECTORCOPY: number;
    export const GENTYPE_POLYGONCOPY: number;
    export const GENTYPE_CTX_TYPE_G: number;
    export const GENTYPE_CTX_TYPE_P: number;
    export const GENTYPE_CTX_TRACE: number;
    export const GENTYPE_CTX_VISIBILITY: number;
    export const GENTYPE_CTX_CCVISIBILITY: number;
    export const GENTYPE_CTX_MPVISIBILITY: number;
    export const GENTYPE_CTX_WITHLABEL: number;
    export const GENTYPE_CTX_LABEL: number;
    export const GENTYPE_CTX_FIXED: number;
    export const GENTYPE_CTX_STROKEWIDTH: number;
    export const GENTYPE_CTX_LABELSIZE: number;
    export const GENTYPE_CTX_SIZE: number;
    export const GENTYPE_CTX_FACE: number;
    export const GENTYPE_CTX_STRAIGHT: number;
    export const GENTYPE_CTX_ARROW: number;
    export const GENTYPE_CTX_COLOR: number;
    export const GENTYPE_CTX_RADIUS: number;
    export const GENTYPE_CTX_COORDS: number;
    export const GENTYPE_CTX_TEXT: number;
    export const GENTYPE_CTX_ANGLERADIUS: number;
    export const GENTYPE_CTX_DOTVISIBILITY: number;
    export const GENTYPE_CTX_FILLOPACITY: number;
    export const GENTYPE_CTX_PLOT: number;
    export const GENTYPE_CTX_SCALE: number;
    export const GENTYPE_CTX_INTVAL: number;
    export const GENTYPE_CTX_POINT1: number;
    export const GENTYPE_CTX_POINT2: number;
    export const GENTYPE_CTX_LABELSTICKY: number;
    export const GENTYPE_CTX_TYPE_I: number;
    export const GENTYPE_CTX_HASINNERPOINTS: number;
    export const GENTYPE_CTX_SNAPWIDTH: number;
    export const GENTYPE_CTX_SNAPTOGRID: number;

    // custom
    export let OBJECT_TYPE_SMITH_POINT: number;
    export let OBJECT_TYPE_REAL_CIRCLE: number;
    export let OBJECT_TYPE_IMAGINARY_CIRCLE: number;

    // real
    export interface ReCircle extends Circle {
        originPoint: Point;
    }
    export interface ReCircleAttributes extends CircleAttributes {

    }
    export function createReCircle(board: Board, parents: unknown[], attributes: ReCircleAttributes): ReCircle

    //imag
    export interface ImCircle extends Circle {
        originPoint: Point;
    }
    export interface ImCircleAttributes extends CircleAttributes {
    }
    export function createImCircle(board: Board, parents: unknown[], attributes: ImCircleAttributes): ImCircle

    // smith point
    export interface SmithPoint extends Point {
        SX: () => number;
        SY: () => number;
    }
    export interface SmithPointAttributes extends PointAttributes {

    }
    export function createSmithPoint(board: Board, parents: unknown[], attributes: SmithPointAttributes): SmithPoint
    export function createPoint(board: Board, parents: unknown[], attributes: PointAttributes): Point

    export interface JXGOptions {
        recircle: CircleOptions | GeometryElementAttributes;
        imcircle: CircleOptions | GeometryElementAttributes;
        spoint: PointOptions | GeometryElementAttributes;
    }

    export let Options: JXGOptions;
}