
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'


type CustomElement = { type: 'paragraph' | 'statement' | 'jsxelement'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}
