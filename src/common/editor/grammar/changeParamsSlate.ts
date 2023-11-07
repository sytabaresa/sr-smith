import * as ohm from 'ohm-js';
import { jcSemantics } from "./grammar"

jcSemantics.addOperation('changeParamsSlate(dep)', {
    InlineParamsExpression(callExp, leftHand) {
        const params = this!.args!.dep

        callExp.ctx = { firstCall: true }
        return [...callExp.changeParamsSlate(params), ...leftHand?.changeParamsSlate(params)]
    },
    Arguments(left, list, right) {
        const params = this!.args!.dep

        return list.asIteration().children.map((e, i) => {
            e.ctx = { ...this.ctx, i, param: true }
            console.log(e.ctx)
            return e.changeParamsSlate(params)
        })
    },
    literal(lit) {
        const params = this!.args!.dep
        const ctx = this.ctx

        // console.log(lit.sourceString, ctx, params, lit.source)
        if (ctx?.firstCall && ctx?.param && params[ctx.i])
            return [
                { type: 'remove_text', path: [1, 0, 0], offset: lit.source.startIdx, text: lit.sourceString },
                { type: 'insert_text', path: [1, 0, 0], offset: lit.source.startIdx, text: params[ctx.i] }
            ]
        else
            return []
    },
    identifier(id) {
        const params = this!.args!.dep
        const ctx = this.ctx

        // console.log(id.sourceString, ctx, params)
        if (ctx?.param && params[id.sourceString])
            return [
                { type: 'remove_text', path: [1, 0, 0], offset: id.source.startIdx, text: id.sourceString },
                { type: 'insert_text', path: [1, 0, 0], offset: id.source.startIdx, text: params[id.sourceString] },
            ]

        if (ctx?.firstCall && ctx?.param && params[ctx.i])
            return [
                { type: 'remove_text', path: [1, 0, 0], offset: id.source.startIdx, text: id.sourceString },
                { type: 'insert_text', path: [1, 0, 0], offset: id.source.startIdx, text: params[ctx.i] },
            ]

        return []
    },
    _nonterminal(...children) {
        const params = this!.args!.dep
        // console.log(params)
        const list = children.flatMap(c => {
            c.ctx = this.ctx
            return c.changeParamsSlate(params)
        }).flat()
        return list.length > 0 ? list : []
    },
    _iter(...children) {
        const params = this!.args!.dep
        return children.map(c => {
            c.ctx = this.ctx
            return c.changeParamsSlate(params)
        })
    },
    _terminal() {
        return [];
    },
})

export type ChangeParamsSlateFunc = (deps: Record<string | number, string | number>) => Record<string, any>[]