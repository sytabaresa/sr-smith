// import { Transforms, Element, Node, Path } from '@udecode/plate-common'
import { splitLines } from '../serializers/splitter'
import { Node, Path, unwrapNodes } from "slate"
import { PlateEditor, Value, isElement, liftNodes, splitNodes, wrapNodes, } from '@udecode/plate-common'
import { ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE } from "@udecode/plate-code-block"

const withCodeNormalizer = (editor: PlateEditor<Value>) => {
    const { normalizeNode } = editor

    editor.normalizeNode = entry => {
        const [node, path] = entry
        // console.log(node, path, node.operations)

        if (isElement(node) && node.type === ELEMENT_CODE_BLOCK) {
            // console.log(path, node)
            const code = [...Node.texts(node)].map(([node, _path]) => node.text).join('\n')
            const [blocks, validEnd] = splitLines(code)
            console.log(path, code, blocks, validEnd, editor)

            // // error nodes validation
            // if (!validEnd) {
            //     if (Node.has(editor, Path.next(path))) {
            //         // const lastBlock = blocks.slice(-1)[0]
            //         Transforms.mergeNodes(editor, { at: Path.next(path) })
            //     }
            //     Transforms.setNodes(editor, { error: true }, { at: path })
            //     return
            // } else {
            //     Transforms.setNodes(editor, { error: false }, { at: path })
            // }

            if (blocks.length > 1) {
                const lines = blocks[0].split('\n')
                const index = lines.length - 1
                const lastLine = lines.slice(-1)[0]
                console.log(path, index, lastLine)

                // Transforms.deselect(editor)
                // withoutNormalizing(editor, () => {
                splitNodes(editor, {
                    at: {
                        path: path.concat(index, 0),
                        offset: lastLine.length,
                    },
                    // height: 1,
                    // always: true
                })
                // deselect(editor)

                // Transforms.move(editor, { distance: 1, unit: 'offset', reverse: true })
                // wrapNodes(editor, { type: ELEMENT_CODE_LINE }, {
                //     at: {
                //         anchor: {
                //             path: path.concat(index, 0),
                //             offset: 0,
                //         },
                //         focus: {
                //             path: path.concat(index, 0),
                //             offset: lastLine.length
                //         }
                //     },
                //     split: true
                // })
                // Transforms.insertNodes(editor, {
                //     type: ELEMENT_CODE_BLOCK,
                //     children: [{ type: ELEMENT_CODE_LINE, children: [{ text: '1' }] }],
                // }, {
                //     at: Path.next(path)
                // })

                // Transforms.moveNodes(editor, {
                //     at: path.concat(index + 1),
                //     // match: (_node, _path) => _path.length == 2 && Path.isAfter(_path, path.concat(index)),
                //     to: Path.next(path)
                // })

                // unwrapNodes(editor, { at: path.concat(index) })
                // wrapNodes(editor, { type: ELEMENT_CODE_LINE }, { at: path.concat(index) })
                wrapNodes(editor, { type: ELEMENT_CODE_BLOCK }, { at: path.concat(index + 1) })
                liftNodes(editor, { at: path.concat(index + 1) })
                // moveNodes(editor, {
                //     at: path.concat(index),
                //     to: Path.next(Path.next(path))
                // })

                // liftNodes(editor, { at: path.concat(index + 1) })
                // wrapNodes(editor, { type: ELEMENT_CODE_BLOCK }, { at: Path.next(path) })
                // })
                return
            }
        }

        // Fall back to the original `normalizeNode` to enforce other constraints.
        normalizeNode(entry)
    }

    return editor
}


export default withCodeNormalizer