import { useState } from "hono/jsx";
import type { FC } from 'hono/jsx'
import { Button } from '../components/common/Button'
import { photoUrlTop } from "../settings/siteSettings";
import { ImageInput } from "../components/common/ImageInput";

type Data = {
    error?: Record<string, string[] | undefined>
    name?: string;
    species?: string;
    thumbnail_key?: string;
    description?: string
}

export const PlantCreateForm: FC<{ data?: Data }> = ({ data }) => {
    const [thumbnailKey, setThumbnailKey] = useState(data?.thumbnail_key || '');
    const [fileUploadError, setFileUploadError] = useState('')
    const [thumbnailPreview, setThumbnailPreview] = useState('');

    const handleFileUpload = async (event: Event) => {
        setFileUploadError('')
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (!file) {
            setFileUploadError('No file selected')
            return;
        }
        const formData = new FormData();
        formData.append('filename', file);
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        const result: { success: boolean, key?: string, error?: string } = await response.json();
        if (result.success) {
            const key = result.key
            if (key) {
                setThumbnailKey(key);
                const photoUrl = photoUrlTop + '/' + key
                setThumbnailPreview(photoUrl)
            }
        } else {
            setFileUploadError(result.error ?? '')
            target.value = ''
        }
    };
    return (
        <div class="container mx-auto mt-10">
            <h1 class="text-3xl font-bold mb-8 text-center">Create Plant</h1>
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <form method="post" action='/auth/plant/create' encType="multipart/form-data" class="space-y-6">
                    <div>
                        <label htmlFor="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={data?.name}
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {data?.error?.name && <p class="text-red-500 text-xs italic">{data.error.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="species" class="block text-gray-700 text-sm font-bold mb-2">Species</label>
                        <input
                            id="species"
                            type="text"
                            name="species"
                            value={data?.species}
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {data?.error?.species && <p class="text-red-500 text-xs italic">{data.error.species}</p>}
                    </div>
                    <div>
                        <label htmlFor="description" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea
                            id="description"
                            type="text"
                            name="description"
                            value={data?.description}
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {data?.error?.description && <p class="text-red-500 text-xs italic">{data.error.description}</p>}
                    </div>
                    <div>
                        <ImageInput title="サムネイル" inputId="thumbnail_file" thumbnailPreview={thumbnailPreview} onChange={handleFileUpload} />
                        {data?.error?.thumbnail_key && <p class="text-red-500 text-xs italic">{data.error.thumbnail_key}</p>}
                        {fileUploadError && <p class="text-red-500 text-xs italic">{fileUploadError}</p>}
                    </div>

                    {/* サムネイルURLが自動で入力される */}
                    <input
                        id="thumbnail_key"
                        type="hidden"
                        name="thumbnail_key"
                        value={thumbnailKey}
                    />
                    <div class="flex items-center justify-between">
                        <Button type="submit">Create</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
