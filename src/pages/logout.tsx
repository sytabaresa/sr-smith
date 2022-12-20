import { useEffect } from "react"
import { useLocation } from "wouter"
    ;
import { UrlObject } from "url";
import { useLanguageQuery } from "@utils/i18n";
import { useAuthProvider } from "../common/hooks/useAuthProvider";
import { qStr } from "../common/utils/common";

interface LogoutProps {
    redirect?: UrlObject | string
}

const Logout = ({ redirect = '/' }: LogoutProps) => {
    const [location, navigate] = useLocation();
    const [query] = useLanguageQuery()
    const { logout } = useAuthProvider()

    useEffect(() => {
        const f = async () => {
            await logout(null)
            navigate(redirect + qStr({ query }))
        }
        f()
    }, [])
    return (
        <></>
    )
}

export default Logout