import { Node, Element, BaseRange } from "slate"

import prism from 'prismjs/components/prism-core.js';
import './prism-jessieCode'
import "prismjs/themes/prism-solarizedlight.min.css";

import { normalizeTokens } from "../normalize/normalizeTokens";
import { autolinker } from "@components/editor/autolinker/autolinker-grammar"
import { colorInline } from "@components/editor/color/colorinline-grammar"
import { DecorateEntry, PlateEditor, getPlugin } from "@udecode/plate-common";
import { CodeBlockPlugin, CodeSyntaxRange, ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE } from "@udecode/plate-code-block"
import { MyValue } from "../types";

const { languages, tokenize } = prism;

interface Range extends BaseRange {
    pos: BaseRange,
    token: boolean,
    type: { [key: string]: boolean }
    content: string
}

export const decorateCodeLine = <
    V extends MyValue = MyValue,
    E extends PlateEditor<V> = PlateEditor<V>
>(
    editor: E, plugin
): DecorateEntry<MyValue> => {
    const code_block = getPlugin<CodeBlockPlugin, V>(editor, ELEMENT_CODE_BLOCK);
    const code_line = getPlugin<{}, V>(editor, ELEMENT_CODE_LINE);

    return ([blockNode, blockPath]): Range[] => {
        const ranges: Range[] = [];

        // console.log(blockNode, blockPath)
        if (!Element.isElement(blockNode) || blockNode.type != code_block.type) {
            return ranges
        }

        const text = blockNode.children.map(line => Node.string(line)).join('\n')
        // console.log(text)

        const getLength = token => {
            if (typeof token === 'string') {
                return token.length
            } else if (typeof token.content === 'string') {
                return token.content.length
            } else {
                return token.content.reduce((l, t) => l + getLength(t), 0)
            }
        }

        const grammar = colorInline(autolinker(languages.jc))
        // console.log(grammar)
        const _tokens = tokenize(text, grammar)
        // console.log(_tokens)
        const lineTokens = normalizeTokens(_tokens)
        // console.log(lineTokens)

        for (const [index, tokens] of lineTokens.entries()) {

            let start = 0
            for (const token of tokens) {
                const length = getLength(token)
                const end = start + length

                if (!length) {
                    continue
                }
                // console.log(token)
                // const type = [...extraType, ...(token.alias ? [token.alias] : []), token.type]
                const path = [...blockPath, index, 0]
                const posInfo = {
                    anchor: { path, offset: start },
                    focus: { path, offset: end },
                }
                const elems = Object.fromEntries(token.types.map(type => [type, true]))
                ranges.push({
                    ...posInfo,
                    pos: posInfo,
                    token: true,
                    type: elems,
                    content: token.content,
                    ...elems
                })

                start = end
            }
        }
        // console.log(ranges)
        return ranges
    }
}