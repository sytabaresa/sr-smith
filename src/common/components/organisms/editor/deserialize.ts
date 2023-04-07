import { jsx } from 'slate-hyperscript'
import { Node as SlateNode, Text } from 'slate'

export const deserialize = (el: HTMLElement, markAttributes = {}) => {
    if (el.nodeType === Node.TEXT_NODE) {
        return jsx('text', markAttributes, el.textContent)
    } else if (el.nodeType !== Node.ELEMENT_NODE) {
        return null
    }

    const nodeAttributes = { ...markAttributes, ...(el.className && { class: el.className }) }

    // define attributes for text nodes
    switch (el.nodeName) {
        case 'STRONG':
            nodeAttributes.bold = true
    }

    const children = Array.from(el.childNodes)
        .map(node => deserialize(node, nodeAttributes))
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


export const serialize = nodes => {
    // if(Text.isText(nodes)) {
    //     return SlateNode.string(nodes)
    // }
    return nodes.map(n => SlateNode.string(n)).join('\n')
}