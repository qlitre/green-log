import { createRoute } from 'honox/factory'
import { createMiddleware } from 'hono/factory'
import { checkauth } from '../utils/checkauth';

export const authMiddleware = createMiddleware(async (c, next) => {
    if (c.req.path.startsWith('/auth')) {
        const f = await checkauth(c)
        if (f) {
            await next()
            return
        } else {
            c.status(403)
            return c.text('403 Forbidden: You do not have permission to access this resource.')
        }
    }
    await next()
})

export default createRoute(authMiddleware)
