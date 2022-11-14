import { createMachine, state, transition, reduce, invoke, action } from 'robot3';
import { JXGDrawer } from './tooltipActionsFSM';
import { wait } from '../../../common/utils/time';

export interface EditorContextType {
    errorMsg?: string;
    code: string;
    ui: JXGDrawer;
    theme?: string;
}

const parseExecute = async (ctx: EditorContextType, ev) => {
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
export default createMachine('init', {
    init: state(
        transition('INIT', 'initializing', action(initBoard))
    ),
    initializing: invoke(() => wait(50), // some delay initializing
        transition('done', 'idle'),
        transition('error', 'init')
    ),
    idle: state(
        transition('PARSING', 'parsing', reduce(clearErrorMsg)),
        transition("CODE", 'idle', reduce(setCode)),
        transition("THEME", 'idle', reduce(setTheme))
    ),
    parsing: invoke(parseExecute,
        transition('done', 'idle'),
        transition('error', 'error', reduce(setError))
    ),
    error: state(
        transition('PARSING', 'parsing', reduce(clearErrorMsg)),
        transition("CODE", 'clearError', reduce(setCode)),
    ),
    clearError: invoke(() => wait(200),
        transition("CODE", 'clearError', reduce(setCode)),
        transition('done', 'idle', reduce(clearErrorMsg))
    )
}, (ctx: EditorContextType) => ({
    errorMsg: '',
    code: '',
    theme: '',
    ...ctx,
}) as EditorContextType)

function clearErrorMsg(ctx: any, ev: any) { return { ...ctx, errorMsg: '' } }
function setCode(ctx: any, ev: any) { return { ...ctx, code: ev.value } }
function setTheme(ctx: any, ev: any) { return { ...ctx, theme: ev.value } }
function setError(ctx: any, ev: any) { return { ...ctx, errorMsg: ev.error } }

function initBoard(ctx: EditorContextType, ev: any) {
    const { name, theme, screenSize } = ev.value
    ctx.ui.newBoard(name, { theme }, screenSize)
}