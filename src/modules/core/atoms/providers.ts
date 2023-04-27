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


// App
const cacheApp = atom<FirebaseApp>(null)
export const app = atom((get) => {
    const oldApp = get(cacheApp)
    if (oldApp)
        return oldApp
    console.log('initializing app...')
    const app = initApp()
    console.log('app initialized')
    return app
}, (get, set, reset: typeof RESET) => {
    if (reset == RESET)
        set(cacheApp, null)
    set(cacheApp, get(app))
})

app.onMount = (commit) => {
    commit(null)
}

// Auth
const cacheAuth = atom<FireAuthWrapper>(null)
export const authProvider = atom((get) => {
    const oldAuth = get(cacheAuth)
    if (oldAuth)
        return oldAuth
    console.log('initializing auth...')
    try {
        const _auth = initAuth(get(app))
        const provider = getProvider(_auth)
        const auth = new FireAuthWrapper(_auth, provider)
        console.log('auth initialized')
        return auth
    } catch (err) {
        console.log('db init error: ', JSON.stringify(err))
    }
}, (get, set, reset: typeof RESET) => {
    if (reset == RESET)
        set(cacheAuth, null)
    set(cacheAuth, get(authProvider))
})

authProvider.onMount = (commit) => {
    commit(null)
}


// Data Providers
const ENDPOINT = import.meta.env.VITE_API_URL

const cacheQL = atom<DataProvider>(null)
export const dataQLProvider = atom(
    (get) => {
        const oldDb = get(cacheQL)
        if (oldDb)
            return oldDb
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
    },
    (get, set, reset: typeof RESET) => {
        if (reset == RESET)
            set(cacheQL, null)
        set(cacheQL, get(dataQLProvider))

    })

const cacheDb = atom<DataProvider>(null)
export const _dataRxdbProvider = atom(async (get) => {
    const oldDb = get(cacheDb)
    if (oldDb)
        return oldDb
    // const { db: _rxdb, coll } = await initRxDB()
    if (typeof window != 'undefined') {
        console.log('initializing rxdb...')
        try {
            const { db: rxdb, coll } = await initDB()
            const repl = await replicate(ENDPOINT, coll.projects)
            const provider = rxdbDataProvider(rxdb)

            // headers
            get(authProvider).auth.onIdTokenChanged(async (user) => {
                if (user) {
                    const token = await user.getIdToken()
                    repl.setHeaders({
                        'Authorization': `Bearer ${token}`
                    })
                    repl.reSync()
                } else {
                    repl.setHeaders({})
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
}, (get, set, reset: typeof RESET) => {
    if (reset == RESET)
        set(cacheDb, null)
    set(cacheDb, get(dataRxdbProvider))
})

export const dataRxdbProvider = loadable(_dataRxdbProvider)
