import { useAuthProvider, useUserAuth } from '@hooks/useAuthProvider'
import { getSW } from '@utils/sw'
import { User } from 'firebase/auth'
import { useState, useEffect, createContext, useContext, Dispatch } from 'react'
import { messageSW } from 'workbox-window'

export interface UserContextType {
    user: User
    loadingUser: boolean
    isAuthenticated: boolean
    // setUser: Dispatch<User>
}
export const UserContext = createContext<UserContextType>(null)

var timeout

export default function UserContextComp({ children }) {
    const { user, loading } = useUserAuth()

    return (
        <UserContext.Provider value={{ user, loadingUser: loading, isAuthenticated: !!user }}>
            {children}
        </UserContext.Provider>
    )
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext)