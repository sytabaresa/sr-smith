// import { Transforms, Element, Node, Path } from '@udecode/plate-common'
import { splitLines } from '../serializers/splitter'
import { Node, Path } from "slate"
import { PlateEditor, isElement, liftNodes, mergeNodes, setNodes, splitNodes, wrapNodes, } from '@udecode/plate-common'
import { ELEMENT_CODE_BLOCK } from "@udecode/plate-code-block"
import { MyValue } from '../types'

const withCodeNormalizer = (editor: PlateEditor<MyValue>) => {
    const { normalizeNode } = editor

    editor.normalizeNode = entry => {
        const [node, path] = entry
        // console.log(node, path, node.operations)

        if (isElement(node) && node.type === ELEMENT_CODE_BLOCK) {
            // console.log(path, node)
            const code = [...Node.texts(node)].map(([node, _path]) => node.text).join('\n')
            const [blocks, validEnd] = splitLines(code)
            // console.log(path, code, blocks, validEnd, editor)

            // // error nodes validation
            if (!validEnd) {
                if (Node.has(editor, Path.next(path))) {
                    // const lastBlock = blocks.slice(-1)[0]
                    mergeNodes(editor, { at: Path.next(path) })
                }
                setNodes(editor, { error: true }, { at: path })
                return
            } else {
                setNodes(editor, { error: false }, { at: path })
            }

            if (blocks.length > 1) {
                const lines = blocks[0].split('\n')
                const index = lines.length - 1
                const lastLine = lines.slice(-1)[0]
                // console.log(path, index, lastLine)

                // Transforms.deselect(editor)
                // withoutNormalizing(editor, () => {
                splitNodes(editor, {
                    at: {
                        path: path.concat(index, 0),
                        offset: lastLine.length,
                    },
                })

                wrapNodes(editor, { type: ELEMENT_CODE_BLOCK, children: [] }, { at: path.concat(index + 1) })
                liftNodes(editor, { at: path.concat(index + 1) })

                return
            }
        }

        // Fall back to the original `normalizeNode` to enforce other constraints.
        normalizeNode(entry)
    }

    return editor
}


export default withCodeNormalizer