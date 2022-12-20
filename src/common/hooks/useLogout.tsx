import { useLanguageQuery } from "@utils/i18n"
import { useLocation } from "wouter"
import { qStr } from "../utils/common";

import { useAuthProvider } from "./useAuthProvider"

export const useLogout = () => {
    const [location, navigate] = useLocation();
    const [query] = useLanguageQuery()
    const { logout } = useAuthProvider()

    return async () => {
        try {
            await logout()
            navigate('/' + qStr({ lang: query.lang }))
        } catch (err) {
            console.log('logout error', err)
        }
    }
}