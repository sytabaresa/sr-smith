import { useEffect, useState } from "react"
import { getAuth } from "@modules/prepareServices"
import { FireAuthWrapper } from "@auth/firebase"

export function useAuthProvider() {
    const [imported, setImported] = useState<FireAuthWrapper | any>({})
    useEffect(() => {
        getAuth().then(auth => setImported(auth))
    })
    return imported as FireAuthWrapper
}

export function useUserAuth() {
    const auth = useAuthProvider()
    const [user, setUser] = useState(auth?.auth?.currentUser)
    const [loading, setLoading] = useState(!user)

    useEffect(() => {
        // Listen authenticated user
        const unsubscriber = auth?.auth?.onAuthStateChanged(async (user) => {
            try {
                // console.log(user)
                if (user) {
                    // User is signed in.
                    // const { uid, displayName, email, photoURL } = user
                    // You could also look for the user doc in your Firestore (if you have one):
                    // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
                    // setUser({ uid, displayName, email, photoURL })
                    setUser(user)
                    setLoading(false)
                } else {
                    setUser(null)
                    setLoading(false)
                }
            } catch (error) {
                // Most probably a connection error. Handle appropriately.
            } finally {
            }
        })

        // Unsubscribe auth listener on unmount
        return () => unsubscriber?.()
    }, [auth])

    return { user, loading }
}