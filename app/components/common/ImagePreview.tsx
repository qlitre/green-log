type Props = {
    imgUrl?: string
}

export const ImagePreview = (props: Props) => {
    return (
        <div
            className="mt-2 border-2 border-dashed rounded-lg p-4 flex items-center justify-center"
            style={{ width: '300px', height: '200px' }}>
            {props.imgUrl ? (
                <img
                    src={props.imgUrl}
                    alt="Thumbnail Preview"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
            ) : (
                <p className="text-gray-500">プレビュー</p>
            )}
        </div>
    )
}