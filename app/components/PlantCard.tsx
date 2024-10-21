import type { Plant } from '../db'
import { photoUrlTop } from '../settings/siteSettings'

type Props = {
    plant: Plant
}

export const PlantCard = ({ plant }: Props) => {
    const photoUrl = photoUrlTop + '/' + plant.thumbnail_key
    return (
        <div key={plant.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                    alt={plant.name}
                    src={photoUrl}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <a href={`/plant/${plant.id}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {plant.name}
                        </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{plant.description}</p>
                </div>
            </div>
        </div>
    )
}