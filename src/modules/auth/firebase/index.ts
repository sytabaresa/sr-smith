import { FirebaseApp } from "firebase/app";
import {
    Auth,
    AuthProvider,
    GoogleAuthProvider,
    browserPopupRedirectResolver,
    createUserWithEmailAndPassword,
    indexedDBLocalPersistence,
    initializeAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth"

export function initAuth(app: FirebaseApp) {
    return initializeAuth(app, {
        persistence: indexedDBLocalPersistence,
        // popupRedirectResolver: browserPopupRedirectResolver,
        // No popupRedirectResolver defined
    });

}

export function getGoogleOauthProvider(auth: Auth) {
    const provider = new GoogleAuthProvider();

    auth?.useDeviceLanguage();
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    })
    return provider
}


const authProvider =
    (
        auth: Auth,
        oauthProvider: AuthProvider
    ) => ({
        auth,
        login: async (data: { email?: string, password?: string, provider?: string }) => {
            // console.log(data)
            if (data.provider == 'google') {
                try {
                    if (typeof window != 'undefined') {
                        const result = await signInWithPopup(auth, oauthProvider, browserPopupRedirectResolver)
                        // This gives you a Google Access Token. You can use it to access the Google API.
                        const credential = GoogleAuthProvider.credentialFromResult(result);
                        const token = credential.accessToken;
                        // The signed-in user info.
                        const user = result.user;
                        return user.toJSON()
                    }
                    // ...
                } catch (error) {
                    console.log('google auth provider error: ', error);
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
                        auth,
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
        },
        logout: async (data = {}) => {
            await signOut(auth)
        },
        register: async (data: { email: string, password: string } & Record<string, any>) => {
            const { email, password } = data;
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            // Signed in
            return userCredential

        },
        getUserIdentity: async (data = {}): Promise<Record<string, any>> => {
            return auth.currentUser?.toJSON()
        },
        // forgotPassword: () => Promise.resolve(),
        // updatePassword: () => Promise.resolve(),
        // checkAuth: () => Promise.resolve(),
        // checkError: () => Promise.resolve(),
        // getPermissions: () => Promise.resolve(),


    })


export default authProvider