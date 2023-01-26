const SW_VERSION = '1.1.15';

import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'

declare let self: ServiceWorkerGlobalScope

cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST || [])

// self.skipWaiting()
// clientsClaim()

// import { FirebaseApp, initializeApp } from "firebase/app";
// import { initApp } from "../app";
// import { FireAuthWrapper, getProvider, initAuth } from "../auth";
// import { FirebaseWrapper, initDB } from "../db";
// import { RxDBWrapper } from '@db/rxdb';
import { RxDBWrapper, initDB as initRxDB } from "../db/rxdb";
// import { addDeleteFieldFirestore, syncFirestore } from '@db/migrate';
// import { collection } from 'firebase/firestore';

// let app: FirebaseApp
// let store: FirebaseWrapper
// let auth: FireAuthWrapper
let rxdb: RxDBWrapper

function getPathFromUrl(url) {
  return url.split(/[?#]/)[0];
}

async function sendMessage(type: string, payload: Record<string, any>) {
  const clients = await (self as any).clients.matchAll({ type: 'window' });
  // console.log(clients)
  for (const client of clients) {
    client.postMessage({ type, payload })//{wait auth.getUserIdentity() });
  }
}

async function sendAuth() {
  sendMessage('auth', { id: 'test', uid: '123' })//{wait auth.getUserIdentity() });
}

async function initFirst(event) {
  // firebase app
  // !app && (() => {
  //   console.log('initializing app...')
  //   app = initApp()
  //   console.log('app initialized')
  // })()

  // firebase db
  // !store && await (async () => {
  //   console.log('initializing store...')
  //   const db = await initDB(app)
  //   store = new FirebaseWrapper(db)

  //   // addDeleteFieldFirestore(db)
  //   console.log('store initialized')
  // })()

  // firebase auth
  // !auth && await (async () => {
  //   console.log('initializing auth...')
  //   const _auth = initAuth(app)
  //   const provider = getProvider(_auth)
  //   auth = new FireAuthWrapper(_auth, provider)
  //   console.log('auth initialized')
  // })()

  // rxdb
  !rxdb && await (async () => {
    console.log('initializing rxdb...')
    // const { db: _rxdb, coll } = await initRxDB()
    rxdb = new RxDBWrapper()
    await rxdb.init()
    console.log('rxdb initialized')
  })()

}

addEventListener('install', async event => {
  await initFirst(event)
})

addEventListener('activate', async event => {
  await self.clients.claim();
  // console.log('SW version: ', SW_VERSION)
  await initFirst(event)
  await sendAuth()
  await sendMessage('activated', {})//{wait auth.getUserIdentity() });()
})

addEventListener('message', async event => {
  initFirst(null)
  const data = event.data
  const url: string = (event.source as any).url
  // console.log(event)

  if (data.type === 'GET_VERSION') {
    event.ports[0].postMessage(SW_VERSION);
  }

  if (data.type === "SET_REPLICATION") {
    console.log("set sync")
    rxdb.replicate()
  }

  // skip waiting
  if (data && data.type === 'SKIP_WAITING') {
    (self as any).skipWaiting();
  }

  // migrate firebase
  // if (data && data.type === 'MIGRATE') {
  //   console.log("migrate")
  //   syncFirestore(rxdb.db, store.db)
  // }

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

  // if (data.type == 'db2' && data.cmd) {
  //   event.ports[0].postMessage({ type: 'db', payload: await store[data.cmd](data.payload) })
  // }

  if (data.type == 'db' && data.cmd) {
    event.ports[0].postMessage({ type: 'db', payload: await rxdb[data.cmd](data.payload) })
  }

  // if (data.type == 'auth' && data.cmd) {
  //   event.ports[0].postMessage({ type: 'auth', payload: await auth[data.cmd](data.payload) })
  // }

  // send always auth 
  await sendAuth()
}, false)

export { }
