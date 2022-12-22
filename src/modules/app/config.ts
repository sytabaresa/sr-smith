// import * as admin from 'VITE_firebase-admin'

// const env = process.env
const env = import.meta.env

export const clientCredentials = {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    // databaseURL: env.VITE_FIREBASE_DATABASE_URL,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
    measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
}

// export const adminCredentials = {
//     credential: {
//         projectId: env.VITE_FIREBASE_PROJECT_ID,
//         clientEmail: env.VITE_FIREBASE_CLIENT_EMAIL,
//         privateKey: env.VITE_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//     },
//     databaseURL: env.VITE_FIREBASE_DATABASE_URL,
// }



