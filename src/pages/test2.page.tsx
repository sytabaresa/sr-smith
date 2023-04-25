import { atomWithMachine } from "@utils/atoms"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { action, createMachine, invoke, state, transition } from "robot3"
import { wait } from "@utils/time"


export { TestPage as Page }

const sendAction = action((ctx: any, ev: any) => {
    if (ctx.other) {
        const [current, send] = ctx.getMachine(ctx.other)
        send('MSG')
    }
})

const machinecreate = (init: string, value: any) => createMachine(init, {
    marco: state(
        transition('MSG', 'w1'),
    ),
    w1: invoke(() => wait(1000),
        transition('done', 'polo', sendAction)
    ),
    polo: state(
        transition('MSG', 'w2')
    ),
    w2: invoke(() => wait(1000),
        transition('done', 'marco', sendAction)
    ),
}, (ctx) => ({ other: value, ...ctx }))


const e1 = atomWithMachine(get =>
    machinecreate('marco', e2)
)
const e2 = atomWithMachine(get =>
    machinecreate('polo', e1)
)

const TestPage = (props) => {
    const [current1, send1] = useAtom(e1)
    const [current2, send2] = useAtom(e2)

    // console.log(current1)

    useEffect(() => {
        setTimeout(() => {
            send1('MSG')
            // mut.a += 1

            // setInterval(() => {
            //     send2('MSG')
            //     // mut.a += 1
            // }, 5000)
        }, 5000)
    }, [])

    return <div>
        <p>e1: {current1.name}</p>
        <p>e2: {current2.name}</p>
    </div>
}
