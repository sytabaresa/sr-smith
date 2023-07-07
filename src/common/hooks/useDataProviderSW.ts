import { messageSW } from "workbox-window"
import { list, oneData, selectMany, selectOne } from "@db/db"
import { getSW } from '@utils/sw'

export class DataProvider {
    processMsg(msg) {
        if (msg.type == 'db')
            return msg.payload
        else return null
    }

    create = async ({ resource, variables, meta }: oneData) => {
        return this.processMsg(await messageSW(getSW(), { type: 'db', cmd: 'create', payload: { resource, variables, meta } })) as Record<string, any>
    }
    createMany = async ({ resource, variables, meta }: oneData) => {
        return this.processMsg(await messageSW(getSW(), { type: 'db', cmd: 'createMany', payload: { resource, variables, meta } }))
    }
    deleteOne = async ({ resource, id, variables, meta }: selectOne) => {
        return this.processMsg(await messageSW(getSW(), { type: 'db', cmd: 'deleteOne', payload: { resource, variables, meta, id } }))
    }
    deleteMany = async ({ resource, ids, variables, meta }: selectMany) => {
        return this.processMsg(await messageSW(getSW(), { type: 'db', cmd: 'deleteMany', payload: { resource, variables, meta, ids } }))
    }
    getList = async ({ resource, pagination, hasPagination, sort, filters, meta }: list) => {
        return this.processMsg(await messageSW(getSW(), {
            type: 'db', cmd: 'getList', payload: { resource, pagination, hasPagination, sort, filters, meta }
        })) as any[]
    }
    getMany = async ({ resource, ids, meta }: selectMany) => {
        return this.processMsg(await messageSW(getSW(), { type: 'db', cmd: 'getMany', payload: { resource, ids, meta } }))
    }
    getOne = async ({ resource, id, meta }: selectOne) => {
        return this.processMsg(await messageSW(getSW(), { type: 'db', cmd: 'getOne', payload: { resource, id, meta } }))
    }
    update = async ({ resource, id, variables, meta }: selectOne) => {
        return this.processMsg(await messageSW(getSW(), { type: 'db', cmd: 'update', payload: { resource, id, variables, meta } }))
    }
    updateMany = async ({ resource, ids, variables, meta }: selectMany) => {
        return this.processMsg(await messageSW(getSW(), { type: 'db', cmd: 'updateMany', payload: { resource, ids, variables, meta } }))
    }
}

export function useDataProvider() {
    return new DataProvider()
}
