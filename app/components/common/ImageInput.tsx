import { BaseProps } from "../../@types/common"

type Props = BaseProps & {
    title: string
    inputId: string
    thumbnailPreview: string
    onChange: (event: Event) => Promise<void>;
}


export const ImageInput = (props: Props) => {
    return (
        <>
            <label htmlFor={props.inputId} class="block text-gray-700 text-sm font-bold mb-2">
                {props.title}
            </label>
            <input
                id={props.inputId}
                type="file"
                onChange={props.onChange}
            />
            <div
                className="mt-2 border-2 border-dashed rounded-lg p-4 flex items-center justify-center"
                style={{ width: '300px', height: '200px' }}>
                {props.thumbnailPreview ? (
                    <img
                        src={props.thumbnailPreview}
                        alt="Thumbnail Preview"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                ) : (
                    <p className="text-gray-500">プレビュー</p>
                )}
            </div>
        </>
    )
}