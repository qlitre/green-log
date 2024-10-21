import { useState } from "hono/jsx";
import type { FC } from 'hono/jsx'

type Data = {
    error?: Record<string, string[] | undefined>
    comment?: string;
    photoKey1?: string;
    photoKey2?: string;
    photoKey3?: string
}

type Props = {
    plantId: string
}

type KeyNum = 1 | 2 | 3


export const PlantLogCreateForm: FC<{ data?: Data, props: Props }> = ({ data, props }) => {
    const [photoKey1, setPhotoKey1] = useState(data?.photoKey1 || '');
    const [photoKey2, setPhotoKey2] = useState(data?.photoKey2 || '');
    const [photoKey3, setPhotoKey3] = useState(data?.photoKey3 || '');


    const FileInput = (keyNum: number) => {
        return (
            <div>
                <label htmlFor="photo1" class="block text-gray-700 text-sm font-bold mb-2">Photo{keyNum}</label>
                <input
                    id={`photo${keyNum}`}
                    type="file"
                    onChange={(event) => handleFileUpload(event, keyNum)}
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {data?.error?.[`photoKey${keyNum}`] && (
                    <p className="text-red-500 text-xs italic">
                        {data.error[`photoKey${keyNum}`]}
                    </p>
                )}
            </div>
        )
    }

    const FileForm = (keyNum: KeyNum) => {
        const d = { 1: photoKey1, 2: photoKey2, 3: photoKey3 }
        return (
            <input
                id={`photoKey${keyNum}`}
                type="hidden"
                name={`photoKey${keyNum}`}
                value={d[keyNum]}
            />

        )
    }

    const handleFileUpload = async (event: Event, keyNum: KeyNum) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];

        if (!file) {
            console.log('No file selected');
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
                if (keyNum == 1) setPhotoKey1(key)
                if (keyNum == 2) setPhotoKey2(key)
                if (keyNum == 3) setPhotoKey3(key)

            };
        }
    };

    const actionUrl = `/auth/plant/${props.plantId}/create`
    return (
        <div class="container mx-auto mt-10">
            <h1 class="text-3xl font-bold mb-8 text-center">Create Plant Log</h1>
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                    {FileInput(1)}
                    {FileForm(1)}
                    {FileInput(2)}
                    {FileForm(2)}
                    {FileInput(3)}
                    {FileForm(3)}
                    <div class="flex items-center justify-between">
                        <button
                            type="submit"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
