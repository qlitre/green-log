
import { useRequestContext } from "hono/jsx-renderer";
import { checksupabaseAuth } from "../utils/checksupabaseAuth";
import { config } from '../settings/siteSettings'

export const Header = async () => {
    const c = useRequestContext()
    const f = await checksupabaseAuth(c)
    return (
        <header className="p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">
                    <a href="/" className="hover:text-gray-300">
                        {config.siteTitle}
                    </a>
                </div>
                <div>
                    <div>
                        {f && (
                            <div>
                                <a href="/auth/plant/create" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-4">
                                    投稿
                                </a>
                                <a href="/auth/logout" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                    ログアウト
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
