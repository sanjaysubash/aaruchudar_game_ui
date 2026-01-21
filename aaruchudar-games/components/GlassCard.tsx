"use client";
import { motion } from "framer-motion";
import { cn } from "./utils";
import type { ComponentProps } from "react";

interface ExtraProps {
  hoverGlow?: boolean;
}

type MotionDivProps = ComponentProps<typeof motion.div>;

type Props = ExtraProps & Omit<MotionDivProps, "className" | "children"> & {
  className?: string;
  children?: React.ReactNode;
};

export default function GlassCard({ className, hoverGlow = true, children, ...props }: Props) {
  return (
    <motion.div
      whileHover={hoverGlow ? { scale: 1.005 } : undefined}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "glass border-soft rounded-xl p-5 relative overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
