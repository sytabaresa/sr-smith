import { createMachine, state, transition, reduce, invoke, action, immediate } from 'robot3';
import { JXGDrawer } from './tooltipActionsFSM';
import { wait } from '@utils/time';
import { JotaiContext } from '@utils/atoms';
import { boardAtom, boardConfigAtom } from '../atoms/smith';

export interface EditorContextType extends JotaiContext {
    errorMsg?: string;
    code: string;
}

const parseExecute = async (ctx: EditorContextType, ev) => {
    // console.log(code)
    // console.log(board)
    // console.log(ctx.theme)
    try {
        const [_, recreateBoard] = ctx.getMachine(boardAtom)
        recreateBoard(null)
        const [board] = ctx.getMachine(boardAtom)
        board.jc.parse(ctx.code);
    } catch (err) {
        console.log(err)
        return Promise.reject(err)
    }
    return Promise.resolve()
}

// const configTransition = transition('CONFIG', 'initializing', reduce(setConfig))

// fsm
export default createMachine('init', {
    init: state(
        // immediate('initializing')
        transition('INIT', 'initializing')
    ),
    initializing: invoke(async (ctx: EditorContextType, ev) => {
        await parseExecute(ctx, ev);
        return await wait(50)
    }, // some delay initializing
        transition('done', 'idle'),
        transition('error', 'init')
    ),
    idle: state(
        transition('PARSE', 'parsing', reduce(clearErrorMsg)),
        transition("CODE", 'idle', reduce(setCode)),
    ),
    parsing: invoke(parseExecute,
        transition('done', 'idle'),
        transition('error', 'error', reduce(setError))
    ),
    error: state(
        transition('PARSE', 'parsing', reduce(clearErrorMsg)),
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