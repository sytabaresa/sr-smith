
import { BaseEditor, Descendant } from 'slate'
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react'
import { ELEMENT_PARAGRAPH, ELEMENT_CODE_LINE } from "@udecode/plate-common"

type CustomElement = {
    type: typeof ELEMENT_PARAGRAPH | typeof ELEMENT_CODE_LINE;
    children: Array<CustomElement | CustomText>
    error?: boolean
}

type CustomText = { text: string }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor
        Element: CustomElement
        Text: CustomText
    }
}
