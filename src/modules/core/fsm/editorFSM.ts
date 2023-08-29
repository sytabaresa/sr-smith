import { createMachine, state, transition, reduce, invoke, action, immediate } from 'robot3';
import { wait } from '@utils/time';
import { JotaiContext } from '@utils/atoms';
import { _codeAtom, boardAtom, editorAtom } from '@core/atoms/smith';
import { Board } from 'jsxgraph';
import { PlateEditor } from '@udecode/plate-common';
import { MyValue } from '@editor/types';
import { Transforms } from 'slate';
import { deserializeCode } from '@editor/serializers/serializers';

export interface EditorContextType extends JotaiContext<any, any, any> {
    errorMsg?: string;
    counter: number;
    editor: PlateEditor
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
    counter: 0,
    ...ctx,
}) as EditorContextType)

function clearErrorMsg(ctx: EditorContextType, ev: any) { return { ...ctx, errorMsg: '' } }
function setError(ctx: EditorContextType, ev: any) { return { ...ctx, errorMsg: ev.error } }
function addCounter(ctx: EditorContextType, ev: any) { return { ...ctx, counter: ctx.counter + 1 } }
function setCode(ctx: EditorContextType, ev: { value: string, append: boolean }) {
    const code = ctx.getter(_codeAtom)
    const setCode = ctx.setter(_codeAtom)
    const editorRef: React.MutableRefObject<PlateEditor<MyValue>> = ctx.getter(editorAtom)
    if (ev.append) {
        const editor = editorRef.current
        const nodes = deserializeCode(ev.value)
        // console.log(ev.value, nodes)
        Transforms.insertNodes(editor, nodes.slice(0, -1), { at: [editor.children.length] })
        setCode(code + ev.value)
    } else {
        setCode(ev.value)
    }
}