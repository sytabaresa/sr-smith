import { HTMLAttributes, ReactNode, useCallback, useEffect, useMemo } from "react";
import { deserializeCode, serializeCode } from '@components/editor/serializers/serializers'
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai"
import { editorServiceAtom, savingServiceAtom } from "@core/atoms/smith";
import { changeAtom, changeCodeAtom, editorAtom, selectionAtom } from "@components/editor/common/atoms";
// import { SearcherPopup } from "@components/molecules/editor/searcher";
import { Descendant, Editor } from 'slate'
import { Plate, PlateProvider } from '@udecode/plate-common';
import { useCutomEditableProps } from './common/useCustomEditableProps';
import { MyParagraphElement, MyValue } from './types';
import { ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE } from "@udecode/plate-code-block";

export interface CodeEditor extends HTMLAttributes<HTMLDivElement> {
    toolbar?: (editor: Editor) => ReactNode
    footer?: (editor: Editor) => ReactNode
    id?: string;
};

const updateAtom = atom(0)
let timer = null // not concurrent
const CodeEditor = ({ className, toolbar, footer, id, ...rest }: CodeEditor) => {

    // machines
    const send = useSetAtom(editorServiceAtom)
    const editor = useAtomValue(editorAtom)

    // FSM actions
    const setActualCode = useCallback((code) => send({ type: "CODE", value: code }), [])

    const setChangeCode = useSetAtom(changeCodeAtom)
    const setSelection = useSetAtom(selectionAtom)
    const setChange = useSetAtom(changeAtom)

    const onEditorChanged = (value: MyValue) => {
        setChange(editor.operations)
        const isAstChange = editor.operations.some(
            op => 'set_selection' !== op.type
        )
        if (isAstChange) {
            setChangeCode(value)
            // Serialize the value and save the string value to Local Storage.

            clearTimeout(timer)
            timer = setTimeout(() => {
                const code = serializeCode(value)
                setActualCode(code)
                //     editor.children = deserializeCode(code) as Descendant[]
                //     setU(u + 1)
            }, 1000)
        } else {
            setSelection({})
        }
    }

    // const initialValue = useMemo(() => deserializeCode('\n'), [])

    const initialValue = [
        {
            type: ELEMENT_CODE_BLOCK,
            children: [
                {
                    type: ELEMENT_CODE_LINE,
                    children: [{
                        text: '1+1;'
                    }]
                }
            ]
        }
    ]
    // [
    //     {
    //         type: 'p',
    //         children: [
    //             {
    //                 text: '',
    //             },
    //         ],
    //     } as MyParagraphElement,
    // ];

    console.log(initialValue)

    // for update on parsing
    useAtomValue(updateAtom)
    // useAtom(useMemo(() => atom((get) => get(editorServiceAtom).context.counter), []))

    const editableProps = useCutomEditableProps()

    return <div>
        <PlateProvider<MyValue>
            editor={editor}
            plugins={editor.plugins}
            initialValue={initialValue}
            onChange={onEditorChanged}
        >
            <div className={`border border-neutral bg-base-100 p-2 flex flex-col relative ${className || ''}`} {...rest}>
                <div className="absolute top-0 right-0 mt-2 mr-6 flex z-10 opacity-50">
                    {toolbar?.(editor)}
                </div>
                {/* <EditorUpdater editor={editor} /> */}
                {/* <SearcherPopup editor={editor} /> */}
                <div className="overflow-y-auto scrollbar-thin !scrollbar-w-[4px] scrollbar-track-base-100
                 scrollbar-thumb-base-content flex-1 mb-1 h-full">
                    <Plate<MyValue>
                        editableProps={editableProps}
                    />
                </div>
                {footer?.(editor)}
            </div >
            <div id="code-end"></div>
        </PlateProvider>
    </div>
}

const updateEditor = (state) => ['parsing', 'initializing'].includes(state)
const EditorUpdater = ({ editor }) => {
    const current = useAtomValue(editorServiceAtom)
    const sendSave = useSetAtom(savingServiceAtom)
    const [u, setU] = useAtom(updateAtom)
    const { code } = current.context


    useEffect(() => {
        const newCode = deserializeCode(code)
        if (newCode.length > 0)
            editor.children = deserializeCode(code) as Descendant[]
    }, [])

    useEffect(() => {
        if (updateEditor(current.name) && code != '') {
            // console.log(current.name, code)
            editor.children = deserializeCode(code) as Descendant[]
            setU(u + 1)
        }
    }, [current.name])

    useEffect(() => {
        if (code != '')
            sendSave({ type: 'SAVE', value: code })
    }, [code]);

    return <></>
}

export default CodeEditor;
