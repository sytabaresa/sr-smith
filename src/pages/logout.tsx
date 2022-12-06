import { useEffect } from "react"
import { useRouter } from "next/router";
import { UrlObject } from "url";
import { useLanguageQuery } from "next-export-i18n";
import { useAuthProvider } from "../common/hooks/useAuthProvider";

interface LogoutProps {
    redirect?: UrlObject | string
}

const Logout = ({ redirect = '/' }: LogoutProps) => {
    const router = useRouter()
    const [query] = useLanguageQuery()
    const { logout } = useAuthProvider()

    useEffect(() => {
        const f = async () => {
            await logout(null)
            router.push({ pathname: redirect as string, query })
        }
        f()
    }, [])
    return (
        <></>
    )
}

export default Logout