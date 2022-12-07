
import { FirebaseApp } from "firebase/app";
import { initApp } from "../../app";
import { FireAuthWrapper, getProvider, initAuth } from "../../auth";
import { FirebaseWrapper, initDB } from "../../db";

let app: FirebaseApp
let store: FirebaseWrapper
let auth: FireAuthWrapper


self.addEventListener('install', async event => {

    if (!app) {
        app = initApp()
        const db = initDB(app)
        const _auth = initAuth(app)
        const provider = getProvider(_auth)
        auth = new FireAuthWrapper(_auth, provider)
        store = new FirebaseWrapper(db)
        console.log('firebase initialized')
    }
    if (auth) {
        await auth.onAuthChange(async (user) => {
            // console.log(user)
            const clients = await (self as any).clients.matchAll({ type: 'window' });
            for (const client of clients) {
                client.postMessage({ type: 'auth', payload: user });
            }
        })
        console.log('auth onChange initialized')
    }


})

self.addEventListener('message', async event => {
    const data = event.data

    if (data.type == 'db' && data.cmd) {
        event.ports[0].postMessage(await store[data.cmd](data.payload))
        return
    }

    if (data.type == 'auth' && data.cmd) {
        event.ports[0].postMessage(await auth[data.cmd](data.payload))
        return
    }

}, false)