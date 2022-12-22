import { createSW } from "@pwa";
import { lifecycleListenterRegister } from "@pwa/lifecycle";

export async function initializeSW() {
    const wb = await createSW()

    if (typeof window != 'undefined') {
        window.workbox = wb
        window.dispatchEvent(new Event('workbox'))
    }

    await wb.register();
    // if (process.env.NODE_ENV === 'development') {
        wb.messageSkipWaiting()
    // }
    await lifecycleListenterRegister()

    const swVersion = await wb.messageSW({ type: 'GET_VERSION' });
    console.log('Service Worker version:', swVersion);
}

