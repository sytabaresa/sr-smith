import { FirebaseApp } from "firebase/app";
import { Auth, AuthProvider, browserPopupRedirectResolver, createUserWithEmailAndPassword, GoogleAuthProvider, indexedDBLocalPersistence, initializeAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export function initAuth(app: FirebaseApp) {
    return initializeAuth(app, {
        persistence: indexedDBLocalPersistence,
        // popupRedirectResolver: browserPopupRedirectResolver,
        // No popupRedirectResolver defined
    });

}

export function getProvider(auth: Auth) {
    const provider = new GoogleAuthProvider();

    auth?.useDeviceLanguage();
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    })
    return provider
}

export class FireAuthWrapper {

    auth: Auth
    provider: AuthProvider

    constructor(auth: Auth, provider: AuthProvider) {
        this.auth = auth
        this.provider = provider
    }

    onAuthChange(callback) {
        // Listen authenticated user
        const unsubscriber = this.auth.onAuthStateChanged(async (user) => {
            if (user)
                callback(user.toJSON())
            else
                callback(null)
        })
        // Unsubscribe auth listener on unmount
        return unsubscriber
    }

    async login(data) {
        // console.log(data)
        if (data.provider == 'google') {
            try {
                if (typeof window != 'undefined') {
                    const result = await signInWithPopup(this.auth, this.provider, browserPopupRedirectResolver)
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    return user.toJSON()
                }
                // ...
            } catch (error) {
                console.log(error);
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                return Promise.reject(error)
            }
        } else {
            try {
                const { email, password } = data;

                const userCredential = await signInWithEmailAndPassword(
                    this.auth,
                    email,
                    password
                );
                // console.log(userCredential.user.toJSON())
                // Signed in
                return userCredential.user.toJSON();
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(error);
                return Promise.reject(error)
            }
        }
    }

    async logout(data = {}) {
        await signOut(this.auth)
    }

    async register(data: Record<string, any>) {
        const { email, password } = data;
        const userCredential = await createUserWithEmailAndPassword(
            this.auth,
            email,
            password
        );
        // Signed in
        return userCredential

    }

    async getUserIdentity(data = {}) {
        return this.auth.currentUser?.toJSON()
    }

    // forgotPassword: () => Promise.resolve(),
    // updatePassword: () => Promise.resolve(),
    // checkAuth: () => Promise.resolve(),
    // checkError: () => Promise.resolve(),
    // getPermissions: () => Promise.resolve(),
}
