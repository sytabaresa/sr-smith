import { Transforms, Element, Node, Path, Editor } from 'slate'
import { splitLines } from './splitter'

const withParagraphs = (editor: Editor) => {
    const { normalizeNode } = editor

    editor.normalizeNode = entry => {
        const [node, path] = entry
        // console.log(node, path)
        // If the element is a paragraph, ensure its children are valid.
        if (Element.isElement(node) && node.type === 'paragraph') {
            // console.log(path, node)
            const code = [...Node.texts(node)].map(([node, path]) => node.text).join('\n')
            // console.log(code)
            const [blocks, validEnd] = splitLines(code)
            // console.log(code, blocks, validEnd)

            if (!validEnd) {
                if (Node.has(editor, Path.next(path))) {
                    // const lastBlock = blocks.slice(-1)[0]
                    Transforms.mergeNodes(editor, { at: Path.next(path) })
                }
                return
            }

            if (blocks.length > 1) {
                const [firstBlock, ...rest] = blocks

                Transforms.removeNodes(editor, { at: path })
                Transforms.insertNodes(editor, {
                    type: 'paragraph',
                    children: firstBlock.split('\n').map(b => ({
                        type: 'code-line',
                        children: [{ text: b }]
                    }))
                }, { at: path })

                Transforms.insertNodes(editor, {
                    type: 'paragraph',
                    children: rest.join('\n').split('\n').map(b => ({
                        type: 'code-line',
                        children: [{ text: b }]
                    }))
                }, { at: Path.next(path) })
                Transforms.select(editor, Editor.end(editor, Path.next(path)))
                return
            }
        }

        // Fall back to the original `normalizeNode` to enforce other constraints.
        normalizeNode(entry)
    }

    return editor
}


export default withParagraphs