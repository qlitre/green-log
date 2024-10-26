import { createRoute } from 'honox/factory'
import { findPlantById, findPlantLogsByPlantId, findPlantPhotosByPlantLogId } from '../../db'
import { LogPhotos } from '../../islands/LogPhotos'
import { jstDatetime } from '../../utils/jstDatetime'
import { checksupabaseAuth } from '../../utils/checksupabaseAuth'
import { LinkToHome } from '../../components/LinkToHome'
import { ShareX } from '../../components/ShareX'
import { config, photoUrlTop } from '../../settings/siteSettings'
import { ButtonLink } from '../../components/common/ButtonLink'
import { Carousel } from '../../islands/Carousel'

export default createRoute(async (c) => {
    const id = c.req.param('id')
    const db = c.env.DB
    const plant = await findPlantById(db, id)
    const plantLogs = await findPlantLogsByPlantId(db, id)
    const logsWithPhotos = await Promise.all(plantLogs.map(async log => {
        const photos = await findPlantPhotosByPlantLogId(db, log.id)
        return { ...log, photos }
    }))
    const f = await checksupabaseAuth(c)
    const contentUrl = `${config.siteURL}/plant/${id}`
    let lstComment = ''
    if (logsWithPhotos.length >= 1) {
        lstComment = logsWithPhotos[0].comment
    }
    let twitterTitle = plant?.name || ''
    if (lstComment) {
        twitterTitle += ' | ' + lstComment.slice(0, 30);
    }

    return c.render(
        <div className='c-container'>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Growth History</h1>
                <div className="space-x-4">
                    <ButtonLink href={`/plant/${id}/carousel`}>
                        View Carousel
                    </ButtonLink>
                    {f && (
                        <ButtonLink href={`/auth/plant/${id}/create`}>
                            Add Log
                        </ButtonLink>
                    )}
                </div>
            </div>

            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                <section className="lg:col-span-7">
                    <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                        {logsWithPhotos.map((log, idx) => (
                            <li key={log.id} className="flex py-6 sm:py-10">
                                <div className="flex-shrink-0">
                                    {log.photos.length >= 1 &&
                                        <LogPhotos images={log.photos}></LogPhotos>
                                    }
                                </div>
                                <div className="ml-4 flex flex-1 flex-col justify-start sm:ml-6">
                                    <p>
                                        {jstDatetime(log.created_at)}
                                    </p>
                                    <p className="mt-4 flex space-x-2 text-gray-700">
                                        {log.comment}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                    <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                        {plant?.name}
                    </h2>
                    <dl className="mt-6 space-y-4">
                        {plant?.description}
                    </dl>
                </section>
            </div>
            <div className="mt-4">
                <ShareX url={contentUrl} title={twitterTitle}></ShareX>
            </div>
            <div>
                <LinkToHome></LinkToHome>
            </div>
        </div>, { title: plant?.name, description: plant?.description, contentUrl: contentUrl, thumbnailUrl: photoUrlTop + '/' + plant?.thumbnail_key, ogtype: 'article' }
    )
})
