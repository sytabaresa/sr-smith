import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore' // If you need it
import 'firebase/storage' // If you need it
import 'firebase/performance' // If you need it
import { clientCredentials } from './config';


export const app = initializeApp(clientCredentials)
export let analytics

export const auth = getAuth(app)
// Check that `window` is in scope for the analytics module!
if (typeof window !== 'undefined') {
    // Enable analytics. https://firebase.google.com/docs/analytics/get-started
    analytics = getAnalytics(app)
    // if ('measurementId' in clientCredentials) {
    //   firebase.performance()
    // }
}


export default app