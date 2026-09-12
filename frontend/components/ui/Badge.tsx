import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "sky" | "amber" | "slate" | "emerald" | "outline";
}

export function Badge({
  className,
  variant = "sky",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-colors";

  const variants = {
    sky: "bg-sky-50 text-sky-700 border border-sky-200",
    amber: "bg-amber-50 text-amber-800 border border-amber-200",
    slate: "bg-slate-100 text-slate-700 border border-slate-200",
    emerald: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    outline: "border border-slate-300 text-slate-600 bg-white",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
