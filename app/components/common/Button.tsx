import type { BaseProps } from '../../@types/common';
import { buttonSizes, buttonVariants } from '../../styles/buttonStyles'


type Props = BaseProps & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    variant?: "primary" | "secondary" | "primaryDark" | "secondaryDark" | "soft" | "rounded";
    type: 'button' | 'submit'
    children: string;
};

export const Button = (props: Props) => {
    const _variant = props.variant ?? 'primary'
    const _size = props.size ?? 'md'
    const commonClasses = `rounded ${buttonSizes[_size]} ${buttonVariants[_variant]} font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 inline-flex items-center gap-x-1.5 text-center`;
    return (
        <button
            type={props.type}
            className={`${props.className ?? ''} ${commonClasses}`}
        >
            {props.children}
        </button>
    );
};