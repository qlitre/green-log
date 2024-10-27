import { useRequestContext } from "hono/jsx-renderer";
import { checksupabaseAuth } from "../utils/checksupabaseAuth";
import { config } from '../settings/siteSettings';
import { ButtonLink } from "./common/ButtonLink";

export const Header = async () => {
    const c = useRequestContext();
    const f = await checksupabaseAuth(c);
    return (
        <header className="p-4 c-wrapper">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-xl font-bold">
                    <a href="/" className="hover:text-gray-600">
                        {config.siteTitle}
                    </a>
                </div>
                <div className="mt-4 md:mt-0">
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 items-center">
                        {f && (
                            <>
                                {/* ボタンをモバイルでは縦並び、デスクトップでは横並びに */}
                                <ButtonLink href="/auth/plant/create">投稿</ButtonLink>
                                <ButtonLink href="/auth/logout">ログアウト</ButtonLink>
                            </>
                        )}
                        <a className="font-bold hover:text-gray-600 text-lg" href={config.repos} target="_blank" rel="noopener noreferrer">
                            GITHUB
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};