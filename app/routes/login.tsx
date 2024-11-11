import { createRoute } from 'honox/factory'
import { LoginForm } from '../islands/LoginForm'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth'
import { auth } from '../firebase'

const schema = z.object({
    email: z.string().min(1).includes('@'),
    password: z.string().min(1),
});

export default createRoute(async (c) => {
    return c.render(<LoginForm></LoginForm>)
})

export const POST = createRoute(
    zValidator('form', schema, (result, c) => {
        if (!result.success) {
            const { email, password } = result.data
            return c.render(
                <LoginForm data={{ email, password, error: result.error.flatten().fieldErrors }} />
            )
        }
    }),
    async (c) => {
        const _auth = auth(c)
        const { email, password } = c.req.valid('form')

        try {
            // セッション持続性を設定（ブラウザセッションのみ）
            //await setPersistence(_auth, browserSessionPersistence);

            // ログイン処理
            const data = await signInWithEmailAndPassword(_auth, email, password);
            if (data.user) {
                // ログイン成功時にリダイレクト
                return c.redirect('/', 303);
            }
        } catch (error) {
            // エラーメッセージを取得
            const errorMessage = (error as Error).message || 'ログインに失敗しました';
            return c.render(
                <LoginForm data={{ email, password, error: { login: [errorMessage] } }} />
            );
        }
        // ログイン失敗時に再度ログインページへリダイレクト
        return c.redirect('/login', 303);
    }
);
