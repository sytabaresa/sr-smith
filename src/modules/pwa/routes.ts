import { ExpirationPlugin } from 'workbox-expiration'
import { NetworkOnly, NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { registerRoute } from 'workbox-routing'

export function registerCustomRouters() {
    registerRoute(
        '/',
        new NetworkFirst({
            cacheName: 'start-url',
            plugins: [new ExpirationPlugin({
                maxEntries: 1,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
                purgeOnQuotaError: !0
            })]
        }),
        'GET'
    )
    registerRoute(
        /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
        new CacheFirst({
            cacheName: 'google-fonts',
            plugins: [new ExpirationPlugin({
                maxEntries: 4,
                maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
                purgeOnQuotaError: !0
            })]
        }),
        'GET'
    )
    registerRoute(
        /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
        new StaleWhileRevalidate({
            cacheName: 'static-font-assets',
            plugins: [new ExpirationPlugin({
                maxEntries: 4,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days,
                purgeOnQuotaError: !0
            })]
        }),
        'GET'
    )
    registerRoute(
        /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
        new StaleWhileRevalidate({
            cacheName: 'static-image-assets',
            plugins: [new ExpirationPlugin({
                maxEntries: 64,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                purgeOnQuotaError: !0
            })]
        }),
        'GET'
    )
    registerRoute(
        /\.(?:mp3|wav|ogg)$/i,
        new CacheFirst({
            cacheName: 'static-audio-assets',
            plugins: [new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
                purgeOnQuotaError: !0
            })]
        }),
        'GET'
    )
    registerRoute(
        /\.(?:mp4)$/i,
        new CacheFirst({
            cacheName: 'static-video-assets',
            plugins: [new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
                purgeOnQuotaError: !0
            })]
        }),
        'GET'
    )
    registerRoute(
        /\.(?:js)$/i,
        new StaleWhileRevalidate({
            cacheName: 'static-js-assets',
            plugins: [new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
                purgeOnQuotaError: !0
            })]
        }),
        'GET'
    )
    registerRoute(
        /\.(?:css|less)$/i,
        new StaleWhileRevalidate({
            cacheName: 'static-style-assets',
            plugins: [new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
                purgeOnQuotaError: !0
            })]
        }),
        'GET'
    )
    registerRoute(
        /\.(?:json|xml|csv)$/i,
        new NetworkFirst({
            cacheName: 'static-data-assets',
            plugins: [new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
                purgeOnQuotaError: !0
            })]
        }),
        'GET'
    )
    registerRoute(
        /\/api\/.*$/i,
        new NetworkFirst({
            cacheName: 'apis',
            networkTimeoutSeconds: 10,
            plugins: [new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
                purgeOnQuotaError: !0
            })]
        }),
        'GET'
    )
    registerRoute(
        /.*/i,
        new NetworkFirst({
            cacheName: 'others',
            networkTimeoutSeconds: 10,
            plugins: [new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
                purgeOnQuotaError: !0
            })]
        }),
        'GET'
    )
}