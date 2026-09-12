import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: "sky" | "amber" | "slate" | "emerald";
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  badge,
  badgeVariant = "sky",
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: SectionHeadingProps) {
  const alignments = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mb-12", alignments[align], className)}>
      {badge && (
        <Badge variant={badgeVariant} className="mb-3.5">
          {badge}
        </Badge>
      )}
      <h2
        className={cn(
          "text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-slate-900 tracking-tight leading-tight",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
