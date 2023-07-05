import { Editor, Transforms, Element } from "slate"

const withHeader = (editor: Editor) => {
    const { normalizeNode } = editor

    editor.normalizeNode = ([node, path]) => {
        if (path.length === 0) {
            if (editor.children.length <= 1 && Editor.string(editor, [0, 0, 0]) === '') {
                const title: Element = {
                    type: 'paragraph',
                    children: [{ text: 'Untitled' }],
                }
                Transforms.insertNodes(editor, title, {
                    at: path.concat(0),
                    select: true,
                })
            }

            if (editor.children.length < 2) {
                const paragraph: Element = {
                    type: 'paragraph',
                    children: [{ text: '' }],
                }
                Transforms.insertNodes(editor, paragraph, { at: path.concat(1) })
            }

            for (const [child, childPath] of Node.children(editor, path)) {
                let type: string
                const slateIndex = childPath[0]
                const enforceType = type => {
                    if (Element.isElement(child) && child.type !== type) {
                        const newProperties: Partial<Element> = { type }
                        Transforms.setNodes<Element>(editor, newProperties, {
                            at: childPath,
                        })
                    }
                }

                switch (slateIndex) {
                    case 0:
                        type = 'title'
                        enforceType(type)
                        break
                    case 1:
                        type = 'paragraph'
                        enforceType(type)
                    default:
                        break
                }
            }
        }

        return normalizeNode([node, path])
    }
}


export default withHeader