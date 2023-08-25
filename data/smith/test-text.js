/*** 
 * Test Text
 * @author: your name (me@syta.co)
 * @version: 1.0
 **/
Zo = 50;
Zln = complex(60, 40) / Zo;
Zl = spoint(Zln);
k_a = circle(po, Zl);
A = intersection(ax_x, k_a, 0);
text(1, 1, function() {
    return "SWR: " + A.SX();
});