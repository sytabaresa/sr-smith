import { initApp } from "@app"
import { FireAuthWrapper, getProvider, initAuth } from "@auth/firebase"
// import { initDB } from "@db"
import { RxDBWrapper } from "@db/rxdb"
import { FirebaseApp } from "firebase/app"

let app: FirebaseApp
let auth: FireAuthWrapper
let db: RxDBWrapper

export async function initServices() {
    try {
        await getApp()
        await getAuth()
        await getDB()
    } catch (err) {
        console.log(JSON.stringify(err))
    }
}

export async function getApp(force = false) {
    if (typeof window == 'undefined' || (!force && app))
        return app
    console.log('initializing app...')
    app = initApp()
    console.log('app initialized')
    return app
}

//   firebase auth
export async function getAuth(force = false) {
    if (typeof window == 'undefined' || (!force && auth))
        return auth
    console.log('initializing auth...')
    const _auth = initAuth(app)
    const provider = getProvider(_auth)
    auth = new FireAuthWrapper(_auth, provider)
    console.log('auth initialized')
    return auth
}

// rxdb
export async function getDB(force = false) {
    if (typeof window == 'undefined' || (!force && db))
        return db
    console.log('initializing rxdb...')
    // const { db: _rxdb, coll } = await initRxDB()
    try {
        db = new RxDBWrapper()
        await db.init()
        await db.replicate()
        await db.authDB(auth.auth)
        console.log('rxdb initialized')
    } catch (err) {
        console.log(JSON.stringify(err))
    }
    return db

}