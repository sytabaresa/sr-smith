
import { list, selectOne } from "@db/db"
import { db } from "@modules/prepareServices"
import { useObservableState } from "observable-hooks"

export function useDataProvider() {
    return db
}

export function useList(data: list) {
    const db = useDataProvider()
    if (db.db) {
        const docs = db._getList(data)
        return useObservableState(docs.$)
    }
}

export function useOne(data: selectOne) {
    const db = useDataProvider()
    if (db.db) {
        const doc = db._getOne(data)
        return useObservableState(doc.$)
    }
}

export const DataProvider = db