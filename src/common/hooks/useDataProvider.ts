import { list, oneData, selectMany, selectOne } from "../../modules/db/db"
import { getSW } from "../utils/sw"

export class DataProvider {
    sw: any
    constructor() {
        this.sw = getSW()
    }

    processMsg(msg) {
        if (msg.type == 'db')
            return msg.payload
        else return null
    }

    create = async ({ resource, variables, metaData }: oneData) => {
        return this.processMsg(await this.sw.messageSW({ type: 'db', cmd: 'create', payload: { resource, variables, metaData } })) as Record<string, any>
    }
    createMany = async ({ resource, variables, metaData }: oneData) => {
        return this.processMsg(await this.sw.messageSW({ type: 'db', cmd: 'createMany', payload: { resource, variables, metaData } }))
    }
    deleteOne = async ({ resource, id, variables, metaData }: selectOne) => {
        return this.processMsg(await this.sw.messageSW({ type: 'db', cmd: 'deleteOne', payload: { resource, variables, metaData, id } }))
    }
    deleteMany = async ({ resource, ids, variables, metaData }: selectMany) => {
        return this.processMsg(await this.sw.messageSW({ type: 'db', cmd: 'deleteMany', payload: { resource, variables, metaData, ids } }))
    }
    getList = async ({ resource, pagination, hasPagination, sort, filters, metaData }: list) => {
        return this.processMsg(await this.sw.messageSW({
            type: 'db', cmd: 'getList', payload: { resource, pagination, hasPagination, sort, filters, metaData }
        })) as any[]
    }
    getMany = async ({ resource, ids, metaData }: selectMany) => {
        return this.processMsg(await this.sw.messageSW({ type: 'db', cmd: 'getMany', payload: { resource, ids, metaData } }))
    }
    getOne = async ({ resource, id, metaData }: selectOne) => {
        return this.processMsg(await this.sw.messageSW({ type: 'db', cmd: 'getOne', payload: { resource, id, metaData } }))
    }
    update = async ({ resource, id, variables, metaData }: selectOne) => {
        return this.processMsg(await this.sw.messageSW({ type: 'db', cmd: 'update', payload: { resource, id, variables, metaData } }))
    }
    updateMany = async ({ resource, ids, variables, metaData }: selectMany) => {
        return this.processMsg(await this.sw.messageSW({ type: 'db', cmd: 'updateMany', payload: { resource, ids, variables, metaData } }))
    }
}

export function useDataProvider() {
    return new DataProvider()
}
