import { createRoute } from 'honox/factory'

export const POST = createRoute(async (c) => {
    const formData = await c.req.parseBody();
    const file = formData['filename'];  // ファイルの取得

    // ファイルが存在し、File オブジェクトかどうかをチェック
    if (!file || typeof file === 'string') {
        return c.json({ success: false, error: 'No valid file uploaded' }, 400);
    }


    // 画像ファイルかどうかをチェック
    const originalName = file.name
    const ext = originalName.split('.').pop()?.toLocaleLowerCase()
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    if (!ext || !allowedExtensions.includes(ext)) {
        return c.json({ success: false, error: 'Invalid file type. Only image files are allowed' }, 400);
    }

    // ファイルサイズをチェック (1MB以下かどうか)
    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB = 1,048,576 bytes
    if (file.size > MAX_FILE_SIZE) {
        return c.json({ success: false, error: 'File size exceeds 1MB limit' }, 400);
    }

    const key = `${crypto.randomUUID()}_${originalName}`;
    // R2 にファイルをアップロード
    await c.env.MY_BUCKET.put(key, file);
    console.log('Uploading file to R2');

    return c.json({ success: true, key: key });
});