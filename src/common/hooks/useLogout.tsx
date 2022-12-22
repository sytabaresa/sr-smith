import { useRouter } from "@modules/router";
import { useLanguageQuery } from "@hooks/i18n"

import { useAuthProvider } from "./useAuthProvider"

export const useLogout = () => {
    const { useHistory } = useRouter()
    const { push } = useHistory();
    const [query] = useLanguageQuery()
    const { logout } = useAuthProvider()

    return async () => {
        try {
            await logout()
            push('/', { lang: query.lang })
        } catch (err) {
            console.log('logout error', err)
        }
    }
}