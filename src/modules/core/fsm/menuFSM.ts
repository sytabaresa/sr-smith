import { TooltipType } from "@tooltips/interfaces"
import { wait } from "@utils/time"
import { action, createMachine, guard, immediate, invoke, reduce, state, transition } from "robot3"
import { editorServiceAtom } from "../atoms/smith"
import { JotaiContext } from "@utils/atomWithachine"


interface Context extends JotaiContext {
    tooltipSelected: string,
    code: string,
    smithMode: boolean,
    tooltipPlugins: TooltipType[],
    tooltipPluginMap: {
        [k: string]: TooltipType;
    }
    tooltipPluginsNames: string[]
}

const removeElement = (ctx: any, ev: any) => {
    const { board } = ev
    console.log('del', ctx.hitElement)
    const invalidElements = ['image', 'ticks', 'grid', 'text', 'axis']

    // removeElement(ev.board, ctx.hitElement)
    if (!invalidElements.includes(board.hitElement?.elType))
        ev.board.removeObject(board.hitElement)
    return ctx
}

const smithModeChange = (ctx: Context, ev: any) => {
    return { ...ctx, smithMode: ev.value }
}

const pluginExist = (ctx: Context, event: any) => {
    // console.log(ctx, event)
    return ctx.tooltipPluginsNames.includes(ctx.tooltipSelected)
}

const recreateCode = (ctx: Context, ev) => {
    const ctxCode = ev.data.code
    // console.log('rec', ctxCode)
    const [current, send] = ctx.getMachine(editorServiceAtom)
    const code = current.context.code
    send({ type: 'CODE', value: code.slice(-1) == '\n' ? code + ctxCode : code + '\n' + ctxCode })
    send('PARSE')
    return { ...ctx, code: ctxCode }
}

const hit = (ctx, ev) => {
    hitElement = ev.value.element
}

export default createMachine<any, Context>('idle', {
    idle: state(
        transition('DELETE', 'idle', reduce(removeElement)),
        transition('DELETE_MODE', 'delete'),
        transition('CHANGE_DRAW', 'pre_draw'),
        transition('SMITH_MODE', 'idle', reduce(smithModeChange)),
        transition('HIT', 'idle', action(hit)),
    ),
    delete: state(
        transition('DELETE', 'idle', reduce(removeElement)),
        transition('SMITH_MODE', 'delete', reduce(smithModeChange)),
        transition('CHANGE_DRAW', 'pre_draw'),
        transition('EXIT', 'idle'),
        transition('CLICK', 'delete', reduce(removeElement)),
        transition('HIT', 'idle', action(hit))
    ),
    pre_draw: state(
        immediate('validatePlugin', reduce<Context, any>((ctx, ev) => {
            return { ...ctx, tooltipSelected: ev.value }
        }))
    ),
    validatePlugin: state(
        immediate('tooltipSelected', guard(pluginExist.bind(this)),
            action((ctx: any) => console.log("plugin:", ctx.tooltipSelected)),
            // action((ctx: any) => tooltipSelected = tooltipPluginMap[ctx.tooltipSelected])
        ),
        immediate('error', action<Context, any>((ctx) => console.log("plugin not exists:", ctx.tooltipSelected)))
    ),
    tooltipSelected: invoke(
        () => wait(100),
        transition('done', 'draw'),
        transition('error', 'idle')
    ),
    draw: invoke<Context, any>((ctx, ev) =>
        ctx.tooltipPluginMap[ctx.tooltipSelected].machine as unknown as Promise<any>,
        transition('done', 'draw', reduce(recreateCode)),
        transition('error', 'idle'),
        transition('SMITH_MODE', 'draw', reduce(smithModeChange)),
        transition('CHANGE_DRAW', 'pre_draw'),
        transition('EXIT', 'post_draw'),
        transition('HIT', 'idle', reduce(hit)),
        transition('DELETE', 'draw', reduce(removeElement)),
        transition('DELETE_MODE', 'delete'),
    ),
    post_draw: state(
        immediate('idle', reduce((ctx: any, ev: any) => {
            return { ...ctx, tooltipSelected: '' }
        }))
    ),
    error: state(
        immediate('idle', action((ctx, ev) => console.log("error", ev)))
    )
}, (initialContext) => {
    const { tooltipPlugins = [], ...rest } = initialContext

    const tooltipPluginMap = Object.fromEntries(tooltipPlugins.map((t) => [t.name, t]))
    const tooltipPluginsNames = Object.keys(tooltipPluginMap)

    return {
        tooltipSelected: '',
        code: '',
        ...rest,
        tooltipPlugins,
        tooltipPluginMap,
        tooltipPluginsNames,
    }
})

