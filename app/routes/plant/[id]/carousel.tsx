import { createRoute } from 'honox/factory'
import { findPlantById, findPlantLogsByPlantId, findPlantPhotosByPlantLogId } from '../../../db'
import { LinkToHome } from '../../../components/LinkToHome'
import { ShareX } from '../../../components/ShareX'
import { config, photoUrlTop } from '../../../settings/siteSettings'
import { Carousel } from '../../../islands/Carousel'

export default createRoute(async (c) => {
    const id = c.req.param('id')
    const db = c.env.DB
    const plant = await findPlantById(db, id)
    const plantLogs = await findPlantLogsByPlantId(db, id)
    const contentUrl = `${config.siteURL}/plant/${id}/carousel`
    const carouselData = []
    for (const log of plantLogs) {
        const photos = await findPlantPhotosByPlantLogId(c.env.DB, log.id)
        for (const photo of photos) {
            carouselData.push({
                url: photoUrlTop + '/' + photo.photo_key,
                comment: log.comment,
                createdAt: log.created_at
            })
        }
    }
    const twitterTitle = `${plant?.name} | カルーセル`
    const _title = `${plant?.name} | カルーセル`
    const _description = `${plant?.description} | カルーセル`

    return c.render(
        <div className='c-container'>
            <Carousel slides={carouselData}></Carousel>
            <div className="mt-4 flex justify-center items-center">
                <ShareX url={contentUrl} title={twitterTitle}></ShareX>
            </div>
            <div className="flex justify-center mt-16">
                <a className="flex items-center gap-2 transition-colors duration-200 text-lg hover:text-teal-400" href={`/plant/${id}`}>
                    <span>前に戻る</span>
                </a>
            </div>
        </div>, { title: _title, description: _description, contentUrl: contentUrl, thumbnailUrl: photoUrlTop + '/' + plant?.thumbnail_key, ogtype: 'article' }
    )
})
