import { ClipboardEvent } from "react"
import { serializeCode } from "@editor/serializers/serializers"
import { MyDOMHandler, MyEditor, MyValue } from "../types"
import { DOMHandler } from "@udecode/plate-common"

export const changeClipboardContent: MyDOMHandler = (editor: MyEditor) => (event: ClipboardEvent<Element>) => {
    // event.preventDefault()
    const sel = serializeCode(editor.fragment(editor.selection))
    event.clipboardData.setData('text/plain', sel)

    return false
}
