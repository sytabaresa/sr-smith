
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

export interface list {
    resource: string
    pagination?: { current: number, pageSize: number }
    hasPagination?: boolean
    sort?: { field: string, order: "desc" | "asc" | "null" }
    filters?: Record<string, any> | Record<string, any>[]
    meta?: Record<string, any>
}

export interface DataProvider {
    create(data: oneData): Promise<Record<string, any>>
    createMany(data: oneData): Promise<Record<string, any>[]>
    deleteOne(data: selectOne): Promise<void>
    deleteMany(data: selectMany): Promise<void>
    getList(data: list): Promise<Record<string, any>[]>
    getMany(data: selectMany): Promise<Record<string, any>[]>
    getOne(data: selectOne): Promise<Record<string, any>>
    update(data: selectOne): Promise<void>
    updateMany(data: selectMany): Promise<void>
}