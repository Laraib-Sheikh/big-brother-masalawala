import * as React from "react";
import { cn } from "@/lib/cn";

export function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> & { className?: string },
) {
  const { className, ...rest } = props;
  return (
    <input
      className={cn(
        "h-11 w-full rounded-full border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...rest}
    />
  );
}

