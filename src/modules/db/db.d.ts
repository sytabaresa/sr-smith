import { RxDatabase } from "rxdb"

export interface oneData {
    resource: string
    variables?: Record<string, any>
    meta?: Record<string, any>
}

export interface selectOne extends oneData {
    id: string
}

export interface selectMany extends oneData {
    ids: string[]
}
export interface customData extends oneData {
    url: string
    method: string
    headers: Record<string, string>
}

export interface list {
    resource: string
    pagination?: { current: number, pageSize: number, mode: string }
    hasPagination?: boolean
    sorters?: Record<string, any> | Record<string, any>[]
    sort?: { field: string, order: "desc" | "asc" | "null" }
    filters?: Record<string, any> | Record<string, any>[]
    meta?: Record<string, any>
}

export interface DataProvider {
    create(data: oneData): Promise<Record<string, any>>
    createMany(data: oneData): Promise<Record<string, any>[] | { data: Record<string, any>[] }>
    deleteOne(data: selectOne): Promise<void | { data: Record<string, any>[] }>
    deleteMany(data: selectMany): Promise<void | { data: Record<string, any>[] }>
    getList(data: list): Promise<Record<string, any>[] | { data: Record<string, any>[], total: number }>
    getMany(data: selectMany): Promise<Record<string, any>[] | { data: Record<string, any>[] }>
    getOne(data: selectOne): Promise<Record<string, any>>
    update(data: selectOne): Promise<void | { data: Record<string, any>[] }>
    updateMany(data: selectMany): Promise<void | { data: Record<string, any>[] }>
    custom?(data: customData): Promise<void | { data: Record<string, any>[] }>
}

export interface DataProviderPrivate extends DataProvider {
    db: RxDatabase
    _getList(data: list): RxQuery<any, any[]>
    _getOne(data: selectOne): RxQuery<any, any>
}