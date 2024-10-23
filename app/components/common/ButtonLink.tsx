import type { BaseProps } from '../../@types/common';
import { buttonSizes, buttonVariants } from '../../styles/buttonStyles'


type Props = BaseProps & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    variant?: "primary" | "secondary" | "primaryDark" | "secondaryDark" | "soft" | "rounded";
    href: string
    children: string;
};



export const ButtonLink = (props: Props) => {
    const commonClasses = `rounded ${buttonSizes[props.size??'md']} ${buttonVariants[props.variant??'primary']} font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 inline-flex items-center gap-x-1.5`;
    return (
        <a href={props.href} className={`${props.className ?? ''} ${commonClasses}`}>
            {props.children}
        </a>
    );
};