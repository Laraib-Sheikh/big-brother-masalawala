"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

function IconButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...rest } = props;
  return (
    <button
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...rest}
    />
  );
}

export function MobileMenu() {
  const links: Array<{ href: string; label: string }> = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/#best-sellers", label: "Best Sellers" },
    { href: "/#blog", label: "Blog" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px]" />
        <Dialog.Content className="fixed left-0 top-0 z-50 h-dvh w-[88%] max-w-sm border-r border-border bg-background p-5 shadow-2xl">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-sm font-semibold tracking-wide">
              Menu
            </Dialog.Title>
            <Dialog.Close asChild>
              <IconButton aria-label="Close menu">
                <X className="h-5 w-5" />
              </IconButton>
            </Dialog.Close>
          </div>

          <nav className="mt-6">
            <ul className="space-y-1">
              {links.map((l: (typeof links)[number]) => (
                <li key={l.href}>
                  <Dialog.Close asChild>
                    <Link
                      href={l.href}
                      className="block rounded-xl px-4 py-3 text-base font-medium hover:bg-muted"
                    >
                      {l.label}
                    </Link>
                  </Dialog.Close>
                </li>
              ))}
            </ul>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

