import * as admin from 'firebase-admin'

export const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// export const adminCredentials = {
//     credential: {
//         projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//         clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//         privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//     },
//     databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
// }



