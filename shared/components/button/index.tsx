import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import button from "./index.module.css";

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "warning" | "error" | "info" | "default" | "ghost" | "outline" | "gradient";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  labelClassName?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", isLoading = false, children, labelClassName, ...props }, ref) => {
    const baseClasses = button.base;

    const variantClasses = {
      gradient: button.gradient,
      primary: button.primary,
      warning: button.warning,
      error: button.error,
      info: button.info,
      default: button.default,
      ghost: button.ghost,
      outline: button.outline,
    };

    const sizeClasses = { sm: "px-8 py-2 text-md rounded-md", md: "px-4 py-2.5 text-base", lg: "px-6 py-3 text-lg", icon: "h-8 w-8 p-0" };

    return (
      <button {...props} type={type} ref={ref} className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}>
        {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <p className={labelClassName}>{children}</p>}
      </button>
    );
  }
);

Button.displayName = "Button";
