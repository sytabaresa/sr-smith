import { useEffect } from "react"
import { UrlObject } from "url";
import { useLanguageQuery } from "@hooks/i18n";
import { useAuthProvider } from "@hooks/useAuthProvider";
import { useRouter } from "@modules/router";

interface LogoutProps {
    redirect?: string
}

const Logout = ({ redirect = '/' }: LogoutProps) => {
    const { useHistory } = useRouter()
    const { push } = useHistory();
    const [query] = useLanguageQuery()
    const { logout } = useAuthProvider()

    useEffect(() => {
        const f = async () => {
            await logout(null)
            push(redirect, query)
        }
        f()
    }, [])
    return (
        <></>
    )
}

export default Logout