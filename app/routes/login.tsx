import { createRoute } from 'honox/factory'
import { LoginForm } from '../islands/LoginForm'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { createClient } from "@supabase/supabase-js/dist/main/index.js";
import { setCookie } from 'hono/cookie';

const schema = z.object({
    email: z.string().min(1).includes('@'),
    password: z.string().min(1),
});


export default createRoute(async (c) => {
    return c.render(
        <LoginForm></LoginForm>
    )
})

export const POST = createRoute(
    zValidator('form', schema, (result, c) => {
        if (!result.success) {
            const { email, password } = result.data
            return c.render(<LoginForm data={{ email, password, error: result.error.flatten().fieldErrors }} />)
        }
    }),
    async (c) => {
        const supabase = createClient(
            c.env.PROJECT_URL,
            c.env.API_KEY
        )
        const { email, password } = c.req.valid('form')
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (data.session) {
            setCookie(c, 'supabase_token', data.session.access_token)
        }
        return c.redirect('/', 303)
    })