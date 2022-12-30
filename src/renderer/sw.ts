import { lifecycleListenterRegister } from "@pwa/lifecycle";
import { messageSW } from "workbox-window";
import swUrl from '@modules/pwa/service-worker?url'

export async function initializeSW() {
    let swVersion
    if ('serviceWorker' in navigator) {
        if (import.meta.env.MODE === 'production') {
            const swr = await navigator.serviceWorker.register(
                '/service-worker.js',
                { type: 'classic' }
            )
            await messageSW(swr.active, { type: 'SKIP_WAITING' })
            swVersion = await messageSW(swr.active, { type: 'GET_VERSION' })
        } else {
            const { Workbox } = await import('workbox-window');
            // const swUrl = await import('') as unknown as string
            // const swUrl = new URL('modules/pwa/service-worker.ts', import.meta.url) as unknown as string
            // console.log(swUrl)
            const wb = new Workbox(swUrl, { type: 'module', scope: '/' });
            await wb.register();
            wb.messageSkipWaiting()
            swVersion = await wb.messageSW({ type: 'GET_VERSION' });
        }
        console.log('Service Worker version:', swVersion);
        await lifecycleListenterRegister()
    }
}

