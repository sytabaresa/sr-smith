import { initApp } from "@app"
import { FireAuthWrapper, getProvider, initAuth } from "@auth/firebase"
import { FirebaseApp } from "firebase/app"
import { GraphQLClient } from "graphql-request"
import { atom } from "jotai"
import { RESET, loadable } from 'jotai/utils'
import HasuraDataProvider from "@db/hasura"
import rxdbDataProvider from "@db/rxdb"
import { initDB } from "@db/rxdb"
import { replicate } from "@db/rxdb/replication"
import { DataProvider } from "@hooks/useDataProviderSW"
import { RxGraphQLReplicationState } from "rxdb/dist/types/plugins/replication-graphql"
import { atomCacheCancelable } from "@utils/atoms"


// App
export const app = atomCacheCancelable((get) => {
    console.log('initializing app...')
    const app = initApp()
    console.log('app initialized')
    return app
})

// Auth
const cacheAuth = atom<FireAuthWrapper>(null)
export const authProvider = atomCacheCancelable((get) => {
    console.log('initializing auth...')
    try {
        const _auth = initAuth(get(app))
        const provider = getProvider(_auth)
        const auth = new FireAuthWrapper(_auth, provider)
        console.log('auth initialized')
        return auth
    } catch (err) {
        console.log('aith init error: ', JSON.stringify(err))
    }
})

// Data Providers
const ENDPOINT = import.meta.env.VITE_API_URL

export const dataQLProvider = atomCacheCancelable((get) => {
    const client = new GraphQLClient(ENDPOINT, { headers: {} })
    const provider = HasuraDataProvider(client, {})

    // headers
    get(authProvider).auth.onIdTokenChanged(async (user) => {
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

export const _dataRxdbProvider = atomCacheCancelable(async (get) => {
    if (typeof window != 'undefined') {
        console.log('initializing rxdb...')
        try {
            const { db: rxdb, coll } = await initDB()
            const provider = rxdbDataProvider(rxdb)
            const repl = await replicate(ENDPOINT, coll.projects)

            // headers
            get(authProvider).auth.onIdTokenChanged(async (user) => {
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

export const dataRxdbProvider = loadable(_dataRxdbProvider)