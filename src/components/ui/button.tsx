import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type CommonProps = {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

function styles({
  variant = "primary",
  size = "md",
}: Pick<CommonProps, "variant" | "size">) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

  const variants: Record<NonNullable<CommonProps["variant"]>, string> = {
    primary: "bg-brand text-brand-foreground hover:opacity-90",
    outline:
      "border border-border bg-background text-foreground hover:bg-muted",
    ghost: "text-foreground hover:bg-muted",
  };

  const sizes: Record<NonNullable<CommonProps["size"]>, string> = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return cn(base, variants[variant], sizes[size]);
}

export function Button(
  props: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { variant, size, className, ...rest } = props;
  return (
    <button className={cn(styles({ variant, size }), className)} {...rest} />
  );
}

export function ButtonLink(
  props: CommonProps & React.ComponentProps<typeof Link>,
) {
  const { variant, size, className, ...rest } = props;
  return (
    <Link className={cn(styles({ variant, size }), className)} {...rest} />
  );
}

