import { createMachine, state, transition, reduce, invoke, action } from 'robot3';
import { JXGDrawer } from './tooltipActionsFSM';
import { wait } from '@utils/time';

export interface EditorContextType {
    errorMsg?: string;
    code: string;
    ui: JXGDrawer;
    boardConfig?: { theme: string, name: string, screenSize: string };
}

const parseExecute = async (ctx: EditorContextType, ev) => {
    // console.log(code)
    // console.log(board)
    // console.log(ctx.theme)
    const { theme, name, screenSize } = ctx.boardConfig
    try {
        ctx.ui.recreateBoard({ theme }, name, screenSize)
        ctx.ui.board.jc.parse(ctx.code);
    } catch (err) {
        console.log(err)
        return Promise.reject(err)
    }
    return Promise.resolve()
}

const configTransition = transition('CONFIG', 'initializing', reduce(setConfig))

// fsm
export default createMachine('init', {
    init: state(
        configTransition
    ),
    initializing: invoke(async (ctx: EditorContextType, ev) => {
        await parseExecute(ctx, ev);
        return await wait(50)
    }, // some delay initializing
        configTransition,
        transition('done', 'idle'),
        transition('error', 'init')
    ),
    idle: state(
        transition('PARSING', 'parsing', reduce(clearErrorMsg)),
        transition("CODE", 'idle', reduce(setCode)),
        configTransition
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
    boardConfig: {
        theme: '',
        name: '',
        screenSize: ''
    },
    ...ctx,
}) as EditorContextType)

function clearErrorMsg(ctx: any, ev: any) { return { ...ctx, errorMsg: '' } }
function setCode(ctx: any, ev: any) { return { ...ctx, code: ev.value } }
function setConfig(ctx: any, ev: any) { return { ...ctx, boardConfig: { ...ctx.config, ...ev.value } } }
function setError(ctx: any, ev: any) { return { ...ctx, errorMsg: ev.error } }