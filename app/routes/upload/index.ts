import { createRoute } from 'honox/factory'

export const POST = createRoute(async (c) => {
    const formData = await c.req.parseBody();
    const file = formData['filename'];  // ファイルの取得

    // ファイルが存在し、File オブジェクトかどうかを確認
    if (!file || typeof file === 'string') {
        return c.json({ success: false, error: 'No valid file uploaded' }, 400);
    }

    const originalName = file.name
    const key = `${crypto.randomUUID()}_${originalName}`;
    // R2 にファイルをアップロード
    await c.env.MY_BUCKET.put(key, file);
    console.log('Uploading file to R2');

    return c.json({ success: true, key: key });
});