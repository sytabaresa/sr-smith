import { lifecycleListenterRegister } from "@pwa/lifecycle";
import { messageSW } from "workbox-window";
import swUrl from '@modules/pwa/service-worker?url'
import { getSW } from "@utils/sw";

export async function initializeSW() {
    const { Workbox } = await import('workbox-window');
    // const swUrl = await import('') as unknown as string
    // const swUrl = new URL('modules/pwa/service-worker.ts', import.meta.url) as unknown as string
    // console.log(swUrl)
    const wb = new Workbox(swUrl, { type: 'module', scope: '/' });
    await wb.register();
    wb.messageSkipWaiting()
    // swVersion = await wb.messageSW({ type: 'GET_VERSION' });


    // SW version:
    const swVersion = await messageSW(getSW(), { type: 'GET_VERSION' })
    console.log('Service Worker version:', swVersion);
}

