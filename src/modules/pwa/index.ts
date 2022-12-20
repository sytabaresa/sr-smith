import { Workbox } from 'workbox-window'

export async function createSW() {
    let wb
    if ('serviceWorker' in navigator) {
        const swUrl = new URL('service-worker.ts', import.meta.url) as unknown as string
        // console.log(swUrl)
        wb = new Workbox(swUrl, { type: 'module' });
    }
    return wb
}
