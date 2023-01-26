import { lifecycleListenterRegister } from "@pwa/lifecycle";
import { messageSW } from "workbox-window";
import swUrl from '@modules/pwa/service-worker?url'
import { getSW } from "@utils/sw";

export async function initializeSW() {
    const { Workbox } = await import('workbox-window');

    const wb = new Workbox(swUrl, { type: 'module', scope: '/' });
    await wb.register();
    wb.messageSkipWaiting()
    // swVersion = await wb.messageSW({ type: 'GET_VERSION' });
}

