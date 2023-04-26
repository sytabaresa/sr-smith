import { initApp } from "@app"
import { FireAuthWrapper, getProvider, initAuth } from "@auth/firebase"
import { RxDBWrapper } from "@db/rxdb"
import { FirebaseApp } from "firebase/app"
import { atom } from "jotai"
import { RESET, loadable } from 'jotai/utils'


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


// DB
const cacheDb = atom<RxDBWrapper>(null)
export const _dataProvider = atom(async (get) => {
    const oldDb = get(cacheDb)
    if (oldDb)
        return oldDb
    // const { db: _rxdb, coll } = await initRxDB()
    const db = new RxDBWrapper()
    if (typeof window != 'undefined') {
        console.log('initializing rxdb...')
        try {
            await db.init()
            await db.replicate()
            await db.authDB(get(authProvider).auth)
            console.log('rxdb initialized')
        } catch (err) {
            console.log('db init error: ', JSON.stringify(err))
            // throw err
            // return {}
        }
    }
    return db
}, (get, set, reset: typeof RESET) => {
    if (reset == RESET)
        set(cacheDb, null)
    set(cacheDb, get(dataProvider))
})

export const dataProvider = loadable(_dataProvider)
