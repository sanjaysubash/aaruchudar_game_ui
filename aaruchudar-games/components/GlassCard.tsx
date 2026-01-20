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
      whileHover={hoverGlow ? { scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={cn(
        "glass border-neon rounded-xl p-5 relative overflow-hidden",
        hoverGlow && "neon-border",
        className
      )}
      {...props}
    >
      {/* scanlines overlay */}
      <div className="pointer-events-none absolute inset-0 scanlines rounded-xl" />
      {children}
    </motion.div>
  );
}
