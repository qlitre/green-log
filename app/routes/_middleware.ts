import { createRoute } from 'honox/factory'
import { createMiddleware } from 'hono/factory'
import { checksupabaseAuth } from '../utils/checksupabaseAuth';

export const supabaseMiddleware = createMiddleware(async (c, next) => {
    if (c.req.path.startsWith('/auth')) {
        const f = await checksupabaseAuth(c)
        if (f) {
            await next()
            return
        } else {
            return c.redirect('/', 303)
        }
    }
    await next()
})

export default createRoute(supabaseMiddleware)
