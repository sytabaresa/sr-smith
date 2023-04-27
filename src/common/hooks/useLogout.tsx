import { useRouter } from "@modules/router";
import { useAuthProvider } from "./useAuthProvider"
import { useDataProvider } from "./useDataProvider";
import { useAtom, useSetAtom } from "jotai";
import { dataRxdbProvider } from "@core/atoms/providers";
import { RESET } from "jotai/utils";

export const useLogout = () => {
    const { useHistory } = useRouter()
    const { push } = useHistory();
    const { logout } = useAuthProvider()
    const [db, resetDb] = useAtom(dataRxdbProvider)
    // console.log(db)

    return async () => {
        try {
            if (logout) await logout()

            // reset db
            if (db.data) {
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