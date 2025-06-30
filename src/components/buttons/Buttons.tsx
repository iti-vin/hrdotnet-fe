import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button as MantineButton } from "@mantine/core";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "warning" | "error" | "info" | "default" | "ghost" | "outline" | "gradient";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "primary", size = "md", type = "button", isLoading = false, children, ...props }, ref) => {
  const baseClasses =
    "flex items-center justify-center font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none h-12";

  const variantClasses = {
    gradient: "border-none custom-gradient text-white",
    primary: "bg-[#FF6266] text-white hover:bg-[#e65358]",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    error: "bg-red-500 text-white hover:bg-red-600",
    info: "bg-blue-500 text-white hover:bg-blue-600",
    default: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    outline: "border border-gray-300 text-gray-800 bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-white/10",
  };

  const sizeClasses = { sm: "px-8 py-2 text-md rounded-md", md: "px-4 py-2.5 text-base", lg: "px-6 py-3 text-lg", icon: "h-8 w-8 p-0" };

  return (
    <MantineButton {...props} type={type} ref={ref} className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}>
      {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : children}
    </MantineButton>
  );
});

Button.displayName = "Button";
