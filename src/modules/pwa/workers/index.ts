import { FirebaseApp } from "firebase/app";
import { initApp } from "../../app";
import { FireAuthWrapper, getProvider, initAuth } from "../../auth";
import { FirebaseWrapper, initDB } from "../../db";

let app: FirebaseApp
let store: FirebaseWrapper
let auth: FireAuthWrapper
let ob

export async function initFirst(event) {
    console.log('initializing app...')

    if (!app) {
        app = initApp()
        const db = await initDB(app)
        const _auth = initAuth(app)
        const provider = getProvider(_auth)
        auth = new FireAuthWrapper(_auth, provider)
        store = new FirebaseWrapper(db)
        console.log('firebase initialized')
    }
    if (auth && !ob) {
        ob = auth.onAuthChange(async (user) => {
            const clients = await (self as any).clients.matchAll({ type: 'window' });
            console.log(clients)
            for (const client of clients) {
                client.postMessage({ type: 'auth', payload: user });
            }
        })
        console.log('auth onChange initialized')
    }

}

self.addEventListener('install', async event => {
    (event as any).waitUntil(async () => await initFirst(event))
})

self.addEventListener('activated', async event => {
    await initFirst(event)
})

self.addEventListener('message', async event => {
    const data = event.data
    const url: string = (event.source as any).url
    // console.log(event)
    function getPathFromUrl(url) {
        return url.split(/[?#]/)[0];
    }

    if (data && data.action === 'CACHE_NEW_ROUTE') {
        caches.open('others').then(cache =>
            cache.match(url, {
                ignoreSearch: true
            }).then(res => {
                if (res === undefined) {
                    return cache.add(getPathFromUrl(url))
                }
            })
        )
    }

    if (data.cmd == 'initializeApp') {
        await initFirst(event)
    }

    if (data.type == 'db' && data.cmd) {
        event.ports[0].postMessage(await store[data.cmd](data.payload))
        return
    }

    if (data.type == 'auth' && data.cmd) {
        event.ports[0].postMessage(await auth[data.cmd](data.payload))
        return
    }

}, false)


export { }
