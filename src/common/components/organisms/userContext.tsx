import { useUserAuth } from '@hooks/useAuthProvider'
import { User } from 'firebase/auth'
import { createContext, useContext, Dispatch, ReactNode } from 'react'

export interface UserContextType {
    user: User
    loadingUser: boolean
    isAuthenticated: boolean
    // setUser: Dispatch<User>
}
export const UserContext = createContext<UserContextType>(null)

export default function UserContextComp({ children }: {children: ReactNode}) {
    const { user, loading } = useUserAuth()

    return (
        <UserContext.Provider value={{ user, loadingUser: loading, isAuthenticated: !!user }}>
            {children}
        </UserContext.Provider>
    )
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext)