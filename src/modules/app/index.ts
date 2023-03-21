import { getAnalytics } from "firebase/analytics";
import { FirebaseApp, initializeApp } from "firebase/app";
import { clientCredentials } from "./config";


export function initApp() {
    return initializeApp(clientCredentials)
}

export function analytics(app: FirebaseApp) {
    let analytics
    if (process.env.NODE_ENV != 'development') {
        // Enable analytics. https://firebase.google.com/docs/analytics/get-started
        analytics = getAnalytics(app)
        // if ('measurementId' in clientCredentials) {
        //   firebase.performance()
        // }
    }
    return analytics
}
