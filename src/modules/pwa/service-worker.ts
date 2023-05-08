const SW_VERSION = '1.1.23';

import { registerCustomRouters } from './routes';
// import { skipWaiting, clientsClaim } from 'workbox-core'
import { StaleWhileRevalidate } from 'workbox-strategies'
import { setDefaultHandler, setCatchHandler } from 'workbox-routing'
import { matchPrecache, precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope

// self.skipWaiting()
// clientsClaim()

// must include following lines when using inject manifest module from workbox
// https://developers.google.com/web/tools/workbox/guides/precache-files/workbox-build#add_an_injection_point
const WB_MANIFEST = self.__WB_MANIFEST || []
// Precache fallback route and image
// WB_MANIFEST.push(
//   {
//     url: '/fallback',
//     revision: '1234567890'
//   }
// )
precacheAndRoute(WB_MANIFEST)
cleanupOutdatedCaches()
if (!import.meta.env.VITE_SW_DEV) {

  registerCustomRouters()
  // following lines gives you control of the offline fallback strategies
  // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#comprehensive_fallbacks

  // Use a stale-while-revalidate strategy for all other requests.
  setDefaultHandler(new StaleWhileRevalidate())

  // This "catch" handler is triggered when any of the other routes fail to
  // generate a response.
  setCatchHandler(({ event }) => {
    // The FALLBACK_URL entries must be added to the cache ahead of time, either
    // via runtime or precaching. If they are precached, then call
    // `matchPrecache(FALLBACK_URL)` (from the `workbox-precaching` package)
    // to get the response from the correct cache.
    //
    // Use event, request, and url to figure out how to respond.
    // One approach would be to use request.destination, see
    // https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c
    switch (event.request.destination) {
      case 'document':
        // If using precached URLs:
        return matchPrecache('/');
        // return caches.match('/fallback')
        break
      case 'image':
        // If using precached URLs:
        return matchPrecache('/images/logo.png');
        // return caches.match('/static/images/fallback.png')
        break
      case 'font':
      // If using precached URLs:
      // return matchPrecache(FALLBACK_FONT_URL);
      //return caches.match('/static/fonts/fallback.otf')
      //break
      default:
        // If we don't have a fallback, just return an error response.
        return Response.error()
    }
  })
}

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

  // send always auth 
  await sendAuth()
}, false)

export { }
