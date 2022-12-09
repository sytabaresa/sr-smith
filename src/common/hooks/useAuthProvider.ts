import { getSW } from "../utils/sw"

export class AuthProvider {
    sw: any
    constructor() {
        this.sw = getSW()
    }

    processMsg(msg) {
        if (msg.type == 'auth')
            return msg.payload
    }

    login = async (data) => {
        return this.processMsg(await this.sw.messageSW({ type: 'auth', cmd: 'login', payload: { ...data } })) as Record<string, any>
    }
    register = async (data: Record<string, any>) => {
        return this.processMsg(await this.sw.messageSW({ type: 'auth', cmd: 'register', payload: { ...data } })) as Record<string, any>
    }
    forgotPassword = async (data: Record<string, any>) => {
        return this.processMsg(await this.sw.messageSW({ type: 'auth', cmd: 'forgotPassword', payload: { ...data } })) as Record<string, any>
    }
    updatePassword = async (data: Record<string, any>) => {
        return this.processMsg(await this.sw.messageSW({ type: 'auth', cmd: 'updatePassword', payload: { ...data } })) as Record<string, any>
    }
    logout = async (data: Record<string, any> = {}) => {
        return this.processMsg(await this.sw.messageSW({ type: 'auth', cmd: 'logout', payload: { ...data } })) as Record<string, any>
    }
    checkAuth = async (data: Record<string, any>) => {
        return this.processMsg(await this.sw.messageSW({ type: 'auth', cmd: 'checkAuth', payload: { ...data } })) as Record<string, any>
    }
    checkError = async (data: Record<string, any>) => {
        return this.processMsg(await this.sw.messageSW({ type: 'auth', cmd: 'checkError', payload: { ...data } })) as Record<string, any>
    }
    getPermissions = async (data: Record<string, any>) => {
        return this.processMsg(await this.sw.messageSW({ type: 'auth', cmd: 'getPermissions', payload: { ...data } })) as Record<string, any>
    }
    getUserIdentity = async (data: Record<string, any>) => {
        return this.processMsg(await this.sw.messageSW({ type: 'auth', cmd: 'getUserIdentity', payload: { ...data } })) as Record<string, any>
    }
}

export function useAuthProvider() {
    return new AuthProvider()
}