import { useRouter } from "@modules/router";
import { useAuthProvider } from "./useAuthProvider"
import { useDataProvider } from "./useDataProvider";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { _dataRxdbProviderAtom, dataRxdbProviderAtom } from "@core/atoms/db";
import { RESET } from "jotai/utils";

export const useLogout = () => {
    const { useHistory } = useRouter()
    const { push } = useHistory();
    const { logout } = useAuthProvider()
    const db = useAtomValue(dataRxdbProviderAtom)
    const resetDb = useSetAtom(_dataRxdbProviderAtom)
    // console.log(db)

    return async () => {
        try {
            if (logout) await logout()

            // reset db
            if (db.state == 'hasData' && db.data) {
                await db.data?.db.remove()
                await db.data?.db.destroy()
                // await getDB(true) 
                resetDb(RESET)
            }
            push('/')
        } catch (err) {
            console.log('logout error', err)
        }
    }
}