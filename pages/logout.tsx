import { signOut } from "firebase/auth"
import { useEffect } from "react"
import { auth } from "../firebase/clientApp"
import { useRouter } from "next/router";
import { UrlObject } from "url";
import { useLanguageQuery } from "next-export-i18n";

interface LogoutProps {
    redirect?: UrlObject | string
}

const Logout = ({ redirect = '/' }: LogoutProps) => {
    const router = useRouter()
    const [query] = useLanguageQuery()

    useEffect(() => {
        signOut(auth)
        router.push({ pathname: redirect as string, query })
    }, [])
    return (
        <></>
    )
}

export default Logout