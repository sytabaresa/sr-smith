import { getSW } from "../../common/utils/sw";

export async function initFirebase() {
    const ws = getSW()
    try {
        await ws.messageSW({ cmd: 'initializeApp' })
    } catch (err) {
        console.log(err)
    }
}
