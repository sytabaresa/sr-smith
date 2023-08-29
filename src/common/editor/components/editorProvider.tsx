import { codeAtom, editorAtom, editorServiceAtom, savingServiceAtom } from "@core/atoms/smith"
import { plugins } from "@editor/common/plugins"
import { deserializeCode, serializeCode } from "@editor/serializers/serializers"
import { MyValue } from "@editor/types"
import { PlateEditor, PlateProvider } from "@udecode/plate-common"
import { WritableAtom, useAtomValue, useSetAtom } from "jotai"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { debounce } from "lodash"
import { changeAtom, selectionAtom } from "@editor/common/atoms"

export const EditorProvider = ({ children }) => {
    const code = useAtomValue(codeAtom)
    const editorRef = useRef<PlateEditor<MyValue> | null>(null);

    // machines
    const sendEditor = useSetAtom(editorServiceAtom)
    const sendSave = useSetAtom(savingServiceAtom)

    // FSM actions
    const setSelection = useSetAtom(selectionAtom)
    const setChange = useSetAtom(changeAtom)
    const setEditor = useSetAtom(editorAtom as any)

    useEffect(() => {
        setEditor(editorRef)
    }, [])

    const saveCode = debounce((value) => {
        // console.log("code")
        const code = serializeCode(value)
        sendEditor({ type: "CODE", value: code })
        if (code != '') {
            sendSave({ type: 'SAVE' })
        }
    }, 1000)

    const onEditorChanged = useCallback(
        (value: MyValue) => {
            const editor = editorRef.current;
            // setChange(editor.operations)
            const isAstChange = editor.operations.some(
                op => 'set_selection' !== op.type
            )
            // console.log(editor.operations)
            if (isAstChange) {
                // console.log('changed')
                // Serialize the value and save the string value
                saveCode(value)
            } else {
                setSelection({})
            }
        }, [])

    const editorValue = useMemo(() => deserializeCode(code), [code])

    return <PlateProvider<MyValue>
        // id={id}
        editorRef={editorRef}
        plugins={plugins}
        value={editorValue}
        onChange={onEditorChanged}
    >
        {children}
    </PlateProvider>

}