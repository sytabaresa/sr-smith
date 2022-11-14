import { browserPopupRedirectResolver, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "./clientApp";

const provider = new GoogleAuthProvider();

// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// auth.languageCode = 'es';
auth?.useDeviceLanguage();
provider.setCustomParameters({
    'login_hint': 'user@example.com'
})

export default provider