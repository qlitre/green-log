
import { useRequestContext } from "hono/jsx-renderer";
import { checksupabaseAuth } from "../utils/checksupabaseAuth";

export const Header = async () => {
    const c = useRequestContext()
    const f = await checksupabaseAuth(c)
    return (
        <header className="p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">
                    <a href="/" className="hover:text-gray-300">
                        Green Log
                    </a>
                </div>
                <div>
                    <div>
                        {f && (
                            <a href="/auth/plant/create" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                投稿
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
