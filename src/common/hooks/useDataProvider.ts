
import { DataProvider, list, selectOne } from "@db/db"
import { dataRxdbProviderAtom } from "@core/atoms/db"
import { useAtomValue } from "jotai"
import { useObservableState } from "observable-hooks"
import { loadable } from "jotai/utils"

export function useDataProvider() {
    // useAtomValue(loadable(rxdbReplicator))
    return useAtomValue(dataRxdbProviderAtom) as {
        state: 'loading' | 'hasData' | 'hasError',
        data?: DataProvider,
        error?: any,
    }
}

export function useList(data: list) {
    const db = useDataProvider()
    // console.log(db)
    if (db.data) {
        const docs = db.data._getList(data)
        return useObservableState(docs.$)
    }
}

export function useOne(data: selectOne) {
    const db = useDataProvider()
    if (db.data) {
        const doc = db.data._getOne(data)
        return useObservableState(doc.$)
    }
}
