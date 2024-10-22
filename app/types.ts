export type Plant = {
    id: string;
    name: string;
    species?: string;
    description?: string;
    thumbnail_key?: string
    created_at: string;
    updated_at: string;
};


export type PlantLog = {
    id: string;
    plant_id: string;
    comment: string;
    created_at: string;
    updated_at: string;
};

export type PlantPhoto = {
    id: string;
    plant_log_id: string;
    photo_key: string;
    created_at: string;
    updated_at: string;
}
