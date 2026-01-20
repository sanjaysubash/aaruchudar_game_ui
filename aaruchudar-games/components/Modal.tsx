"use client";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "./utils";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Modal({ open, onClose, title, children, className }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className={cn("relative w-[90vw] max-w-lg glass-strong border-soft rounded-xl p-6 r-gap", className)}>
        <div className="flex items-center justify-between">
          {title && <h3 className="text-sm tracking-widest text-[var(--color-muted)]">{title}</h3>}
          <button onClick={onClose} aria-label="Close" className="p-1 rounded hover:bg-white/5">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
