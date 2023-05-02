import firebaseProvider, { getGoogleOauthProvider, initAuth } from "@auth/firebase"
import { initApp } from "@auth/firebase/appInit"
import { atomCacheCancelable } from "@utils/atoms"
import { User } from "firebase/auth"
import { atom } from "jotai"

// App
export const appAtom = atomCacheCancelable((get) => {
    console.log('initializing app...')
    const app = initApp()
    console.log('app initialized')
    return app
})

// Auth
export const authProviderAtom = atomCacheCancelable((get) => {
    console.log('initializing auth...')
    try {
        const app = get(appAtom)
        const _auth = initAuth(app)
        const oauthProvider = getGoogleOauthProvider(_auth)
        const auth = firebaseProvider(_auth, oauthProvider)
        console.log('auth initialized')
        return auth
    } catch (err) {
        console.log('aith init error: ', JSON.stringify(err))
    }
})

const _authAtom = atom<{ user: User, loading: boolean, isAuthenticated: boolean, error?: any }>({
    user: null,
    loading: true,
    isAuthenticated: false,
    error: null,
})

export const authAtom = atom(
    (get) => get(_authAtom),
    (get, set) => {
        // Listen authenticated user
        const auth = get(authProviderAtom)
        set(_authAtom, {
            user: auth.auth?.currentUser,
            loading: !auth.auth?.currentUser,
            isAuthenticated: !!auth.auth?.currentUser,
        })

        const unsubscriber = auth.auth?.onAuthStateChanged(async (user) => {
            try {
                // console.log(user)
                if (user) {
                    // User is signed in.
                    // const { uid, displayName, email, photoURL } = user
                    // You could also look for the user doc in your Firestore (if you have one):
                    // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
                    // setUser({ uid, displayName, email, photoURL })

                    set(_authAtom, {
                        user,
                        loading: false,
                        isAuthenticated: true,
                    })
                } else {
                    set(_authAtom, {
                        user: null,
                        loading: false,
                        isAuthenticated: false,
                    })
                }
            } catch (error) {
                set(_authAtom, {
                    loading: false,
                    isAuthenticated: false,
                    user: null,
                    error,
                })
                // Most probably a connection error. Handle appropriately.
            } finally {

            }
        })

    })

authAtom.onMount = (commit) => {
    commit()
}