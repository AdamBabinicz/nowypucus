"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

// Statyczne mapowanie klas Tailwinda (co 10%) - Tailwind widzi pełne, statyczne nazwy klas podczas kompilacji!
const getProgressTranslateClass = (value: number) => {
  const clamped = Math.max(0, Math.min(100, value));
  if (clamped >= 100) return "-translate-x-0";
  if (clamped >= 90) return "-translate-x-[10%]";
  if (clamped >= 80) return "-translate-x-[20%]";
  if (clamped >= 70) return "-translate-x-[30%]";
  if (clamped >= 60) return "-translate-x-[40%]";
  if (clamped >= 50) return "-translate-x-[50%]";
  if (clamped >= 40) return "-translate-x-[60%]";
  if (clamped >= 30) return "-translate-x-[70%]";
  if (clamped >= 20) return "-translate-x-[80%]";
  if (clamped >= 10) return "-translate-x-[90%]";
  return "-translate-x-full";
};

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const translateClass = getProgressTranslateClass(value || 0);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 bg-primary transition-all duration-300",
          translateClass,
        )}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
