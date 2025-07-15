import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import button from "./index.module.css";
import { Button as MantineButton } from "@mantine/core";
import type { ButtonProps as MantineButtonProps } from "@mantine/core";

import { cn } from "@/lib/utils";
import useResponsive from "@shared/hooks/useResponsive";

interface IButtonProps extends MantineButtonProps {
  variant?: "blue" | "yellow" | "red" | "orange" | "dark" | "ghost" | "outline" | "gradient" | "outlineBlue";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  labelClassName?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const variantClasses: Record<string, string> = {
  gradient: button.gradient,
  blue: button.blue,
  yellow: button.yellow,
  red: button.red,
  orange: button.orange,
  dark: button.dark,
  ghost: button.ghost,
  outline: button.outline,
  outlineBlue: button.outlineBlue,
};

const sizeClasses = { sm: "px-8 py-2 text-xs rounded-md", md: "px-6 py-2.5 text-sm", lg: "px-6 py-3 text-md", icon: "h-8 w-8 p-0" };

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, variant = "primary", size = "md", type, isLoading = false, children, labelClassName, onClick, ...props }, ref) => {
    const baseClasses = button.base;

    const { isSmallHeight, isSmallWidth } = useResponsive();

    const computedSize = isSmallHeight || isSmallWidth ? "sm" : size;

    return (
      <MantineButton onClick={onClick} {...props} type={type} ref={ref} className={cn(baseClasses, variantClasses[variant], sizeClasses[computedSize], className)}>
        {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <p className={labelClassName}>{children}</p>}
      </MantineButton>
    );
  }
);

Button.displayName = "Button";
