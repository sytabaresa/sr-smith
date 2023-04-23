import { atomWithMachine } from "@utils/atomWithachine"
import { Getter, atom, useAtom, useAtomValue } from "jotai"
import { useMachine } from "react-robot"
import editorMachine from '@fsm/editorFSM'
import { useEffect, useMemo } from "react"
import { createMachine, reduce, state, transition } from "robot3"


export { TestPage as Page }



type contextType = {
    value: string
}
const machinecreate = (value: number) => createMachine<{ init: string, busy: string }, contextType>('init', {
    init: state(
        transition('CONFIG', 'busy'),
    ),
    busy: state(
        transition('CONFIG', 'init', reduce<contextType, any>((ctx, ev) => ({ ...ctx, value: ctx.value + 1 })))
    )
}, (ctx) => ({ value, ...ctx }))

const defaultTextAtom = atom(0)
const editableMachineAtom = atomWithMachine(get =>
    machinecreate(get(defaultTextAtom))
)

const atomfunc = (gett: (get: Getter) => sting) => atom((get) => gett(get) + 'jejej')

const derived = atomfunc((get) => get(defaultTextAtom))

const mut = { a: 1 }
const mutableAtom = atom(mut)
const TestPage = (props) => {
    const [current, send] = useAtom(editableMachineAtom)
    const text = useAtomValue(derived)
    const num = useAtomValue(mutableAtom)

    // console.log(current)

    useEffect(() => {
        setInterval(() => {
            send('CONFIG')
            // mut.a += 1
        }, 5000)
    }, [])

    return <div>
        <h1>hola</h1>
        {current.name} - {current.context.value} - {text}
        {num.a}
        <TestComp />
    </div>
}


const TestComp = (props) => {
    const [text, setText] = useAtom(defaultTextAtom)

    useEffect(() => {
        setInterval(() => setText(1000), 10000)
    }, [])
    return <div>
        <p>{text}</p>
    </div>
}