
import { DataProvider, DataProviderPrivate, list, selectOne } from "@db/db"
import { dataRxdbProviderAtom } from "@core/atoms/db"
import { useAtomValue } from "jotai"
import { useObservableState } from "observable-hooks"
import { of } from "rxjs"

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
    const docs = (db.data as DataProviderPrivate)?._getList(data)
    return useObservableState(docs?.$ ?? of(''))
}

export function useOne(data: selectOne) {
    const db = useDataProvider()
    const doc = (db.data as DataProviderPrivate)?._getOne(data)
    return useObservableState(doc?.$ ?? of(''))
}
