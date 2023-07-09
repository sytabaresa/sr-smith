import { createMachine, state, transition, reduce, invoke, action, immediate } from 'robot3';
import { wait } from '@utils/time';
import { JotaiContext } from '@utils/atoms';
import { _codeAtom, boardAtom } from '@core/atoms/smith';
import { Board } from 'jsxgraph';

export interface EditorContextType extends JotaiContext<any, any, any> {
    errorMsg?: string;
    counter: number
}

const parseExecute = async (ctx: EditorContextType, ev) => {
    // console.log(code)
    // console.log(board)
    // console.log(ctx.theme)
    try {
        const recreateBoard = ctx.setter(boardAtom)
        recreateBoard({ screen: null })

        const code = ctx.getter(_codeAtom) as string
        const board = ctx.getter(boardAtom) as Board

        board.jc.parse(code);
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
        transition("CODE", 'idle', action(setCode)),
    ),
    parsing: invoke(parseExecute,
        transition('done', 'idle', reduce(addCounter)),
        transition('error', 'error', reduce(setError))
    ),
    error: state(
        transition('PARSE', 'parsing', reduce(clearErrorMsg)),
        transition("CODE", 'clearError', action(setCode)),
    ),
    clearError: invoke(() => wait(200),
        transition("CODE", 'clearError', action(setCode)),
        transition('done', 'idle', reduce(clearErrorMsg))
    )
}, (ctx: EditorContextType) => ({
    errorMsg: '',
    code: '',
    counter: 0,
    ...ctx,
}) as EditorContextType)

function clearErrorMsg(ctx: EditorContextType, ev: any) { return { ...ctx, errorMsg: '' } }
function setError(ctx: EditorContextType, ev: any) { return { ...ctx, errorMsg: ev.error } }
function addCounter(ctx: EditorContextType, ev: any) { return { ...ctx, counter: ctx.counter + 1 } }
function setCode(ctx: EditorContextType, ev: { value: string }) {
    const setCode = ctx.setter(_codeAtom)
    setCode(ev.value)
}