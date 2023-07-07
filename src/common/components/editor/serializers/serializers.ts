import { jsx } from 'slate-hyperscript'
import {  Node as SlateNode, Text } from 'slate'
import { splitLines } from './splitter'
import { ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE } from '@udecode/plate-code-block'
import { MyValue } from '../types'

export const deserialize = (el: HTMLElement, markAttributes = {}) => {
    if (el.nodeType === Node.TEXT_NODE) {
        return jsx('text', markAttributes, el.textContent)
    } else if (el.nodeType !== Node.ELEMENT_NODE) {
        return null
    }

    const nodeAttributes: Record<string, any> = { ...markAttributes, ...(el.className && { class: el.className }) }

    // define attributes for text nodes
    switch (el.nodeName) {
        case 'STRONG':
            nodeAttributes.bold = true
    }

    const children = Array.from(el.childNodes)
        .map(node => deserialize(node as HTMLElement, nodeAttributes))
        .flat()

    if (children.length === 0) {
        children.push(jsx('text', nodeAttributes, ''))
    }

    switch (el.nodeName) {
        case 'BODY':
            return jsx('fragment', {}, children)
        case 'BR':
            return '\n'
        case 'BLOCKQUOTE':
            return jsx('element', { type: 'quote', class: el.className }, children)

        case 'P':
            return jsx('element', { type: 'paragraph', class: el.className }, children)
        case 'SPAN':
            return children[0]
        case 'A':
            return jsx(
                'element',
                { type: 'link', class: el.className, eurl: el.getAttribute('href') },
                children
            )
        default:
            return children
    }
}


export const serializeCode = nodes => {
    // if(Text.isText(nodes)) {
    //     return SlateNode.string(nodes)
    // }
    return nodes.map(p => p.children.map(n => SlateNode.string(n)).join('\n')).join('\n')
}

export const deserializeTokens = (el) => {

    if (typeof el == 'string') {
        return { text: el }
    } else if (el.type) {
        if (typeof el.content == 'string') {
            return { text: el.content, type: el.type }
        } else {
            return { type: el.type, children: el.content.map(c => deserializeTokens(c)) }
        }
    }

    const children = el.map(t => deserializeTokens(t))

    return children
}

export const deserializeCode = (code: string): MyValue => {

    return splitLines(code)[0].map(sta => ({
        type: ELEMENT_CODE_BLOCK,
        children: sta.split('\n').map(line => ({
            type: ELEMENT_CODE_LINE,
            children: [{ text: line }]
        }))
    }))
}