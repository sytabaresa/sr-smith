import { User } from 'firebase/auth'
import { useState, useEffect, createContext, useContext, Dispatch } from 'react'
import { getSW } from '../../utils/sw'

export interface UserContextType {
    user: User
    loadingUser: boolean
    isAuthenticated: boolean
    setUser: Dispatch<User>
}
export const UserContext = createContext<UserContextType>(null)

export default function UserContextComp({ children }) {
    const [user, setUser] = useState<User>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loadingUser, setLoadingUser] = useState(true) // Helpful, to update the UI accordingly.

    useEffect(() => {

        const userHandler = (event) => {
            console.log("add", event)
            if (event.type == 'auth') {
                console.log('auth loaded')
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

        const sw = getSW()

        // recurrent auth messages
        const unregister = sw.addEventListener('message', (event) => userHandler(event.data))

        // first auth message
        sw.messageSW({ type: 'auth', cmd: 'getUserIdentity' }).then(userHandler)

        return () => {
            sw.removeEventListener(unregister)
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, loadingUser, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    )
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext)