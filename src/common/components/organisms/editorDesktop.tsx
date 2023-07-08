import ToolbarControls from "@components/atoms/toolbarControls"
import CodeEditor from "@editor/editor"
import EditorError from "@components/atoms/editorError"
import { useTranslation } from "@modules/i18n"
import { useSetAtom } from "jotai"
import { editorServiceAtom } from "@core/atoms/smith"
import { HTMLAttributes, useCallback } from "react"
import { cn } from "@editor/lib/utils"

export interface EditorDesktopProps extends HTMLAttributes<HTMLDivElement> {

}

const EditorDesktop = (props: EditorDesktopProps) => {
    const { t } = useTranslation()
    const send = useSetAtom(editorServiceAtom)

    const parseExecute = useCallback(() => send('PARSE'), [])

    return <CodeEditor
        id="desktop-editor"
        className={cn("flex h-[93vh] w-[30vw] max-w-[30rem]", props.className)}
        toolbar={editor => <ToolbarControls editor={editor} /> as any}
        footer={editor => <>
            <EditorError />
            <button onClick={parseExecute} className="btn btn-outline">
                {t.canvas.run()}
            </button>
        </> as any}
    />
}


export default EditorDesktop