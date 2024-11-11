import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Context } from "hono";

export const auth = (c: Context) => {
    const firebaseConfig = {
        apiKey: c.env.API_KEY,
        authDomain: c.env.AUTH_DOMAIN,
        projectId: c.env.PROJECT_ID,
        storageBucket: c.env.STORAGE_BUCKET,
        messagingSenderId: c.env.MASSAGING_SENDER_ID,
        appId: c.env.APP_ID
    };
    const app = initializeApp(firebaseConfig);
    const _auth = getAuth(app);
    return _auth
}