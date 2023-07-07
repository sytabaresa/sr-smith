// import { Transforms, Element, Node, Path } from '@udecode/plate-common'
import { Node, Path, unwrapNodes } from "slate"
import { PlateEditor, Value, isElement, liftNodes, splitNodes, wrapNodes, } from '@udecode/plate-common'
import { ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE } from "@udecode/plate-code-block"

function splitLines(code: string) {
    return code.split(';')
}

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

            if (blocks.length > 1) {
                const lines = blocks[0].split('\n')
                const index = lines.length - 1
                const lastLine = lines.slice(-1)[0]
                console.log(path, index, lastLine)

                splitNodes(editor, {
                    at: {
                        path: path.concat(index, 0),
                        offset: lastLine.length,
                    },
                })
        
                wrapNodes(editor, { type: ELEMENT_CODE_BLOCK }, { at: path.concat(index + 1) })
                liftNodes(editor, { at: path.concat(index + 1) })

                return
            }
        }

        normalizeNode(entry)
    }

    return editor
}


export default withCodeNormalizer