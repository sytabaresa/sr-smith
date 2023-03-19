
import { list, selectOne } from "@db/db"
import { RxDBWrapper } from "@db/rxdb"
import { getDB } from "@modules/prepareServices"
import { useObservableState } from "observable-hooks"
import { useEffect, useState } from "react"

export function useDataProvider() {
    const [imported, setImported] = useState<RxDBWrapper | any>({})
    useEffect(() => {
        getDB().then(db => setImported(db))
    })
    return imported as RxDBWrapper
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

export const DataProvider = getDB()