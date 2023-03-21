import { getDB } from "@modules/prepareServices";
import { useRouter } from "@modules/router";
import { useAuthProvider } from "./useAuthProvider"
import { useDataProvider } from "./useDataProvider";

export const useLogout = () => {
    const { useHistory } = useRouter()
    const { push } = useHistory();
    const { logout } = useAuthProvider()
    const db = useDataProvider()

    return async () => {
        try {
            if (logout) await logout()

            //reset db
            await db.db.remove()
            await db.db.destroy()
            await getDB(true) 
            push('/')
        } catch (err) {
            console.log('logout error', err)
        }
    }
}