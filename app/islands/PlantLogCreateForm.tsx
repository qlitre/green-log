import { useState } from "hono/jsx";
import type { FC } from 'hono/jsx'
import { Button } from "../components/common/Button";
import { photoUrlTop } from "../settings/siteSettings";
import { ImageInput } from "../components/common/ImageInput";

type Data = {
    error?: Record<string, string[] | undefined>
    comment?: string;
    photoKeys?: string[];
}

type Props = {
    plantId: string
}

export const PlantLogCreateForm: FC<{ data?: Data, props: Props }> = ({ data, props }) => {
    const [photoKeys, setPhotoKeys] = useState(data?.photoKeys || ['', '', ''])
    const [fileUploadErrors, setFileUploadErrors] = useState(['', '', ''])
    const [thumbnailPreviews, setThumbnailPreviews] = useState(['', '', ''])

    const handleFileUpload = async (event: Event, index: number) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        const newErrors = [...fileUploadErrors]
        const newPhotoKeys = [...photoKeys]
        const newThumbnailPreviews = [...thumbnailPreviews]

        if (!file) {
            newErrors[index] = 'No file Selected'
            setFileUploadErrors(newErrors)
            newPhotoKeys[index] = '';
            setPhotoKeys(newPhotoKeys)
            newThumbnailPreviews[index] = '';
            setThumbnailPreviews(newThumbnailPreviews)
            return;
        }
        const formData = new FormData();
        formData.append('filename', file);

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        const result: { success: boolean, key?: string, error?: string } = await response.json();
        if (result.success && result.key) {
            newErrors[index] = ''
            setFileUploadErrors(newErrors)
            newPhotoKeys[index] = result.key;
            setPhotoKeys(newPhotoKeys)
            const photoUrl = photoUrlTop + '/' + result.key
            newThumbnailPreviews[index] = photoUrl;
            setThumbnailPreviews(newThumbnailPreviews)
        } else {
            target.value = ''
            newErrors[index] = result.error ?? '';
            setFileUploadErrors(newErrors)
            newPhotoKeys[index] = '';
            setPhotoKeys(newPhotoKeys)
            newThumbnailPreviews[index] = '';
            setThumbnailPreviews(newThumbnailPreviews)
        }
    };

    const actionUrl = `/auth/plant/${props.plantId}/create`
    return (
        <div class="c-container">
            <h1 class="text-3xl font-bold mb-8 text-center">Create Plant Log</h1>
            <form method="post" action={actionUrl} encType="multipart/form-data" class="space-y-6">
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
                        Add your comment
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="comment"
                            name="comment"
                            rows={4}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue={''}
                        />
                    </div>
                </div>
                <div className='flex flex-col space-y-4 lg:flex-row lg:space-x-8 lg:space-y-0'>
                    {photoKeys.map((photoKey, index) => (
                        <div key={index}>
                            <div>
                                <ImageInput title={`Photo${index + 1}`} inputId={`photo${index + 1}`} thumbnailPreview={thumbnailPreviews[index]} onChange={(event) => handleFileUpload(event, index)} />
                                {data?.error?.[`photoKey${index + 1}`] && (
                                    <p className="text-red-500 text-xs italic">{data.error[`photoKey${index + 1}`]}</p>
                                )}
                                {fileUploadErrors[index] && (
                                    <p className="text-red-500 text-xs italic">{fileUploadErrors[index]}</p>
                                )}
                            </div>
                            <input
                                type="hidden"
                                name={`photoKey${index + 1}`}
                                value={photoKey}
                            />
                        </div>
                    ))}
                </div>
                <div class="flex items-center justify-between">
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </div>
    )
}
