

import { useMemo } from 'react'
import { createEditor, Descendant, Element } from 'slate'
import { Slate, Editable, withReact, useSlateStatic } from 'slate-react'
import { withHistory } from 'slate-history'

export { PlainTextExample as Page }

const ElementRender = props => {
    const { attributes, children, element } = props
    const editor = useSlateStatic() //TODO: implement line number

    // console.log(props)

    switch (element.type) {
        case 'paragraph':
            return <p className="border-neutral border-t relative" {...attributes}>
                {children}
            </p>
        case 'line':
            return <div className="relative" {...attributes}>
                {children}
            </div>
        default:
            const Tag = editor.isInline(element) ? 'span' : 'div'
            return <Tag {...attributes}>{
                children}
            </Tag>
    }
}

const withEditor = (editor) => {
    const { isVoid, normalizeNode } = editor
    // editor.isVoid = (element: Element) => {
    //     return element.type == 'line' ? true : isVoid(element)
    // }
    editor.normalizeNode = entry => {
        const [node, path] = entry
        console.log(node, path, node.operations)
        normalizeNode(entry)
    }
    return editor
}

const PlainTextExample = () => {
    const editor = useMemo(() => withEditor(withHistory(withReact(createEditor()))), [])
    return (<>
        {typeof window != 'undefined' && <Slate editor={editor} value={initialValue}>
            <Editable
                renderElement={ElementRender}
                placeholder="Enter some plain text..."
            />
        </Slate>
        }
    </>
    )
}

const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [{
            type: 'line',
            children: [
                { text: 'marco' },
            ]
        }
        ],
    },
    {
        type: 'paragraph',
        children: [{
            type: 'line',
            children: [
                { text: 'polo' },
            ]
        }
        ],
    },
]
