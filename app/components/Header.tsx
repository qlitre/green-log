import { useRequestContext } from "hono/jsx-renderer";
import { checksupabaseAuth } from "../utils/checksupabaseAuth";
import { config } from '../settings/siteSettings'
import { ButtonLink } from "./common/ButtonLink";

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
                            <div className="space-x-4"> {/* ボタン間に余白を追加 */}
                                <ButtonLink href="/auth/plant/create">投稿</ButtonLink>
                                <ButtonLink href="/auth/logout">ログアウト</ButtonLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
