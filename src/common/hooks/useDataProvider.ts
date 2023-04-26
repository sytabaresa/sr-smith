
import { list, selectOne } from "@db/db"
import { dataProvider } from "@core/atoms/providers"
import { useAtomValue } from "jotai"
import { useObservableState } from "observable-hooks"
import { RxDBWrapper } from "@db/rxdb"

export function useDataProvider() {
    return useAtomValue(dataProvider) as {
        state: 'loading' | 'hasData' | 'hasError',
        data?: RxDBWrapper,
        error?: any,
    }
}

export function useList(data: list) {
    const db = useDataProvider()
    // console.log(db)
    if (db.data?.db) {
        const docs = db.data._getList(data)
        return useObservableState(docs.$)
    }
}

export function useOne(data: selectOne) {
    const db = useDataProvider()
    if (db.data?.db) {
        const doc = db.data._getOne(data)
        return useObservableState(doc.$)
    }
}
