const buttonSizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-2 py-1 text-sm",
    md: "px-2.5 py-1.5 text-sm",
    lg: "px-3 py-2 text-sm",
    xl: "px-3.5 py-2.5 text-sm",
};

const buttonVariants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500",
    secondary: "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
    primaryDark: "bg-indigo-500 text-white hover:bg-indigo-400",
    secondaryDark: "bg-white/10 text-white hover:bg-white/20",
    soft: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
    rounded: "rounded-full bg-indigo-600 text-white hover:bg-indigo-500",
};

type ButtonProps = {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    variant?: "primary" | "secondary" | "primaryDark" | "secondaryDark" | "soft" | "rounded";
    children: string;
};

export const Button = ({ size = "md", variant = "primary", children }: ButtonProps) => {
    return (
        <button
            type="button"
            className={`rounded ${buttonSizes[size]} ${buttonVariants[variant]} font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 inline-flex items-center gap-x-1.5`}
        >
            {children}
        </button>
    );
};