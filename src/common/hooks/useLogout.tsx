import { signOut } from "firebase/auth"
import { useLanguageQuery } from "next-export-i18n"
import { useRouter } from "next/router"
import { auth } from "../../modules/auth/clientApp"

export const useLogout = () => {
    const router = useRouter()
    const [query] = useLanguageQuery()

    return async () => {
        try {
            await signOut(auth)
            router.push({ pathname: '/', query: { lang: query.lang } })
        } catch (err) {
            console.log('logout error', err)
        }
    }
}