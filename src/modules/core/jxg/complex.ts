import { Board } from "jsxgraph";
import JXG from "jsxgraph"
import "@core/elements/complex"

// only for compat
const Interval = JXG.Math.IntervalArithmetic
const Type = JXG

function conj(board, parents, attributes) {
    if (parents.length == 1 && JXG.isObject(parents[0]) && parents[0].isComplex) {
        const c = parents[0]
        return JXG.C.conj(c)
    } else {
        throw ("Can't conjugate number'")
    }
}

export const addComplexSupport = (brd: Board) => {
    
    brd.jc.add = ops.add
    brd.jc.sub = ops.sub
    brd.jc.neg = ops.neg
    brd.jc.mul = ops.mul
    brd.jc.div = ops.div
    
    JXG.registerElement('conj', conj);

    return brd
}

function isComplex(a) {
    return Type.isObject(a) && a.isComplex
}

function isReOrComplex(a) {
    return Type.isNumber(a) || isComplex(a)
}

const ops = {
    /**
  * + operator implementation
  * @param {Number|Array|JXG.Point} a
  * @param {Number|Array|JXG.Point} b
  * @returns {Number|Array}
  */
    add: function (a, b) {
        var i, len, res;

        a = Type.evalSlider(a);
        b = Type.evalSlider(b);

        if (Interval.isInterval(a) || Interval.isInterval(b)) {
            res = Interval.add(a, b);
        } else if (Type.isArray(a) && Type.isArray(b)) {
            len = Math.min(a.length, b.length);
            res = [];

            for (i = 0; i < len; i++) {
                res[i] = a[i] + b[i];
            }
        } else if (Type.isNumber(a) && Type.isNumber(b)) {
            res = a + b;
        } else if (isReOrComplex(a) && isReOrComplex(b)) {
            res = (new JXG.Complex(a)).add(b)
        } else if (Type.isString(a) || Type.isString(b)) {
            res = a.toString() + b.toString();
        } else {
            this._error('Operation + not defined on operands ' + typeof a + ' and ' + typeof b);
        }

        return res;
    },

    /**
   * - operator implementation
   * @param {Number|Array|JXG.Point} a
   * @param {Number|Array|JXG.Point} b
   * @returns {Number|Array}
   */
    sub: function (a, b) {
        var i, len, res;

        a = Type.evalSlider(a);
        b = Type.evalSlider(b);

        if (Interval.isInterval(a) || Interval.isInterval(b)) {
            res = Interval.sub(a, b);
        } else if (Type.isArray(a) && Type.isArray(b)) {
            len = Math.min(a.length, b.length);
            res = [];

            for (i = 0; i < len; i++) {
                res[i] = a[i] - b[i];
            }
        } else if (Type.isNumber(a) && Type.isNumber(b)) {
            res = a - b;
        } else if (isReOrComplex(a) && isReOrComplex(b)) {
            res = (new JXG.Complex(a)).sub(b)
        } else {
            this._error('Operation - not defined on operands ' + typeof a + ' and ' + typeof b);
        }

        return res;
    },


    /**
     * unary - operator implementation
     * @param {Number|Array|JXG.Point} a
     * @returns {Number|Array}
     */
    neg: function (a) {
        var i, len, res;

        a = Type.evalSlider(a);

        if (Interval.isInterval(a)) {
            res = Interval.negative(a);
        } else if (Type.isArray(a)) {
            len = a.length;
            res = [];

            for (i = 0; i < len; i++) {
                res[i] = -a[i];
            }
        } else if (Type.isNumber(a)) {
            res = -a;
        } else if (isComplex(a)) {
            res = (new JXG.Complex(-a.real, -a.imaginary));
        } else {
            this._error('Unary operation - not defined on operand ' + typeof a);
        }

        return res;
    },

    /**
     * Multiplication of vectors and numbers
     * @param {Number|Array} a
     * @param {Number|Array} b
     * @returns {Number|Array} (Inner) product of the given input values.
     */
    mul: function (a, b) {
        var i, len, res;

        a = Type.evalSlider(a);
        b = Type.evalSlider(b);

        if (Type.isArray(a) && Type.isNumber(b)) {
            // swap b and a
            i = a;
            a = b;
            b = a;
        }

        if (Interval.isInterval(a) || Interval.isInterval(b)) {
            res = Interval.mul(a, b);
        } else if (Type.isArray(a) && Type.isArray(b)) {
            len = Math.min(a.length, b.length);
            res = Mat.innerProduct(a, b, len);
        } else if (Type.isNumber(a) && Type.isArray(b)) {
            len = b.length;
            res = [];

            for (i = 0; i < len; i++) {
                res[i] = a * b[i];
            }
        } else if (Type.isNumber(a) && Type.isNumber(b)) {
            res = a * b;
        } else if (isReOrComplex(a) && isReOrComplex(b)) {
            res = (new JXG.Complex(a)).mult(b)
        } else {
            this._error('Operation * not defined on operands ' + typeof a + ' and ' + typeof b);
        }

        return res;
    },

    /**
     * Implementation of the / operator.
     * @param {Number|Array} a
     * @param {Number} b
     * @returns {Number|Array}
     */
    div: function (a, b) {
        var i, len, res;

        a = Type.evalSlider(a);
        b = Type.evalSlider(b);

        if (Interval.isInterval(a) || Interval.isInterval(b)) {
            res = Interval.div(a, b);
        } else if (Type.isArray(a) && Type.isNumber(b)) {
            len = a.length;
            res = [];

            for (i = 0; i < len; i++) {
                res[i] = a[i] / b;
            }
        } else if (Type.isNumber(a) && Type.isNumber(b)) {
            res = a / b;
        } else if (isReOrComplex(a) && isReOrComplex(b)) {
            res = (new JXG.Complex(a)).div(b)
        } else {
            this._error('Operation * not defined on operands ' + typeof a + ' and ' + typeof b);
        }

        return res;
    },
}