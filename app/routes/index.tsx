import { createRoute } from 'honox/factory'
import { findAllPlants } from '../db'
import { PlantCard } from '../components/PlantCard'

export default createRoute(async (c) => {
  const plants = await findAllPlants(c.env.DB)
  return c.render(
    <div className='c-container '>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Plants</h2>
      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 xl:gap-x-8">
        {plants.map((plant) => (
          <PlantCard plant={plant} />
        ))}
      </div>
    </div>,
    {}
  )
})