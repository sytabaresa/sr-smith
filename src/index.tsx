import { lifecycleListenterRegister } from "@pwa/lifecycle";
import { render } from "react-dom";
import { App } from "./app";
import { createSW } from "@pwa"

const container = document.getElementById("app");
render(<App /> as any, container, container.lastChild as any);

export async function initializeSW() {
    const wb = await createSW()

    if (typeof window != 'undefined') {
        window.workbox = wb
        window.dispatchEvent(new Event('workbox'))
    }

    await wb.register();
    if (process.env.NODE_ENV === 'development') {
        wb.messageSkipWaiting()
    }
    await lifecycleListenterRegister()

    const swVersion = await wb.messageSW({ type: 'GET_VERSION' });
    console.log('Service Worker version:', swVersion);
}

initializeSW()