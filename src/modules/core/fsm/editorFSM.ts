import { createMachine, state, transition, reduce, invoke, action, immediate } from 'robot3';
import { wait } from '@utils/time';
import { JotaiContext } from '@utils/atoms';
import { boardAtom } from '@core/atoms/smith';
import { Board } from 'jsxgraph';

export interface EditorContextType extends JotaiContext {
    errorMsg?: string;
    code: string;
    counter: number
}

const parseExecute = async (ctx: EditorContextType, ev) => {
    // console.log(code)
    // console.log(board)
    // console.log(ctx.theme)
    try {
        const recreateBoard = ctx.setter(boardAtom)
        recreateBoard({ screen: null })
        const board = ctx.getter(boardAtom) as Board
        board.jc.parse(ctx.code);
    } catch (err) {
        console.log("parse execute error: ", err)
        return Promise.reject(err)
    }
    return Promise.resolve()
}

// const configTransition = transition('CONFIG', 'initializing', reduce(setConfig))

// fsm
export default createMachine('idle', {
    idle: state(
        transition('PARSE', 'parsing', reduce(clearErrorMsg)),
        transition("CODE", 'idle', reduce(setCode)),
    ),
    parsing: invoke(parseExecute,
        transition('done', 'idle', reduce(addCounter)),
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
    counter: 0,
    ...ctx,
}) as EditorContextType)

function clearErrorMsg(ctx: EditorContextType, ev: any) { return { ...ctx, errorMsg: '' } }
function setCode(ctx: EditorContextType, ev: any) { return { ...ctx, code: ev.value } }
function setError(ctx: EditorContextType, ev: any) { return { ...ctx, errorMsg: ev.error } }
function addCounter(ctx: EditorContextType, ev: any) { return { ...ctx, counter: ctx.counter + 1 } }