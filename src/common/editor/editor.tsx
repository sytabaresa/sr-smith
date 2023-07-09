import { debounce } from "lodash";
import { useAtomValue, useSetAtom } from "jotai"
import { HTMLAttributes, ReactNode, useCallback, useEffect, useMemo } from "react";
import { Plate, PlateEditor, PlateProvider } from '@udecode/plate-common';
import { deserializeCode, serializeCode } from '@editor/serializers/serializers'
import { codeAtom, editorServiceAtom, savingServiceAtom } from "@core/atoms/smith";
import { changeAtom, editorAtom, selectionAtom } from "@editor/common/atoms";
import { cn } from "@utils/styles";
// import { SearcherPopup } from "@components/molecules/editor/searcher";
import { useCutomEditableProps } from './common/useCustomEditableProps';
import { MyValue } from './types';

export interface CodeEditor extends HTMLAttributes<HTMLDivElement> {
    toolbar?: (editor: PlateEditor<MyValue>) => ReactNode
    footer?: (editor: PlateEditor<MyValue>) => ReactNode
    id?: string;
};

const CodeEditor = ({ className, toolbar, footer, id = '', ...rest }: CodeEditor) => {

    // machines
    const editor = useAtomValue(editorAtom)
    const sendEditor = useSetAtom(editorServiceAtom)
    const code = useAtomValue(codeAtom)
    const sendSave = useSetAtom(savingServiceAtom)

    // FSM actions
    const setSelection = useSetAtom(selectionAtom)
    const setChange = useSetAtom(changeAtom)

    const onEditorChanged = useCallback((value: MyValue) => {
        setChange(editor.operations)
        const isAstChange = editor.operations.some(
            op => 'set_selection' !== op.type
        )
        if (isAstChange) {
            // Serialize the value and save the string value
            debounce(() => {
                const code = serializeCode(value)
                sendEditor({ type: "CODE", value: code })
            }, 1000)
        } else {
            setSelection({})
        }
    }, [])

    const editorValue = useMemo(() => deserializeCode(code), [code])
    // console.log(initialValue)

    // useAtom(useMemo(() => atom((get) => get(editorServiceAtom).context.counter), []))

    const editableProps = useCutomEditableProps()

    useEffect(() => {
        // for get new initialValue in editor
        editor.reset()

        if (code != '') {
            sendSave({ type: 'SAVE' })
        }
    }, [code])

    return <PlateProvider<MyValue>
        // id={id}
        editor={editor}
        plugins={editor.plugins}
        value={editorValue}
        onChange={onEditorChanged}
    >
        <div className={cn('border border-neutral bg-base-100 p-2 flex flex-col relative', className)} {...rest}>
            <div className="absolute top-0 right-0 mt-2 mr-6 flex z-10 opacity-50">
                {toolbar?.(editor)}
            </div>
            {/* <SearcherPopup editor={editor} /> */}
            <div className="overflow-y-auto scrollbar-thin !scrollbar-w-[4px] scrollbar-track-base-100 scrollbar-thumb-base-content flex-1 mb-1 h-full">
                <Plate<MyValue>
                    editableProps={editableProps}
                />
            </div>
            {footer?.(editor)}
        </div >
        <div id="code-end"></div>
    </PlateProvider>
}

export default CodeEditor;
