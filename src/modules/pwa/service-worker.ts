const SW_VERSION = '1.1.15';

import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'

declare let self: ServiceWorkerGlobalScope

cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST || [])

// self.skipWaiting()
// clientsClaim()

import { FirebaseApp } from "firebase/app";
import { initApp } from "../app";
import { FireAuthWrapper, getProvider, initAuth } from "../auth";
import { FirebaseWrapper, initDB } from "../db";
// import { RxDBWrapper, initDB as initRxDB } from "@db/rxdb";

let app: FirebaseApp
let store: FirebaseWrapper
let auth: FireAuthWrapper
// let rxdb: RxDBWrapper

function getPathFromUrl(url) {
  return url.split(/[?#]/)[0];
}

async function sendAuth() {
  const clients = await (self as any).clients.matchAll({ type: 'window' });
  // console.log(clients)
  for (const client of clients) {
    client.postMessage({ type: 'auth', payload: await auth.getUserIdentity() });
  }
}

async function initFirst(event) {
  console.log('initializing app...')

  if (!app) {
    app = initApp()
    const db = await initDB(app)
    // const _rxdb = await initRxDB()
    const _auth = initAuth(app)
    const provider = getProvider(_auth)
    auth = new FireAuthWrapper(_auth, provider)
    store = new FirebaseWrapper(db)
    // rxdb = new RxDBWrapper(_rxdb)
    console.log('firebase initialized')
  }
}

addEventListener('install', async event => {
  await initFirst(event)
})

addEventListener('activate', async event => {
  clients.claim();
});

addEventListener('activated', async event => {
  console.log('SW version: ', SW_VERSION)
  await initFirst(event)
  await sendAuth()
})

addEventListener('message', async event => {
  const data = event.data
  const url: string = (event.source as any).url
  // console.log(event)

  if (data.type === 'GET_VERSION') {
    event.ports[0].postMessage(SW_VERSION);
  }

  // skip waiting
  if (data && data.type === 'SKIP_WAITING') {
    (self as any).skipWaiting();
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

  if (data.type == 'db' && data.cmd) {
    event.ports[0].postMessage({ type: 'db', payload: await store[data.cmd](data.payload) })
  }
  // if (data.type == 'rxdb' && data.cmd) {
  //     event.ports[0].postMessage({ type: 'db', payload: await rxdb[data.cmd](data.payload) })
  // }

  if (data.type == 'auth' && data.cmd) {
    event.ports[0].postMessage({ type: 'auth', payload: await auth[data.cmd](data.payload) })
  }

  // send always auth 
  await sendAuth()
}, false)

export { }
