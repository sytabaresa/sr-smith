import { useEffect, useMemo, useRef } from "react"
import { Editor, Transforms, Range, } from "slate"
import { ReactEditor } from "slate-react"
import { groupBy } from "@utils/common"
import { useAtom, useAtomValue } from "jotai"
import { changeAtom, keyDownAtom } from "./atoms"
import { action, createMachine, guard, reduce, state, transition } from "robot3"
import { atomWithMachine } from "@utils/atoms"

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

const insertSearchItem = (editor, item: Item) => {
    const el: SearchElement = { text: item.value }
    Transforms.insertNodes(editor, el)
    // Transforms.move(editor)
}

function getToken(ctx, ev) {
    const editor = ctx.editor as Editor
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

        // console.log(beforeRange, beforeMatch, 0)
        if (afterMatch) {
            return {
                ...ctx,
                target: beforeMatch?.[1] ? beforeRange : afterRange,
                search: beforeMatch?.[1] ?? '',
                index: 0,
            }

        }
    }

    // console.log('not match')
    return {
        ...ctx,
        target: null,
        search: '',
        index: 0
    }
}

const recreateList = (ctx, ev) => {

    const itemsFiltered = ITEMS.filter(c =>
        c.value.toLowerCase().startsWith(ctx.search.toLowerCase())
    ).slice(0, 10).map((e, i) => ({ ...e, index: i }))
    const itemsGrouped = Object.entries(groupBy(itemsFiltered, 'type'))

    return {
        ...ctx,
        itemsFiltered,
        itemsGrouped
    }
}

const enterCond = (ctx, ev: any) => ev.value?.ctrlKey && ev.value?.key == ' '
const insertCond = (ctx, ev) => ['Tab', 'Enter'].includes(ev.value?.key)
const exitCond = (ctx, ev: any) => ev.value?.key == 'Escape'


const insert = (ctx, ev) => {
    // ev.value?.preventDefault()
    const item = ev.item ?? ctx.itemsFiltered[ctx.index]
    Transforms.select(ctx.editor, ctx.target)
    insertSearchItem(ctx.editor, item)
    return {
        ...ctx,
        target: null,
        search: '',
        index: 0
    }
}

const moveCursor = (ctx, ev) => {
    const event = ev.value
    switch (event.key) {
        case 'ArrowDown':
            event.preventDefault()
            const prevIndex = ctx.index >= ctx.itemsFiltered.length - 1 ? 0 : ctx.index + 1
            return { ...ctx, index: prevIndex }
        case 'ArrowUp':
            event.preventDefault()
            const nextIndex = ctx.index <= 0 ? ctx.itemsFiltered.length - 1 : ctx.index - 1
            return { ...ctx, index: nextIndex }
    }
    return ctx
}

const clear = (ctx, ev) => {
    return { ...ctx, index: 0, target: undefined }
}

const movePopup = (ctx, ev) => {
    const el = ctx.ref.current
    const domRange = ReactEditor.toDOMRange(ctx.editor, ctx.target)
    const rect = domRange.getBoundingClientRect()
    el.style.top = `${rect.top + window.pageYOffset + 24}px`
    el.style.left = `${rect.left + window.pageXOffset}px`
}

const searcherFSM = createMachine('inactive', {
    // init: state(
    //     transition('INIT', 'inactive', reduce((ctx: any, ev: any) => ({ ...ctx, ...ev.value })))
    // ),
    inactive: state(
        transition('CHANGE', 'inactive', reduce(getToken), reduce(recreateList)),
        transition('KEY', 'active', guard(enterCond)),
    ),
    active: state(
        transition('CHANGE', 'active', reduce(getToken), reduce(recreateList), action(movePopup)),
        transition('SELECT', 'inactive', reduce(insert)),
        transition('KEY', 'inactive', guard(exitCond), reduce(clear)),
        transition('KEY', 'inactive', guard(insertCond), reduce(insert)),
        transition('KEY', 'active', reduce(moveCursor)),
    )
}, (ictx) => ({
    target: undefined,
    index: 0,
    search: '',
    editor: undefined,
    itemsFiltered: [],
    itemsGrouped: [],
    ref: undefined,
    ...ictx,
}))


// const searcherAtom = atomWithMachine(searcherFSM)
export const SearcherPopup = (props) => {
    const { editor } = props
    const ref = useRef<HTMLDivElement | null>()

    const event = useAtomValue(keyDownAtom)
    const change = useAtomValue(changeAtom)

    const searcherAtom = useMemo(() => atomWithMachine(searcherFSM, { editor, ref }), [editor])
    const [current, send] = useAtom(searcherAtom)

    useEffect(() => {
        // console.log(change)
        send({ type: 'CHANGE', value: change })
    }, [change])

    useEffect(() => {
        // console.log(event)
        send({ type: 'KEY', value: event })
    }, [event])


    // useEffect(() => {
    //     send({ type: 'INIT', value: { editor } })
    // },[])


    // console.log(current.context)
    return (
        <div
            ref={ref}
            className={`dropdown absolute z-10 top-[-9999px] left-[-9999px] ${current.name == 'active' ? 'dropdown-open' : ''}`}
            data-cy="mentions-portal"
        >
            <ul tabIndex={0}
                className="dropdown-content menu menu-compact w-96 shadow bg-base-100"
            >
                {current.context.itemsGrouped?.map(([key, items]) => {
                    return <>
                        <li className="menu-title">
                            <span>{key}</span>
                        </li>
                        {items?.map((item, i) => (
                            <li key={item.value}>
                                <a
                                    className={`${current.context.index == item.index ? 'active' : ''}`}
                                    onClick={() => {
                                        send({ type: 'SELECT', item: item })
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
    )

}