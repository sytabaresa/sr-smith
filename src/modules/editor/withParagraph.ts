import { Transforms, Element, Node, Path, Editor, nodes } from 'slate'
import { splitLines } from './splitter'
import { Transform } from 'stream'

const withParagraphs = (editor: Editor) => {
    const { normalizeNode } = editor

    editor.normalizeNode = entry => {
        const [node, path] = entry
        // console.log(node, path, node.operations)
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
                Transforms.setNodes(editor, { error: true }, { at: path })
                return
            } else {
                Transforms.setNodes(editor, { error: false }, { at: path })
            }

            if (blocks.length > 1 && blocks[1] != '') {
                const lines = blocks[0].split('\n')
                const index = lines.length - 1
                const last = lines.slice(-1)[0]
                // console.log(i, last)

                Transforms.splitNodes(editor, {
                    at: {
                        path: path.concat(index, 0),
                        offset: last.length
                    }
                })

                Transforms.insertNodes(editor, {
                    type: 'paragraph',
                    children: [],
                }, {
                    at: Path.next(path)
                })

                Transforms.moveNodes(editor, {
                    at: path,
                    match: (node, _path) => _path.length == 2 && Path.isAfter(_path, path.concat(index)),
                    to: Path.next(path).concat(0)
                })

                return
            }
        }

        // Fall back to the original `normalizeNode` to enforce other constraints.
        normalizeNode(entry)
    }

    return editor
}


export default withParagraphs