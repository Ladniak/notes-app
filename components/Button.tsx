"use client";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger";
    isLoading?: boolean;
}

export default function Button({
    children,
    variant = "primary",
    isLoading = false,
    className,
    ...props
}: ButtonProps) {
    const base = "w-full py-3 rounded-xl font-semibold transition shadow";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
        secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
        danger: "bg-red-600 text-white hover:bg-red-700",
    };

    return (
        <button
            className={cn(base, variants[variant], className)}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? "Loading..." : children}
        </button>
    );
}
