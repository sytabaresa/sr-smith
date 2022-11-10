declare namespace JXG {
    export const touchProperty: string;

    export const version: version;
    export const licenseText: string;
    export const COORDS_BY_USER: string;
    export const COORDS_BY_SCREEN: string;

    // object types
    export const OBJECT_TYPE_ARC: string;
    export const OBJECT_TYPE_ARROW: string;
    export const OBJECT_TYPE_AXIS: string;
    export const OBJECT_TYPE_AXISPOINT: string;
    export const OBJECT_TYPE_TICKS: string;
    export const OBJECT_TYPE_CIRCLE: string;
    export const OBJECT_TYPE_CONIC: string;
    export const OBJECT_TYPE_CURVE: string;
    export const OBJECT_TYPE_GLIDER: string;
    export const OBJECT_TYPE_IMAGE: string;
    export const OBJECT_TYPE_LINE: string;
    export const OBJECT_TYPE_POINT: string;
    export const OBJECT_TYPE_SLIDER: string;
    export const OBJECT_TYPE_CAS: string;
    export const OBJECT_TYPE_GXTCAS: string;
    export const OBJECT_TYPE_POLYGON: string;
    export const OBJECT_TYPE_SECTOR: string;
    export const OBJECT_TYPE_TEXT: string;
    export const OBJECT_TYPE_ANGLE: string;
    export const OBJECT_TYPE_INTERSECTION: string;
    export const OBJECT_TYPE_TURTLE: string;
    export const OBJECT_TYPE_VECTOR: string;
    export const OBJECT_TYPE_OPROJECT: string;
    export const OBJECT_TYPE_GRID: string;
    export const OBJECT_TYPE_TANGENT: string;
    export const OBJECT_TYPE_HTMLSLIDER: string;
    export const OBJECT_TYPE_CHECKBOX: string;
    export const OBJECT_TYPE_INPUT: string;
    export const OBJECT_TYPE_BUTTON: string;
    export const OBJECT_TYPE_TRANSFORMATION: string;
    export const OBJECT_TYPE_FOREIGNOBJECT: string;
    export const OBJECT_TYPE_VIEW3D: string;
    export const OBJECT_TYPE_POINT3D: string;
    export const OBJECT_TYPE_LINE3D: string;
    export const OBJECT_TYPE_PLANE3D: string;
    export const OBJECT_TYPE_CURVE3D: string;
    export const OBJECT_TYPE_SURFACE3D: string;
    export const OBJECT_CLASS_POINT: string;
    export const OBJECT_CLASS_LINE: string;
    export const OBJECT_CLASS_CIRCLE: string;
    export const OBJECT_CLASS_CURVE: string;
    export const OBJECT_CLASS_AREA: string;
    export const OBJECT_CLASS_OTHER: string;
    export const OBJECT_CLASS_TEXT: string;
    export const OBJECT_CLASS_3D: string;
    export const GENTYPE_ABC: string;
    export const GENTYPE_AXIS: string;
    export const GENTYPE_MID: string;
    export const GENTYPE_MIRRORELEMENT: string;
    export const GENTYPE_REFLECTION_ON_LINE: string;
    export const GENTYPE_REFLECTION_ON_POINT: string;
    export const GENTYPE_TANGENT: string;
    export const GENTYPE_PARALLEL: string;
    export const GENTYPE_BISECTORLINES: string;
    export const GENTYPE_BOARDIMG: string;
    export const GENTYPE_BISECTOR: string;
    export const GENTYPE_NORMAL: string;
    export const GENTYPE_POINT: string;
    export const GENTYPE_GLIDER: string;
    export const GENTYPE_INTERSECTION: string;
    export const GENTYPE_CIRCLE: string;
    export const GENTYPE_CIRCLE2POINTS: string;
    export const GENTYPE_LINE: string;
    export const GENTYPE_TRIANGLE: string;
    export const GENTYPE_QUADRILATERAL: string;
    export const GENTYPE_TEXT: string;
    export const GENTYPE_POLYGON: string;
    export const GENTYPE_REGULARPOLYGON: string;
    export const GENTYPE_SECTOR: string;
    export const GENTYPE_ANGLE: string;
    export const GENTYPE_PLOT: string;
    export const GENTYPE_SLIDER: string;
    export const GENTYPE_TRUNCATE: string;
    export const GENTYPE_JCODE: string;
    export const GENTYPE_MOVEMENT: string;
    export const GENTYPE_COMBINED: string;
    export const GENTYPE_RULER: string;
    export const GENTYPE_SLOPETRIANGLE: string;
    export const GENTYPE_PERPSEGMENT: string;
    export const GENTYPE_LABELMOVEMENT: string;
    export const GENTYPE_VECTOR: string;
    export const GENTYPE_NONREFLEXANGLE: string;
    export const GENTYPE_REFLEXANGLE: string;
    export const GENTYPE_PATH: string;
    export const GENTYPE_DERIVATIVE: string;
    export const GENTYPE_DELETE: string;
    export const GENTYPE_COPY: string;
    export const GENTYPE_MIRROR: string;
    export const GENTYPE_ROTATE: string;
    export const GENTYPE_ABLATION: string;
    export const GENTYPE_MIGRATE: string;
    export const GENTYPE_VECTORCOPY: string;
    export const GENTYPE_POLYGONCOPY: string;
    export const GENTYPE_CTX_TYPE_G: string;
    export const GENTYPE_CTX_TYPE_P: string;
    export const GENTYPE_CTX_TRACE: string;
    export const GENTYPE_CTX_VISIBILITY: string;
    export const GENTYPE_CTX_CCVISIBILITY: string;
    export const GENTYPE_CTX_MPVISIBILITY: string;
    export const GENTYPE_CTX_WITHLABEL: string;
    export const GENTYPE_CTX_LABEL: string;
    export const GENTYPE_CTX_FIXED: string;
    export const GENTYPE_CTX_STROKEWIDTH: string;
    export const GENTYPE_CTX_LABELSIZE: string;
    export const GENTYPE_CTX_SIZE: string;
    export const GENTYPE_CTX_FACE: string;
    export const GENTYPE_CTX_STRAIGHT: string;
    export const GENTYPE_CTX_ARROW: string;
    export const GENTYPE_CTX_COLOR: string;
    export const GENTYPE_CTX_RADIUS: string;
    export const GENTYPE_CTX_COORDS: string;
    export const GENTYPE_CTX_TEXT: string;
    export const GENTYPE_CTX_ANGLERADIUS: string;
    export const GENTYPE_CTX_DOTVISIBILITY: string;
    export const GENTYPE_CTX_FILLOPACITY: string;
    export const GENTYPE_CTX_PLOT: string;
    export const GENTYPE_CTX_SCALE: string;
    export const GENTYPE_CTX_INTVAL: string;
    export const GENTYPE_CTX_POINT1: string;
    export const GENTYPE_CTX_POINT2: string;
    export const GENTYPE_CTX_LABELSTICKY: string;
    export const GENTYPE_CTX_TYPE_I: string;
    export const GENTYPE_CTX_HASINNERPOINTS: string;
    export const GENTYPE_CTX_SNAPWIDTH: string;
    export const GENTYPE_CTX_SNAPTOGRID: string;

    export interface ReCircle extends Circle {

    }
    export interface ReCircleAttributes extends GeometryElementAttributes {

    }
    export function createReCircle(board: Board, parents: unknown[], attributes: ReCircleAttributes): ReCircle
    export interface ImCircle extends Circle {

    }
    export interface ImCircleAttributes extends GeometryElementAttributes {

    }
    export function createImCircle(board: Board, parents: unknown[], attributes: ImCircleAttributes): ImCircle

}