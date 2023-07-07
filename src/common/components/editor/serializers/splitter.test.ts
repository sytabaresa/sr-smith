import { describe, it, expect } from "vitest";
import { splitLines } from "./splitter";

describe("split lines", (ops) => {
    it('return empty array with empty string', () => {
        expect(splitLines('')).toStrictEqual([[], true])
    })

    it('return empty statement on a single break', () => {
        expect(splitLines('\n')).toStrictEqual([['\n'], true])
    })

    it('return break on double break', () => {
        expect(splitLines('\n\n')).toStrictEqual([['\n\n'], true])
    })

    it('return valid statement', () => {
        const code = `a = 1;`
        expect(splitLines(code)).toStrictEqual([['a = 1;'], true])
    })

    it('return valid statement (1 break)', () => {
        const code = `a = 1;\n`
        expect(splitLines(code)).toStrictEqual([['a = 1;', ''], true])
    })

    it('return valid statement (2 breaks)', () => {
        const code = `a = 1;\n\n`
        expect(splitLines(code)).toStrictEqual([['a = 1;', '\n'], true])
    })

    it('return invalid statement', () => {
        const code = `a = 1`
        expect(splitLines(code)).toStrictEqual([['a = 1'], false])
    })

    it('return invalid statement (1 break)', () => {
        const code = `a = 1\n`
        expect(splitLines(code)).toStrictEqual([['a = 1\n'], false])
    })

    it('return invalid statement (2 breaks)', () => {
        const code = `a = 1\n\n`
        expect(splitLines(code)).toStrictEqual([['a = 1\n\n'], false])
    })


    it('split two statements', () => {
        const code = `a = 1;b = 2;`
        expect(splitLines(code)).toStrictEqual([['a = 1;', 'b = 2;'], true])
    })

    it('split two statements, pre spaces', () => {
        const code = `\n\n\na = 1;`
        expect(splitLines(code)).toStrictEqual([['\n\n', 'a = 1;'], true])
    })


    it('split two statements with line break', () => {
        const code = `a = 1;\nb = 2;`
        expect(splitLines(code)).toStrictEqual([['a = 1;', 'b = 2;'], true])
    })

    it('aggregate spaces between statements', () => {
        const code = `a = 1;\n\nb = 2;`
        expect(splitLines(code)).toStrictEqual([['a = 1;', '', 'b = 2;'], true])
    })

    it('aggregate spaces between statements 2', () => {
        const code = `a = 1;\n\n\n\nb = 2;`
        expect(splitLines(code)).toStrictEqual([['a = 1;', '\n\n', 'b = 2;'], true])
    })

    it('aggregate spaces between statements 2', () => {
        const code = `\n\na = 1;\nb = 2;`
        expect(splitLines(code)).toStrictEqual([['\n', 'a = 1;', 'b = 2;'], true])
    })

    it('split one statements, but left incomplete a bad statement', () => {
        const code = `a = 1;b = 2`
        expect(splitLines(code)).toStrictEqual([['a = 1;', 'b = 2'], false])
    })

    it('split 3 statements', () => {
        const code = `a = 1;b = 2;\npoint(2,3);`
        expect(splitLines(code)).toStrictEqual([['a = 1;', 'b = 2;', 'point(2,3);'], true])
    })

    it('split 2 statements (with invalid inner statement)', () => {
        const code = `a = 1;b = 2\npoint(2,3);`
        expect(splitLines(code)).toStrictEqual([['a = 1;', 'b = 2\npoint(2,3);'], true])
    })

    it('add aditional lines in statement', () => {
        const code = `a\nb\nc\nd;`
        expect(splitLines(code)).toStrictEqual([['a\nb\nc\nd;'], true])
    })

    it('add aditional lines in a bad statement', () => {
        const code = `a\nb\nc\nd`
        expect(splitLines(code)).toStrictEqual([['a\nb\nc\nd'], false])
    })

    it('treat comments as blocks', () => {
        const code = `/* 
ejemplo de sintaxis
ver: https://syta.co/
*/

`
        expect(splitLines(code)).toStrictEqual([['/* \nejemplo de sintaxis\nver: https://syta.co/\n*/\n\n'], true])
    })

    it('treat comments as blocks with next statement', () => {
        const code = `/* 
ejemplo de sintaxis
ver: https://syta.co/
*/

t = 1;`
        expect(splitLines(code)).toStrictEqual([['/* \nejemplo de sintaxis\nver: https://syta.co/\n*/\n', 't = 1;'], true])
    })

    it('split end block comment', () => {
        const code = `/**
* My smith design
**/Zo = 50;`
        expect(splitLines(code)).toStrictEqual([['/**\n* My smith design\n**/', 'Zo = 50;'], true])
    })

    it('add aditional lines in comment (pre and post)', () => {
        const code = `\n\n// comment`
        expect(splitLines(code)).toStrictEqual([['\n\n// comment'], true])
    })

    it('add aditional lines in comment (pre and post) 2', () => {
        const code = `\n\n// comment\n\n`
        expect(splitLines(code)).toStrictEqual([['\n\n// comment\n\n'], true])
    })

    it('add aditional lines in comment (pre and post) and split another statement', () => {
        const code = `\n\n// comment\na=2;`
        expect(splitLines(code)).toStrictEqual([['\n\n// comment', 'a=2;'], true])
    })

    it('add aditional lines in comment (pre and post) and split another statement 2', () => {
        const code = `\n\n// comment\n\na=2;`
        expect(splitLines(code)).toStrictEqual([['\n\n// comment\n', 'a=2;'], true])
    })

    it('split statement, add aditional lines in comment (pre and post) and split another statement', () => {
        const code = `b = 3;\n\n// comment\n\na=2;`
        expect(splitLines(code)).toStrictEqual([['b = 3;', '\n// comment\n', 'a=2;'], true])
    })

    it('validate statement with clossing braces', () => {
        const code = `a = 1 <<a:2>>;`
        expect(splitLines(code)).toStrictEqual([['a = 1 <<a:2>>;'], true])
    })

    it('validate statement with clossing braces (bad statement)', () => {
        const code = `a = 1 <<a:2>>`
        expect(splitLines(code)).toStrictEqual([['a = 1 <<a:2>>'], false])
    })

    it('left incomplete a statement without clossing brace', () => {
        const code = `a = 1 <<a:2;`
        expect(splitLines(code)).toStrictEqual([['a = 1 <<a:2;'], false])
    })

    it('left incomplete a statement without clossing brace 2', () => {
        const code = `a = 1 <<a:2`
        expect(splitLines(code)).toStrictEqual([['a = 1 <<a:2'], false])
    })

    it('left incomplete a statement without clossing brace 3', () => {
        const code = `a = 1 <<a:2\nb=2;`
        expect(splitLines(code)).toStrictEqual([['a = 1 <<a:2\nb=2;'], false])
    })

    it('complete statement with clossing brace multiline (possibly bad inner)', () => {
        const code = `a = 1 <<a:2\nb=2>>;c=3;`
        expect(splitLines(code)).toStrictEqual([['a = 1 <<a:2\nb=2>>;', 'c=3;'], true])
    })

    it('not take care of string braces', () => {
        const code = `point(3,4) << text: '>>' >>;`
        expect(splitLines(code)).toStrictEqual([[`point(3,4) << text: '>>' >>;`], true])
    })

    it('not take care of string braces (bad statement)', () => {
        const code = `point(3,4) << text: '>>';`
        expect(splitLines(code)).toStrictEqual([[`point(3,4) << text: '>>';`], false])
    })

    it('function', () => {
        const code = `f = function(a, b, c) {
    return a + b + c;
};`
        expect(splitLines(code)).toStrictEqual([[`f = function(a, b, c) {
    return a + b + c;
};`], true])
    })

    it('incomplete function', () => {
        const code = `f = function(a, b, c) {
    return a + b + c;
;`
        expect(splitLines(code)).toStrictEqual([[`f = function(a, b, c) {
    return a + b + c;
;`], false])
    })

    it('more bracelet function', () => {
        const code = `f = function(a, b, c) {{
    return a + b + c;
};`
        expect(splitLines(code)).toStrictEqual([[`f = function(a, b, c) {{
    return a + b + c;
};`], false])
    })

    it('more bracelet function 2', () => {
        const code = `f = function(a, b, c) {
    return a + b + c;
}};`
        expect(splitLines(code)).toStrictEqual([[`f = function(a, b, c) {
    return a + b + c;
}};`], true])
    })

    it('more bracelet function 2, split other statement', () => {
        const code = `f = function(a, b, c) {
    return a + b + c;
}};
f = 2;`
        expect(splitLines(code)).toStrictEqual([[`f = function(a, b, c) {
    return a + b + c;
}};`, 'f = 2;'], true])
    })

    it('complete statement with clossing brace multiline (more lines)', () => {
        const code = `obj = <<
property: 'string',
prop: ln(42),
a: LN2,
method: function(x) {
    return x * x;
} >>;
b = 2;`
        expect(splitLines(code)).toStrictEqual([[`obj = <<
property: 'string',
prop: ln(42),
a: LN2,
method: function(x) {
    return x * x;
} >>;`, 'b = 2;'], true])
    })

    it('complete statement with clossing brace multiline 2', () => {
        const code = `f = function(a, b, c) {
    return a + b + c;
};
K = spoint(0.077, 0.308);`
        expect(splitLines(code)).toStrictEqual([[
            `f = function(a, b, c) {
    return a + b + c;
};`,
            `K = spoint(0.077, 0.308);`], true])
    })


})
