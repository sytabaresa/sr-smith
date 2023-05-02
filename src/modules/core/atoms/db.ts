import { GraphQLClient } from "graphql-request"
import { loadable } from 'jotai/utils'
import HasuraDataProvider from "@db/hasura"
import rxdbDataProvider from "@db/rxdb"
import { initDB } from "@db/rxdb"
import { replicate } from "@db/rxdb/replication"
import { atomCacheCancelable } from "@utils/atoms"
import { authProviderAtom } from "./auth"

// Data Providers
const ENDPOINT = import.meta.env.VITE_API_URL

export const dataQLProviderAtom = atomCacheCancelable((get) => {
    const client = new GraphQLClient(ENDPOINT, { headers: {} })
    const provider = HasuraDataProvider(client, {})

    // headers
    get(authProviderAtom).auth.onIdTokenChanged(async (user) => {
        if (user) {
            const token = await user.getIdToken()
            client.setHeaders({
                'Authorization': `Bearer ${token}`
            })
        } else {
            client.setHeaders({})
        }
    })

    return provider
})

export const _dataRxdbProviderAtom = atomCacheCancelable(async (get) => {
    if (typeof window != 'undefined') {
        console.log('initializing rxdb...')
        try {
            const { db: rxdb, coll } = await initDB()
            const provider = rxdbDataProvider(rxdb)
            const repl = await replicate(ENDPOINT, coll.projects)

            // headers
            get(authProviderAtom).auth.onIdTokenChanged(async (user) => {
                if (user) {
                    const token = await user.getIdToken()
                    repl.setHeaders({
                        'Authorization': `Bearer ${token}`
                    })
                    await repl.start()
                    repl.reSync()
                } else {
                    repl.setHeaders({})
                    // await repl.cancel()
                }
            })


            console.log('rxdb initialized')
            return provider
        } catch (err) {
            console.log('db init error: ', JSON.stringify(err))
            // throw err
            // return {}
        }
    }
})

export const dataRxdbProviderAtom = loadable(_dataRxdbProviderAtom)