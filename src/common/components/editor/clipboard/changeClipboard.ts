import { serializeCode } from "@components/editor/serializers/serializers"
import { PlateEditor } from "@udecode/plate-common-core"
import { MyDOMHandler, MyValue } from "../types"

export const changeClipboardContent: MyDOMHandler = (editor, event) => {
    // event.preventDefault()
    const sel = serializeCode(editor.fragment(editor.selection))
    event.clipboardData.setData('text/plain', sel)

    return false
}
