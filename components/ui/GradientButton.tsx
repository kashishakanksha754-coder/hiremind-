import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  size?: "default" | "lg" | "sm";
}

const sizes = {
  sm: "h-9 px-4 text-sm",
  default: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

export const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, asChild, size = "default", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold text-white transition-all",
          "bg-gradient-to-r from-accent-blue to-accent-violet",
          "hover:shadow-lg hover:shadow-blue-500/30 hover:brightness-110",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
          "disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
GradientButton.displayName = "GradientButton";
