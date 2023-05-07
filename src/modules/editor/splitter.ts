const states = {
    init: 0,
    lcomment: 1,
    comment: 2,
    string: 3,
    preEnd: 4,
    end: 5,
    preComment: 6,
    text: 7,
}
type valueof<T> = T[keyof T]

export function splitLines(str: string): [string[], boolean] {
    let tokens = []
    let f = 0
    let c1 = 0, c2 = 0
    let state: valueof<typeof states> = states.init
    let i = 0
    for (i = 0; i < str.length; i++) {
        // console.log(str[i], state, c1, c2)
        switch (state) {
            case states.init:
                if (str[i] == '\n' && c1 == 0 && c2 == 0) {
                    state = states.preComment
                    continue
                } else {
                    state = states.text
                    i--
                    continue
                }
                break;
            case states.text:
                if ('\'"'.includes(str[i]) && str[i - 1] != '\\') {
                    state = states.string
                    continue
                }
                if (str[i] == '/' && str[i + 1] == '*') {
                    state = states.lcomment
                    i++
                    continue
                }
                if (str[i] == '/' && str[i + 1] == '/') {
                    state = states.comment
                    i++
                    continue
                }
                if (str[i] == '{') {
                    c1++
                    continue
                }
                if (c1 && str[i] == '}') {
                    c1--
                    continue
                }
                if (str[i] == '<' && str[i + 1] == '<') {
                    c2++
                    i++
                    continue
                }
                if (c2 && str[i] == '>' && str[i + 1] == '>') {
                    c2--
                    i++
                    continue
                }
                if (str[i] == ';' && c1 <= 0 && c2 <= 0) {
                    state = states.end
                    i--
                    continue
                }
                break
            case states.preComment:
                if (str[i] == '/' && str[i + 1] == '*') {
                    state = states.lcomment
                    i++
                    continue
                }
                if (str[i] == '/' && str[i + 1] == '/') {
                    state = states.comment
                    i++
                    continue
                }
                if (str[i] != '\n') {
                    state = states.preEnd
                    i--
                    continue
                }
                break
            case states.lcomment:
                if (str[i] == '*' && str[i + 1] == '/') {
                    state = states.preEnd
                    i++
                    continue
                }
                break
            case states.comment:
                if (str[i] == '\n') {
                    state = states.preEnd
                    continue
                }
                break
            case states.string:
                if ('\'"'.includes(str[i]) && str[i - 1] != '\\') {
                    state = states.init
                    continue
                }
                break;
            case states.preEnd:
                if (str[i] != '\n') {
                    state = states.end
                    i -= 3
                    continue
                }
                break
            case states.end:
                i++
                tokens.push(str.slice(f, i))
                f = str[i] == '\n' ? i + 1 : i
                state = states.init
                break
            default:
                console.log('error')
        }
    }
    const rest = str.slice(f, i + 1)
    if (rest != '') {
        tokens.push(rest)
        return [tokens, false]
    }

    return [tokens, true]
}

// let code = ''
// code = `
// /* 
// ejemplo de sintaxis
// ver: https://syta.co/Follow link (ctrl+click)

// */


// A = spoint(2, 1.653) << strokeColor: "$ red", face: "[]", size: 7, fillColor: '$ black'>> ;
// k_a = circle(po, A);
// a = line(po, A) << strokeColor: '$ blue', color: '$ red' >> ;
// a.strokeColor = '$ green';
// B = intersection(k_a, a, 1);
// k_a = imcircle(A);
// k_b = recircle(A) << strokecolor: '$ #FF0' >> ;
// k_a = circle(B, 0.3);
// E = intersection(k_a, k_b, 1);
// F = spoint(0.074, -0.469);
// H = point(-0.485, 3);
// b = point(1, 2);
// point(2, 1);
// G = spoint(0.023, PI / 3);
// k_a = imcirclead(G) << strokecolor: '$ green' >> ;
// k_b = recirclead(G);
// foo = 1;
// DD = point(1, 1);
// DD.strokeColor = '$ #123456';
// DD.size = 10;
// DD.face = '[]';
// DD.label.strokecolor = '$ red';
// point(2, 2) << id: 'foo', name: 'bar' >>;
// $('foo').strokeColor = '$ #654321';
// point(-1, 2) << id: 'foo2', name: 'bar2' >>;
// foo2.strokeColor = '$ #f00f00';
// point(PI, -2) << id: 'foo3', name: 'bar3' >>;
// bar3.strokeColor = '$ #541541';
// obj = <<
//   property: 'string',
//   prop: ln(42),
//   a: LN2,
//   method: function(x) {
//       return x * x;
//   } >> ;
// sixteen = obj.method(4);
// f = function(a, b, c) {
//   return a + b + c;
// };
// K = spoint(0.077, 0.308);




// // comment

// true;
// false;
// False ? 1 : 2;

// M = spoint(-0.158, 0.306);
// L = spoint(-0.148, 0.545);
// N = spoint(0.096, 0.708);`

// // code = `obj = <<
// //   property: 'string',
// //   prop: ln(42),
// //   a: LN2,
// //   method: function(x) {
// //       return x * x;
// //   } >> ;`
// code = `a
// b
// c
// d
// e;`
// code = `a=1;obj = <<`
// console.log(splitLines(code))