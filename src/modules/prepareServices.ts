import { initApp } from "@app"
import { FireAuthWrapper, getProvider, initAuth } from "@auth/firebase"
import { RxDBWrapper } from "@db/rxdb"
import { FirebaseApp } from "firebase/app"

export let app: FirebaseApp
export let auth: FireAuthWrapper
export let db: RxDBWrapper

export async function initServices() {
    !app && (() => {
        console.log('initializing app...')
        app = initApp()
        console.log('app initialized')
    })()

    //   firebase auth
    !auth && await(async () => {
        console.log('initializing auth...')
        const _auth = initAuth(app)
        const provider = getProvider(_auth)
        auth = new FireAuthWrapper(_auth, provider)
        console.log('auth initialized')
    })()

    // rxdb
    !db && await(async () => {
        console.log('initializing rxdb...')
        // const { db: _rxdb, coll } = await initRxDB()
        db = new RxDBWrapper()
        await db.init()
        await db.replicate()
        await db.authDB(auth.auth)
        console.log('rxdb initialized')
    })()
}