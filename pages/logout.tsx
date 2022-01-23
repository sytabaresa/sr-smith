import { signOut } from "firebase/auth"
import { useEffect } from "react"
import { auth } from "../firebase/clientApp"
import { useRouter } from "next/router";
import { UrlObject } from "url";

interface LogoutProps {
    redirect?: UrlObject | string
}

const Logout = ({ redirect = '/' }: LogoutProps) => {
    const router = useRouter()

    useEffect(() => {
        signOut(auth)
        router.push(redirect)
    }, [])
    return (
        <></>
    )
}

export default Logout