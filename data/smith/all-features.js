/**
 * All Features Example
 * @author: Sebastian Tabares (me@syta.co)
 * @webpage: https://syta.co/
 * @version: 1.0
 **/

A = spoint(2, 1.653) << strokeColor: "red", face: "[]", size: 7, fillColor: 'black' >> ;
k_a = circle(po, A);
a = line(po, A) << strokeColor: 'blue', color: 'red' >> ;
a.strokeColor = 'green';
B = intersection(k_a, a, 1);
k_a = imcircle(A);
k_b = recircle(A) << strokecolor: '#FF0' >> ;
k_a = circle(B, 0.3);
E = intersection(k_a, k_b, 1);
F = spoint(0.074, -0.469);
H = point(-0.485, 3);
b = point(1, 2);
point(2, 1);
G = spoint(0.023, PI / 3);
k_a = imcirclead(G) << strokecolor: 'green' >> ;
k_b = recirclead(G);
foo = 1;
DD = point(1, 1);
DD.strokeColor = '#123456';
DD.size = 10;
DD.face = '[]';
DD.label.strokecolor = 'red';
point(2, 2) << id: 'foo', name: 'bar' >> ;
$('foo').strokeColor = '#654321';
point(-1, 2) << id: 'foo2', name: 'bar2' >> ;
foo2.strokeColor = '#f00f00';
point(PI, -2) << id: 'foo3', name: 'bar3' >> ;
bar3.strokeColor = '#541541';
obj = <<
    property: 'string',
    prop: ln(42),
    a: LN2,
    method: function(x) {
        return x * x;
    } >> ;
sixteen = obj.method(4);
f = function(a, b, c) {
    return a + b + c;
};
K = spoint(0.077, 0.308);


// comment
true;
false;
False ? 1 : 2;

/*
errors: {
    "message": "Could not verify JWT: JWTExpired"
}
*/

// Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImM4MjNkMWE0MTg5ZjI3NThjYWI4NDQ4ZmQ0MTIwN2ViZGZhMjVlMzkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3Itc21pdGgiLCJhdWQiOiJzci1zbWl0aCIsImF1dGhfdGltZSI6MTY4MTE1NjY0MywidXNlcl9pZCI6Ilc5S2FyQzVTSEJPNnN3N2VyZ0pJSmdVY0x5NDMiLCJzdWIiOiJXOUthckM1U0hCTzZzdzdlcmdKSUpnVWNMeTQzIiwiaWF0IjoxNjgxMTY0NTUxLCJleHAiOjE2ODExNjgxNTEsImVtYWlsIjoibWVAc3l0YS5jbyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJtZUBzeXRhLmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.jtPKGFBKURuaS4H_YwfAyHyb9CgHsYn0Gx0I4OyWlO7 - jw9G - nTAJg7tz1uwAPHxDE6otB4mLHaXVGjMIU8c5bf1AEPSYVhk - Y_iUjufhCwzv0RGgUus3ZV3PDgwi5zrhzJzxQIsPamEmQmGFGUUYdGQsdcNr5ZI1IdTYVtzxwXGPzZZIFME4kqhZ2IMTMdBbzxXtHb0FzODfpvC2Drq_GhWDvWjj_NW0ec0qTPJzq442F3Z_E9JWV53OotCmrgnvR6m - V - KZsy_ - p2dwMzSLaLPSJ3DWSfYCj3qGg - S9raxQ0UI4ltHWtdXCD0L7of7qBMkFt615AsqcZ6Z24cK4Q