import { Context } from "hono";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase'

export const checkauth = async (c: Context): Promise<boolean> => {
    const _auth = auth(c)
    // Promise を使用して認証状態を待機
    return new Promise((resolve) => {
        onAuthStateChanged(_auth, (user) => {
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};
