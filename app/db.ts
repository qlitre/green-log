import type { Plant, PlantLog, PlantPhoto } from "./types";

export const findAllPlants = async (db: D1Database) => {
    const { results } = await db.prepare('SELECT * FROM plants ORDER BY created_at DESC').all<Plant>()
    const plants = results
    return plants
}

export const createPlant = async (db: D1Database, plant: Pick<Plant, 'name' | 'thumbnail_key' | 'species' | 'description'>) => {
    const id = crypto.randomUUID()
    const { results } = await db
        .prepare('INSERT INTO plants(id, name, thumbnail_key, species, description) VALUES(?, ?, ?, ?, ?)')
        .bind(id, plant.name, plant.thumbnail_key, plant.species, plant.description)
        .run()
    const newPlant = results
    return newPlant
}


export const findPlantById = async (db: D1Database, id: string) => {
    const plant = await db.prepare('SELECT * FROM plants WHERE id = ?').bind(id).first<Plant>()
    return plant
}

export const findPlantLogsByPlantId = async (db: D1Database, plant_id: string) => {
    const { results } = await db.prepare('SELECT * FROM plant_logs WHERE plant_id = ? ORDER BY created_at DESC')
        .bind(plant_id)
        .all<PlantLog>();
    const plantLogs = results;
    return plantLogs;
}


export const findPlantPhotosByPlantLogId = async (db: D1Database, plant_log_id: string) => {
    const { results } = await db.prepare('SELECT * FROM plant_photos WHERE plant_log_id = ? ORDER BY created_at DESC')
        .bind(plant_log_id)
        .all<PlantPhoto>();
    const plantPhotos = results;
    return plantPhotos;
}


export const createPlantLog = async (db: D1Database, plantLog: Pick<PlantLog, 'id' | 'plant_id' | 'comment'>) => {
    const { results } = await db
        .prepare(`INSERT INTO plant_logs(id, plant_id, comment) VALUES(?, ?, ?)`)
        .bind(plantLog.id, plantLog.plant_id, plantLog.comment)
        .run()
    const newPlantLog = results

    return newPlantLog
}

export const createPlantPhoto = async (db: D1Database, plantPhoto: Pick<PlantPhoto, 'plant_log_id' | 'photo_key'>) => {
    const id = crypto.randomUUID()
    const { results } = await db
        .prepare('INSERT INTO plant_photos(id, plant_log_id, photo_key) VALUES(?, ?, ?)')
        .bind(id, plantPhoto.plant_log_id, plantPhoto.photo_key)
        .run()
    const newPhoto = results
    return newPhoto
}
