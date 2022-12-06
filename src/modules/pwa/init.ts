import { getSW } from "../../common/utils/sw";
import { wait } from "../../common/utils/time";

export async function initFirebase() {
    const ws = getSW()
    console.log('initializing app...')
    try {
        await ws.messageSW({ cmd: 'initializeApp' })
    } catch(err) {
        console.log(err)
    }
}