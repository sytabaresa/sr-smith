import { Workbox } from "workbox-window";

export async function initFirebase(wb: Workbox) {
    // console.log(ws)
    try {
        await wb.messageSW({ cmd: 'initializeApp' })
    } catch (err) {
        console.log(err)
    }
}
