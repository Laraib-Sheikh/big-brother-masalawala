"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/cn";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-10 w-[7.25rem] shrink-0 animate-pulse rounded-full bg-muted",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <select
      aria-label="Color theme"
      value={theme ?? "system"}
      onChange={(e) => setTheme(e.target.value)}
      className={cn(
        "h-10 max-w-full cursor-pointer rounded-full border border-border bg-background px-3 text-xs font-medium text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
