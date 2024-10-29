import { zValidator } from '@hono/zod-validator'
import { createRoute } from 'honox/factory'
import { z } from 'zod'
import { createPlantLog, createPlantPhoto } from '../../../../db'
import { PlantLogCreateForm } from '../../../../islands/PlantLogCreateForm'

const schema = z.object({
    comment: z.string().min(1),
    photoKey1: z.string().min(1),
    photoKey2: z.string(),
    photoKey3: z.string()
});

export default createRoute((c) => {
    const plantId = c.req.param('id')
    const props = { plantId: plantId }
    return c.render(<PlantLogCreateForm props={props} />)
})

export const POST = createRoute(
    zValidator('form', schema, (result, c) => {
        const plantId = c.req.param('id')
        const props = { plantId: plantId }
        if (!result.success) {
            const { comment, photoKey1, photoKey2, photoKey3 } = result.data
            return c.render(<PlantLogCreateForm data={{ comment: comment, photoKeys: [photoKey1, photoKey2, photoKey3], error: result.error.flatten().fieldErrors }} props={props} />)
        }
    }),
    async (c) => {
        const { comment, photoKey1, photoKey2, photoKey3 } = c.req.valid('form')
        const id = crypto.randomUUID()
        const plant_id = c.req.param('id')
        await createPlantLog(c.env.DB, {
            id,
            plant_id,
            comment
        })
        const plant_log_id = id
        const arr = [photoKey1]
        if (photoKey2) arr.push(photoKey2)
        if (photoKey3) arr.push(photoKey3)
        for (const photo_key of arr) {
            await createPlantPhoto(c.env.DB, {
                plant_log_id,
                photo_key
            })
        }

        return c.redirect(`/plant/${plant_id}`, 303)
    }
)
