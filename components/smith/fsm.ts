import { createMachine, state, transition, reduce, invoke } from 'robot3';

const exampleCode =
    `// test smith chart
point(0, 0) << name: 'O', fixed: true >>;
Z1 = point(.5, .5) <<name: 'Z1', color: 'green', size: 5>>;
L = line(Z1, O);
reflect = transform(PI, O) << type: 'rotate' >>;
Y1 = point(Z1, reflect) << name: 'Y1' >>;
circle(Y1, .3);`

// fsm

const wait = ms => () => new Promise(resolve => setTimeout(resolve, ms));

const clearErrorMsg = reduce((ctx: any, ev: any) => ({ ...ctx, errorMsg: '' }))
const setCode = reduce((ctx: any, ev: any) => ({ ...ctx, code: ev.value }))
const setError = reduce((ctx: any, ev: any) => ({ ...ctx, errorMsg: ev.value.message }))

export default createMachine('idle', {
    idle: state(
        transition('PARSING', 'parsing', clearErrorMsg),
        transition("CODE", 'idle', setCode)),
    parsing: state(
        transition('PARSED', 'idle'),
        transition('ERROR', 'error', setError)
    ),
    error: state(
        transition('RUN', 'parsing'),
        transition("CODE", 'clearError', setCode),
    ),
    clearError: invoke(wait(200),
        transition('done', 'idle', clearErrorMsg)
    )
}, () => ({
    errorMsg: '',
    code: exampleCode,
}))

