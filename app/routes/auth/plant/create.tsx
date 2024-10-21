import { zValidator } from '@hono/zod-validator'
import { createRoute } from 'honox/factory'
import { z } from 'zod'
import { createPlant } from '../../../db'
import { PlantCreateForm } from '../../../islands/PlantCreateForm'

const schema = z.object({
    name: z.string().min(1),
    species: z.string().min(1),
    thumbnail_key: z.string().min(1),
    description: z.string().min(1)
});


export default createRoute((c) => {
    return c.render(<PlantCreateForm />)
})

export const POST = createRoute(
    zValidator('form', schema, (result, c) => {
        if (!result.success) {
            const { name, species, thumbnail_key, description } = result.data
            return c.render(<PlantCreateForm data={{ name, species, thumbnail_key, description, error: result.error.flatten().fieldErrors }} />)
        }
    }),
    async (c) => {
        const { name, species, thumbnail_key, description } = c.req.valid('form')
        await createPlant(c.env.DB, {
            name,
            species,
            thumbnail_key,
            description
        })
        return c.redirect('/', 303)
    }
)
