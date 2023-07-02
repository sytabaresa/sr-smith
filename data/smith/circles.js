/**
 * Circles
 * @author: your name (me@example.org)
 * @version: 1.0
 **/
A = spoint(1.054, 1.327);
k_a = recircle(A);
k_a = imcircle(A);
D = spoint(0.222, 0.267);
k_a = recirclead(D);
k_a = imcirclead(D);
circle(po, .5);
k_a = circle(A, D);
k_a = circumcircle(A, D, px2);