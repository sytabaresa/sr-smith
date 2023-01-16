import { messageSW, } from "workbox-window"
import { getSW } from "@utils/sw"
import { useEffect, useState } from "react"

export class AuthProvider {

    processMsg(msg) {
        if (msg.type == 'auth')
            return msg.payload
    }

    login = async (data) => {
        return this.processMsg(await messageSW(getSW(), { type: 'auth', cmd: 'login', payload: { ...data } })) as Record<string, any>
    }
    register = async (data: Record<string, any>) => {
        return this.processMsg(await messageSW(getSW(), { type: 'auth', cmd: 'register', payload: { ...data } })) as Record<string, any>
    }
    forgotPassword = async (data: Record<string, any>) => {
        return this.processMsg(await messageSW(getSW(), { type: 'auth', cmd: 'forgotPassword', payload: { ...data } })) as Record<string, any>
    }
    updatePassword = async (data: Record<string, any>) => {
        return this.processMsg(await messageSW(getSW(), { type: 'auth', cmd: 'updatePassword', payload: { ...data } })) as Record<string, any>
    }
    logout = async (data: Record<string, any> = {}) => {
        return this.processMsg(await messageSW(getSW(), { type: 'auth', cmd: 'logout', payload: { ...data } })) as Record<string, any>
    }
    checkAuth = async (data: Record<string, any>) => {
        return this.processMsg(await messageSW(getSW(), { type: 'auth', cmd: 'checkAuth', payload: { ...data } })) as Record<string, any>
    }
    checkError = async (data: Record<string, any>) => {
        return this.processMsg(await messageSW(getSW(), { type: 'auth', cmd: 'checkError', payload: { ...data } })) as Record<string, any>
    }
    getPermissions = async (data: Record<string, any>) => {
        return this.processMsg(await messageSW(getSW(), { type: 'auth', cmd: 'getPermissions', payload: { ...data } })) as Record<string, any>
    }
    getUserIdentity = async (data: Record<string, any>) => {
        return this.processMsg(await messageSW(getSW(), { type: 'auth', cmd: 'getUserIdentity', payload: { ...data } })) as Record<string, any>
    }
}

export function useAuthProvider() {
    const c = new AuthProvider()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const changeHandler = (event) => {
        const e = event.data
        // console.log(e)
        if (e.type == 'auth') {
            // console.log(event)
            // console.log(e.payload)
            setUser(e.payload)
            setLoading(false)
        }
    }

    useEffect(() => {
        navigator.serviceWorker.addEventListener('message', changeHandler)
        c.getUserIdentity({})

        return () => {
            navigator.serviceWorker.removeEventListener('message', changeHandler)
        }
    }, [])

    return { ...c, loading, user }
}