import { Node, Element } from "slate"

import prism from 'prismjs/components/prism-core.js';
import '../language/jessieCode'
import "prismjs/themes/prism-solarizedlight.min.css";
import { normalizeTokens } from "../normalize/normalizeTokens";
import { autolinker } from "@components/editor/autolinker/autolinker-grammar"
import { colorInline } from "@components/editor/color/colorinline"
import { ELEMENT_PARAGRAPH } from "@udecode/plate-headless";

const { languages, tokenize } = prism;

export const decoratePreview = () => ([blockNode, blockPath]) => {
    // console.log(blockNode, blockPath)

    if (!Element.isElement(blockNode) || blockNode.type != ELEMENT_PARAGRAPH) {
        return []
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

    const ranges = []
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