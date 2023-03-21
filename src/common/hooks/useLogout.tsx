import { useRouter } from "@modules/router";
import { useAuthProvider } from "./useAuthProvider"

export const useLogout = () => {
    const { useHistory } = useRouter()
    const { push } = useHistory();
    const { logout } = useAuthProvider()

    return async () => {
        try {
            if (logout) await logout()
            push('/')
        } catch (err) {
            console.log('logout error', err)
        }
    }
}