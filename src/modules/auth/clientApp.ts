import { initializeApp } from 'firebase/app'
import { Auth, browserPopupRedirectResolver, getAuth, indexedDBLocalPersistence, initializeAuth } from "firebase/auth";
import { Analytics, getAnalytics } from "firebase/analytics";
import 'firebase/firestore' // If you need it
import 'firebase/storage' // If you need it
import 'firebase/performance' // If you need it
import { clientCredentials } from './config';
import { CACHE_SIZE_UNLIMITED, enableIndexedDbPersistence, getFirestore, initializeFirestore } from "firebase/firestore";

export const app = initializeApp(clientCredentials)
export let analytics: Analytics
export const db = getFirestore(app)
export let auth: Auth

if (typeof window !== 'undefined') {
    enableIndexedDbPersistence(db)
        .catch((err) => {
            if (err.code == 'failed-precondition') {
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                // ...
            } else if (err.code == 'unimplemented') {
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
            }
        });
    // Subsequent queries will use persistence, if it was enabled successfully

    // auth = getAuth() 
    auth = initializeAuth(app, {
        persistence: indexedDBLocalPersistence,
        // popupRedirectResolver: browserPopupRedirectResolver,
        // No popupRedirectResolver defined
    });

    // export let analytics
    if (process.env.NODE_ENV != 'development') {
        // Enable analytics. https://firebase.google.com/docs/analytics/get-started
        analytics = getAnalytics(app)
        // if ('measurementId' in clientCredentials) {
        //   firebase.performance()
        // }
    }
}

// export const auth = getAuth(app)
// Check that `window` is in scope for the analytics module!

export default app
