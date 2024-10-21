import { config } from '../settings/siteSettings'

type Props = {
    url: string;
    title: string;
}

export const ShareX = ({ url, title }: Props) => {
    const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${url}&via=${config.twitterID}`;
    return (
        <>
            <a
                className="inline-flex items-center justify-center gap-2 text-white bg-black bg-opacity-90 px-4 h-10 rounded-md text-sm transition-colors hover:bg-opacity-70"
                href={twitterLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img className="w-5 h-5" src="/static/xlogo.svg" alt="xLogo" />
                <span>SHARE</span>
            </a>
        </>
    );
}
