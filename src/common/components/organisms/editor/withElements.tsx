import { useCallback, useEffect, useMemo, useReducer, useRef } from "react"
import { Editor, Transforms, Range, Element, Node } from "slate"
import { ReactEditor, useFocused, useSelected, } from "slate-react"
import { groupBy } from 'lodash'

export type SearchElement = {
    text: string
}

type Item = {
    type: string,
    value: string,
    desc: string,
    label?: string
}

const ITEMS: Item[] = [
    { type: 'element', value: 'point', desc: "" },
    { type: 'element', value: 'spoint', desc: "" },
    { type: 'element', value: 'line', desc: "" },
    { type: 'element', value: 'circle', desc: "" },
    { type: 'element', value: 'imcircle', desc: "" },
    { type: 'element', value: 'recircle', desc: "" },
    { type: 'element', value: 'imcirclead', desc: "" },
    { type: 'element', value: 'recirclead', desc: "" },
    { type: "constant", value: "$board", desc: "Reference to the currently accessed board." },
    { type: "constant", value: "LN2", desc: "Natural logarithm of 2" },
    { type: "constant", value: "LN10", desc: "Natural logarithm of 10" },
    { type: "constant", value: "LOG2E", desc: "Base 2 logarithm of EULER" },
    { type: "constant", value: "LOG10E", desc: "Base 10 logarithm of EULER" },
    { type: "constant", value: "PI", desc: "Ratio of the circumference of a circle to its diameter" },
    { type: "constant", value: "EULER", desc: "Euler's number e = 2.718281828459045" },
    { type: "constant", value: "SQRT1_2", desc: "Square root of 1/2" },
    { type: "constant", value: "SQRT2", desc: "Square root of 2" },
    { type: "func", value: "cos", label: "cos(x)", desc: "Cosine of x" },
    { type: "func", value: "cosh", label: "cosh(x)", desc: "Hyperbolic cosine of x" },
    { type: "func", value: "pow", label: "pow(b,e)", desc: "e to the b" },
    { type: "func", value: "log", label: "log(x) // log(x,b)", desc: "Natural logarithm, or Logarithm to base b" },
    { type: "func", value: "ln", label: "ln(x)", desc: "Natural logarithm" },
    { type: "func", value: "log2", label: "log2(x)", desc: "Logarithm to base 2" },
    { type: "func", value: "lb", label: "lb(x)", desc: "Logarithm to base 2" },
    { type: "func", value: "log10", label: "log10(x)", desc: "Logarithm to base 10" },
    { type: "func", value: "ld", label: "ld(x)", desc: "Logarithm to base 10" },
    { type: "func", value: "tan", label: "tan(x)", desc: "Tangent of x" },
    { type: "func", value: "cot", label: "cot(x)", desc: "Cotangent of x" },
    { type: "func", value: "sqrt", label: "sqrt(x)", desc: "Square root of x" },
    { type: "func", value: "cbrt", label: "cbrt(x)", desc: "Cube root of x" },
    { type: "func", value: "nthroot", label: "nthroot(x)", desc: "n-th root of x" },
    { type: "func", value: "ceil", label: "ceil(x)", desc: "Get smallest integer n with n > x." },
    { type: "func", value: "asin", label: "asin(x)", desc: "arcsine" },
    { type: "func", value: "abs", label: "abs(x)", desc: "Absolute value of x" },
    { type: "func", value: "max", label: "max(a, b, c, ...)", desc: "Maximum value of all given values." },
    { type: "func", value: "min", label: "min(a, b, c, ...)", desc: "Minimum value of all given values." },
    { type: "func", value: "exp", label: "exp(x)", desc: "EULER to the x" },
    { type: "func", value: "atan2", label: "atan2(y,x)", desc: "Returns the arctangent of the quotient of its arguments." },
    { type: "func", value: "random", label: "random(max = 1) ", desc: "Generate a random number between 0 and max." },
    { type: "func", value: "round", label: "round(v)", desc: "Returns the value of a number rounded to the nearest integer." },
    { type: "func", value: "floor", label: "floor(x)", desc: "Returns the biggest integer n with n < x." },
    { type: "func", value: "acos", label: "acos(x)", desc: "arccosine of x" },
    { type: "func", value: "atan", label: "atan(x)", desc: "arctangent of x" },
    { type: "func", value: "acot", label: "acot(x)", desc: "arccotangent of x" },
    { type: "func", value: "sin", label: "sin(x)", desc: "sine of x" },
    { type: "func", value: "sinh", label: "sinh(x)", desc: "Hyperbolic sine of x" },
    { type: "func", value: "factorial", label: "factorial(n)", desc: "Calculates n!" },
    { type: "func", value: "trunc", label: "trunc(v,p = 0)", desc: "Truncate v after the p-th decimal." },
    { type: "func", value: "V", label: "V(s)", desc: "Returns the value of the given element, e.g. sliders and angles." },
    { type: "func", value: "L", label: "L(s)", desc: "Calculates the length of the given segment." },
    { type: "func", value: "X", label: "X(P)", desc: "Returns the x coordinate of the given point." },
    { type: "func", value: "X", label: "Y(P)", desc: "Returns the y coordinate of the given point." },
    { type: "func", value: "dist", label: "dist(P,Q)", desc: "Compute the distance of two points." },
    { type: "func", value: "deg", label: "deg(A,B, C)", desc: "Calculate the angle of three points in degree." },
    { type: "func", value: "rad", label: "rad(A,B, C)", desc: "Calculate the angle of three points in rad." },
    { type: "func", value: "$", label: "$(id)", desc: "Look up the element to the given element id." },
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
            return ['node_const', 'node_var', 'node_op_execfun', 'node_params'].includes(element.type) ? true : isInline(element)
        }

        editor.isVoid = element => {
            return ['node_assign', 'node_const', 'node_var', 'node_params', 'node_op'].includes(element.type) ? false : isInline(element)
        }

        editor.markableVoid = element => {
            return ['node_assign', 'node_const', 'node_var', 'node_params', 'node_op'].includes(element.type) ? false : isInline(element)
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

    const itemsFiltered = useMemo(() => ITEMS.filter(c =>
        c.value.toLowerCase().startsWith(data.search.toLowerCase())
    ).slice(0, 10).map((e, i) => ({ ...e, index: i })), [data.search])

    const itemsGrouped = useMemo(() => Object.entries(groupBy(itemsFiltered, 'type')), [itemsFiltered])

    const onKeyDown = useCallback(
        (event, editor) => {
            // console.log(event)

            if (event.ctrlKey) {
                switch (event.key) {
                    case ' ':
                        getToken(editor)
                }
            }
            if (data.target && itemsFiltered.length > 0) {
                switch (event.key) {
                    case 'ArrowDown':
                        event.preventDefault()
                        const prevIndex = data.index >= itemsFiltered.length - 1 ? 0 : data.index + 1
                        updateData({ index: prevIndex })
                        break
                    case 'ArrowUp':
                        event.preventDefault()
                        const nextIndex = data.index <= 0 ? itemsFiltered.length - 1 : data.index - 1
                        updateData({ index: nextIndex })
                        break
                    case 'Tab':
                    case 'Enter':
                        event.preventDefault()
                        Transforms.select(editor, data.target)
                        insertMention(editor, itemsFiltered[data.index])
                        updateData({ target: null })
                        break
                    case 'Escape':
                        event.preventDefault()
                        updateData({ target: null })
                        break
                }
            }
        },
        [itemsFiltered, data]
    )

    const onChange = useCallback((editor) => {
        if (data.target && itemsFiltered.length > 0) {
            getToken(editor)
        }
    }, [itemsFiltered, data])

    function getToken(editor: Editor) {
        const { selection } = editor

        if (selection && Range.isCollapsed(selection)) {
            const [start] = Range.edges(selection)
            const wordBefore = Editor.before(editor, start, { unit: 'word' })
            // const before = wordBefore && Editor.before(editor, wordBefore)
            const beforeRange = wordBefore && Editor.range(editor, wordBefore, start)
            const beforeText = beforeRange && Editor.string(editor, beforeRange)
            const beforeMatch: RegExpMatchArray = beforeText && beforeText.match(/^(\w+)$/)
            const after = Editor.after(editor, start)
            const afterRange = Editor.range(editor, start, after)
            const afterText = Editor.string(editor, afterRange)
            const afterMatch = afterText.match(/^(\s|$)/)

            console.log(beforeRange, beforeMatch, 0)
            if (afterMatch) {
                updateData({
                    target: beforeMatch?.[1] ? beforeRange : afterRange,
                    search: beforeMatch?.[1] ?? '',
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
            if (data.target && itemsFiltered.length > 0) {
                const el = ref.current
                const domRange = ReactEditor.toDOMRange(editor, data.target)
                const rect = domRange.getBoundingClientRect()
                el.style.top = `${rect.top + window.pageYOffset + 24}px`
                el.style.left = `${rect.left + window.pageXOffset}px`
            }
        }, [itemsFiltered.length, editor, data.target])


        return (
            // <Portal>
            <div
                id="element-popup"
                ref={ref}
                className={`dropdown absolute z-10 top-[-9999px] left-[-9999px] ${(data.target && itemsFiltered.length > 0) && 'dropdown-open'}`}
                data-cy="mentions-portal"
            >
                <ul tabIndex={0}
                    className="dropdown-content menu menu-compact w-96 shadow bg-base-100"
                >
                    {itemsGrouped.map(([key, items]) => {
                        return <>
                            <li className="menu-title">
                                <span>{key}</span>
                            </li>
                            {items.map((item, i) => (
                                <li key={item.value}>
                                    <a
                                        className={`${data.index == item.index ? 'active' : ''}`}
                                        onClick={() => {
                                            Transforms.select(editor, data.target)
                                            insertMention(editor, item)
                                            updateData({ target: null })
                                        }}
                                    >
                                        {item.label ?? item.value}
                                        {item.desc && <span className="opacity-50">// {item.desc}</span>}
                                    </a>
                                </li>
                            ))}
                        </>
                    })}

                </ul>
            </div>
            // </Portal>
        )

    }

    return { withElement, getToken, Popup, selectorData: data, onKeyDown, onChange }
}

export const insertMention = (editor, item: Item) => {
    const mention: SearchElement = { text: item.value }
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
