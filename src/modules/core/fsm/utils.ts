
import { d } from 'robot3';

d._onEnter = function (machine, to, state, prevState, event) {
    console.log(`----------------------\nEnter state ${to}`);
    console.groupCollapsed(`Details\n------------------------`);
    console.log(`Machine`, machine);
    console.log(`Current state`, state);
    console.log(`Previous state`, prevState);

    if (typeof event === "string") {
        console.log(`Event ${event}`);
    } else if (typeof event === "object") {
        console.log(`Event`, event);
    }

    console.groupEnd();
}
