/*** 
 * Ejercice #1 (https://www.youtube.com/watch?v=pJsnWQLZHds)
 * @author: Sebastian Tabares (me@syta.co)
 * @version: 1.0
 **/
Zo = 50;
text(1.2, 1.1, "Zo: " + Zo);
Zln = complex(60, 40) / Zo;
Zl = spoint(Zln);
k_a = circle(po, Zl);
text(1.2, 1, function() {
    return "coef (1 method): " + Zl.nCoef();
});
text(1.2, .9, function() {
    return "coef (2 method): " + k_a.radius();
});
A = intersection(ax_x, k_a, 0);
text(1.2, .8, function() {
    return "SWR (1 method): " + A.SX();
});
text(1.2, .7, function() {
    return "SWR (2 method): " + Zl.SWR();
});
C = angle(Zl, po, -240 * PI / 180);
text(1.2, .6, function() {
    return "Zin: " + C.Z();
});
text(1.2, .5, function() {
    return "Zi: " + C.Z() * Zo;
});