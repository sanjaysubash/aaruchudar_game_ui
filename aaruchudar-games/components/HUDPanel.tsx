import { cn } from "./utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export default function HUDPanel({ title, subtitle, className, children, ...props }: Props) {
  return (
    <div className={cn("glass border-neon rounded-xl p-4 md:p-5", className)} {...props}>
      {(title || subtitle) && (
        <div className="mb-3 flex items-baseline justify-between">
          {title && <h3 className="text-xs tracking-widest text-[var(--color-muted)]">{title}</h3>}
          {subtitle && <span className="text-[10px] uppercase text-[var(--color-muted)]">{subtitle}</span>}
        </div>
      )}
      {children}
    </div>
  );
}
