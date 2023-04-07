import { useCallback, useEffect, useMemo, useReducer, useRef } from "react"
import { Editor, Transforms, Range, Element, Node } from "slate"
import { ReactEditor, useFocused, useSelected, } from "slate-react"
import { CustomText } from "./types"

export type MentionElement = {
    type: 'jsxelement'
    value: string
    children: CustomText[]
}


const CHARACTERS = [
    'point',
    'spoint',
    'line',
    'circle'
]

export const useJSXElement = () => {

    const [data, updateData] = useReducer(
        (state, newState) => {

            const nextState = {
                ...state,
                ...newState,
            }

            return nextState
        },
        {
            target: undefined,
            index: 0,
            search: '',
        })

    const withElement = (editor: Editor) => {
        const { isInline, isVoid, markableVoid } = editor

        editor.isInline = element => {
            return ['node_const', 'node_var', 'node_op_execfun', 'node_params', 'span'].includes(element.type) ? true : isInline(element)
        }

        editor.isVoid = element => {
            return ['node_assign', 'node_const', 'node_var', 'node_params', 'node_op', 'span'].includes(element.type) ? false : isInline(element)
        }

        editor.markableVoid = element => {
            return ['node_assign', 'node_const', 'node_var', 'node_params', 'node_op', 'span'].includes(element.type) ? false : isInline(element)
        }


        // const { normalizeNode } = editor

        // editor.normalizeNode = entry => {
        //     const [node, path] = entry

        //     // If the element is a statement, ensure its children are valid.
        //     if (Element.isElement(node) && node.type === 'statement') {
        //         for (const [child, childPath] of Node.children(editor, path)) {
        //             if (Element.isElement(child) && !editor.isInline(child)) {
        //                 Transforms.unwrapNodes(editor, { at: childPath })
        //                 return
        //             }
        //         }
        //     }

        //     // Fall back to the original `normalizeNode` to enforce other constraints.
        //     normalizeNode(entry)
        // }

        return editor
    }

    const chars = useMemo(() => CHARACTERS.filter(c =>
        c.toLowerCase().startsWith(data.search.toLowerCase())
    ).slice(0, 10), [data.search])

    const onKeyDown = useCallback(
        (event, editor) => {
            if (data.target && chars.length > 0) {
                switch (event.key) {
                    case 'ArrowDown':
                        event.preventDefault()
                        const prevIndex = data.index >= chars.length - 1 ? 0 : data.index + 1
                        updateData({ index: prevIndex })
                        break
                    case 'ArrowUp':
                        event.preventDefault()
                        const nextIndex = data.index <= 0 ? chars.length - 1 : data.index - 1
                        updateData({ index: nextIndex })
                        break
                    case 'Tab':
                    case 'Enter':
                        event.preventDefault()
                        Transforms.select(editor, data.target)
                        insertMention(editor, chars[data.index])
                        updateData({ target: null })
                        break
                    case 'Escape':
                        event.preventDefault()
                        updateData({ target: null })
                        break
                }
            }
        },
        [chars, data]
    )


    function getToken(editor: Editor) {
        const { selection } = editor

        if (selection && Range.isCollapsed(selection)) {
            const [start] = Range.edges(selection)
            const wordBefore = Editor.before(editor, start, { unit: 'word' })
            const before = wordBefore && Editor.before(editor, wordBefore)
            const beforeRange = before && Editor.range(editor, before, start)
            const beforeText = beforeRange && Editor.string(editor, beforeRange)
            const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/)
            const after = Editor.after(editor, start)
            const afterRange = Editor.range(editor, start, after)
            const afterText = Editor.string(editor, afterRange)
            const afterMatch = afterText.match(/^(\s|$)/)

            if (beforeMatch && afterMatch) {
                console.log(beforeRange, beforeMatch, 0)
                updateData({
                    target: beforeRange,
                    search: beforeMatch[1],
                    index: 0,
                })
                return
            }
        }

        console.log('not match')
        updateData({
            target: null
        })
    }

    const Popup = (props) => {
        const { editor, data } = props
        const ref = useRef<HTMLDivElement | null>()

        // console.log(chars, data)

        useEffect(() => {
            if (data.target && chars.length > 0) {
                const el = ref.current
                const domRange = ReactEditor.toDOMRange(editor, data.target)
                const rect = domRange.getBoundingClientRect()
                el.style.top = `${rect.top + window.pageYOffset + 24}px`
                el.style.left = `${rect.left + window.pageXOffset}px`
            }
        }, [chars.length, editor, data])


        return (data.target && chars.length > 0 && (

            // <Portal>
            <div
                id="element-popup"
                ref={ref}
                style={{
                    top: '-9999px',
                    left: '-9999px',
                    position: 'absolute',
                    zIndex: 1,
                    padding: '3px',
                    background: 'white',
                    borderRadius: '4px',
                    boxShadow: '0 1px 5px rgba(0,0,0,.2)',
                }}
                data-cy="mentions-portal"
            >
                {chars.map((char, i) => (
                    <div
                        key={char}
                        onClick={() => {
                            Transforms.select(editor, data.target)
                            insertMention(editor, char)
                            updateData({ target: null })
                        }}
                        style={{
                            padding: '1px 3px',
                            borderRadius: '3px',
                            background: i === data.index ? '#B4D5FF' : 'transparent',
                        }}
                    >
                        {char}
                    </div>
                ))}
            </div>
            // </Portal>
        )
        )

    }

    return { withElement, getToken, Popup, selectorData: data, onKeyDown }
}

export const insertMention = (editor, character) => {
    const mention: MentionElement = {
        type: 'jsxelement',
        value: character,
        children: [{ text: character }],
    }
    Transforms.insertNodes(editor, mention)
    Transforms.move(editor)
}

export const JSXElement = ({ attributes, children, element }) => {
    const selected = useSelected()
    const focused = useFocused()

    // See if our empty text child has any styling marks applied and apply those
    // if (element.children[0].bold) {
    //     style.fontWeight = 'bold'
    // }
    // if (element.children[0].italic) {
    //     style.fontStyle = 'italic'
    // }
    return (
        <span
            {...attributes}
            // contentEditable={false}
            data-cy={`mention-${element.value.replace(' ', '-')}`}
            className={`p-1 mx-1 align-baseline inline-block bg-gray-200 rounded text-lg`}
        >
            {children}
        </span>
    )
}


export const deserialize = (el, markAttributes = {}) => {
    var out = []
    if (el.type == 'node_op' && el.value == 'op_none') {
        out = el.children.flatMap(c => deserialize(c, markAttributes))
        return out
    }

    // array case
    if (el.length && el.length > 0) {
        const e = {
            type: 'node_params',
            children: el.map(c => deserialize(c, markAttributes))
        }
        return e
    }

    if (el.children?.length == 0) {
        const { children, ...rest } = el
        return {
            // ...rest,
            ...el,
            // text: `${el.value}`,
            children: [{ text: `${el.value}` }]
        }
    }
    return {
        ...el,
        type: el.type == 'node_op' ? `node_${el.value}` : el.type,
        children: el.children?.map(c => deserialize(c, markAttributes))
    }
}