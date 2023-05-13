
import { BaseEditor, Descendant } from 'slate'
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react'


type CustomElement = {
    type: 'paragraph' | 'code-line';
    children: Array<CustomElement | CustomText>
}

type CustomText = { text: string }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor
        Element: CustomElement
        Text: CustomText
    }
}
