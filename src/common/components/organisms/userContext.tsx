import { User } from 'firebase/auth'
import { useState, useEffect, createContext, useContext, Dispatch } from 'react'
import { Workbox } from 'workbox-window'
import { useWb } from '@utils/sw'

export interface UserContextType {
    user: User
    loadingUser: boolean
    isAuthenticated: boolean
    setUser: Dispatch<User>
}
export const UserContext = createContext<UserContextType>(null)

var timeout

export default function UserContextComp({ children }) {
    const [user, setUser] = useState<User>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loadingUser, setLoadingUser] = useState(true) // Helpful, to update the UI accordingly.
    const [sw, setSW] = useState(null as any)
    const wb = useWb()

    const userHandler = (event) => {
        // console.log(event)
        if (event.type == 'auth') {
            const user = event.payload
            try {
                if (user) {
                    // User is signed in.
                    // const { uid, displayName, email, photoURL } = user
                    // You could also look for the user doc in your Firestore (if you have one):
                    // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
                    // setUser({ uid, displayName, email, photoURL })
                    setUser(user)
                    setIsAuthenticated(true)
                } else {
                    setUser(null)
                    setIsAuthenticated(false)
                }
            } catch (error) {
                // Most probably a connection error. Handle appropriately.
            } finally {
                setLoadingUser(false)
            }
        }
    }

    useEffect(() => {
        const handler = (event) => userHandler(event.data)
        // recurrent auth messages
        wb?.addEventListener('message', handler)

        // first auth message
        const f = async () => {
            const _wb = await wb?.getSW()
            setSW((sw) => _wb)
        }

        f()
        return () => {
            wb?.removeEventListener('message', handler)
            clearTimeout(timeout)
        }
    }, [wb])

    useEffect(() => {
        clearTimeout(timeout)
        if (!sw || sw?.state == 'activated')
            return
        timeout = setInterval(() => {
            if (sw?.state == 'activated')
                clearTimeout(timeout)

            wb.messageSW({ type: 'auth', cmd: 'getUserIdentity' }).then(userHandler)

        }, 1000)
    }, [sw?.state])

    return (
        <UserContext.Provider value={{ user, setUser, loadingUser, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    )
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext)