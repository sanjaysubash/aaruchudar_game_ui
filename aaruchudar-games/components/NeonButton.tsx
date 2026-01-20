"use client";

import { motion } from "framer-motion";
import { cn } from "@/components/utils";
import { forwardRef } from "react";

import type { ComponentProps } from "react";

type MotionButtonProps = ComponentProps<typeof motion.button>;

interface Props extends Omit<MotionButtonProps, "children" | "className"> {
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export const NeonButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, children, size = "md", ...props }, ref) => {
    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-12 px-8 text-base",
    }[size];

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative inline-flex items-center justify-center rounded-md",
          "panel text-[var(--text-primary)]",
          "border border-[var(--border)]",
          "transition-transform",
          sizes,
          className
        )}
        {...props}
      >
        {/* content layer */}
        <span className={cn("relative z-10 font-medium tracking-wide")}>{children}</span>
      </motion.button>
    );
  }
);
NeonButton.displayName = "NeonButton";
