import { useLanguageQuery } from "next-export-i18n"
import { useRouter } from "next/router"
import { useAuthProvider } from "./useAuthProvider"

export const useLogout = () => {
    const router = useRouter()
    const [query] = useLanguageQuery()
    const { logout } = useAuthProvider()

    return async () => {
        try {
            await logout()
            router.push({ pathname: '/', query: { lang: query.lang } })
        } catch (err) {
            console.log('logout error', err)
        }
    }
}