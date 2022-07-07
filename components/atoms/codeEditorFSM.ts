import { createMachine, state, transition, reduce, invoke } from 'robot3';
import { wait } from '../utils/time';

export interface ContextType {
    errorMsg: string;
    code: string;
}

// fsm
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
        transition('PARSING', 'parsing', clearErrorMsg),
        transition("CODE", 'clearError', setCode),
    ),
    clearError: invoke(wait(200),
        transition('done', 'idle', clearErrorMsg)
    )
}, (ctx: ContextType) => ({
    errorMsg: '',
    code: '',
    ...ctx,
}))

