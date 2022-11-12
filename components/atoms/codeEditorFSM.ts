import { createMachine, state, transition, reduce, invoke } from 'robot3';
import { JXGDrawer } from '../organisms/tooltipActions';
import { wait } from '../utils/time';

export interface ContextType {
    errorMsg: string;
    code: string;
    ui: JXGDrawer;
}

const parseExecute = async (ctx, ev) => {
    // console.log(code)
    // console.log(board)
    try {
        ctx.ui.recreateBoard({ theme: ctx.theme })
        ctx.ui.board.jc.parse(ctx.code);
    } catch (err) {
        console.log(err)
        return Promise.reject(err)
    }
    return Promise.resolve()
}

// fsm
const clearErrorMsg = reduce((ctx: any, ev: any) => ({ ...ctx, errorMsg: '' }))
const setCode = reduce((ctx: any, ev: any) => ({ ...ctx, code: ev.value }))
const setTheme = reduce((ctx: any, ev: any) => ({ ...ctx, theme: ev.value }))
const setError = reduce((ctx: any, ev: any) => ({ ...ctx, errorMsg: ev.error }))

export default createMachine('init', {
    init: state(
        transition('PARSING', 'parsing'),
        transition("CODE", 'init', setCode),
        transition("THEME", 'idle', setTheme)
    ),
    idle: state(
        transition('PARSING', 'parsing', clearErrorMsg),
        transition("CODE", 'idle', setCode),
        transition("THEME", 'idle', setTheme)
    ),
    parsing: invoke(parseExecute,
        transition('done', 'idle'),
        transition('error', 'error', setError)
    ),
    error: state(
        transition('PARSING', 'parsing', clearErrorMsg),
        transition("CODE", 'clearError', setCode),
    ),
    clearError: invoke(wait(200),
        transition("CODE", 'clearError', setCode),
        transition('done', 'idle', clearErrorMsg)
    )
}, (ctx: ContextType) => ({
    errorMsg: '',
    code: '',
    theme: '',
    ...ctx,
}))