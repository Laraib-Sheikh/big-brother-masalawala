"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatMoney } from "@/lib/money";
import { useCart } from "./cart-provider";
import { Button, ButtonLink } from "@/components/ui/button";

function IconButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...rest } = props;
  return (
    <button
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...rest}
    />
  );
}

export function CartDrawer() {
  const cart = useCart();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">Open cart</span>
          {cart.hydrated && cart.itemCount > 0 ? (
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-semibold text-brand-foreground">
              {cart.itemCount}
            </span>
          ) : null}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px]" />
        <Dialog.Content className="fixed right-0 top-0 z-50 h-dvh w-full max-w-md border-l border-border bg-background p-5 shadow-2xl">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold">
              Shopping Cart
            </Dialog.Title>
            <Dialog.Close asChild>
              <IconButton aria-label="Close cart">
                <X className="h-4 w-4" />
              </IconButton>
            </Dialog.Close>
          </div>

          <div className="mt-5 flex h-[calc(100dvh-88px)] flex-col">
            {cart.items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <div className="text-sm font-medium">Your cart is empty</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Add a few items and come back here.
                </div>
                <div className="mt-5">
                  <Dialog.Close asChild>
                    <ButtonLink href="/products" variant="primary">
                      Continue shopping
                    </ButtonLink>
                  </Dialog.Close>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto pr-1">
                  <ul className="space-y-4">
                    {cart.items.map((it) => {
                      return (
                        <li
                          key={it.productId}
                          className="flex gap-3 rounded-2xl border border-border bg-card p-3"
                        >
                          <Link
                            href={`/products/${it.slug}`}
                            className="shrink-0"
                          >
                            <Image
                              src={it.imageSrc}
                              alt={it.title}
                              width={72}
                              height={72}
                              className="h-[72px] w-[72px] rounded-xl border border-border bg-muted object-cover"
                            />
                          </Link>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <Link
                                  href={`/products/${it.slug}`}
                                  className="line-clamp-1 text-sm font-semibold hover:underline"
                                >
                                  {it.title}
                                </Link>
                                <div className="mt-1 text-sm text-muted-foreground">
                                  {formatMoney(it.priceCents)} · Qty {it.quantity}
                                </div>
                              </div>
                              <button
                                onClick={() => cart.removeItem(it.productId)}
                                className="text-sm text-muted-foreground hover:text-foreground"
                              >
                                Remove
                              </button>
                            </div>

                            <div className="mt-3 flex items-center gap-2">
                              <button
                                className="h-9 w-9 rounded-full border border-border hover:bg-muted"
                                onClick={() =>
                                  cart.setQuantity(it.productId, it.quantity - 1)
                                }
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <input
                                className="h-9 w-14 rounded-full border border-border bg-background text-center text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                value={it.quantity}
                                inputMode="numeric"
                                onChange={(e) =>
                                  cart.setQuantity(
                                    it.productId,
                                    Number(e.target.value || 0),
                                  )
                                }
                                aria-label="Quantity"
                              />
                              <button
                                className="h-9 w-9 rounded-full border border-border hover:bg-muted"
                                onClick={() =>
                                  cart.setQuantity(it.productId, it.quantity + 1)
                                }
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-5 border-t border-border pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">Subtotal</div>
                    <div className="font-semibold">
                      {formatMoney(cart.subtotalCents)}
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Dialog.Close asChild>
                      <ButtonLink href="/products" variant="outline" className="flex-1">
                        Keep shopping
                      </ButtonLink>
                    </Dialog.Close>
                    <Dialog.Close asChild>
                      <ButtonLink
                        href="/checkout"
                        variant="primary"
                        className="flex-1"
                      >
                        Checkout
                      </ButtonLink>
                    </Dialog.Close>
                  </div>
                  <button
                    className="mt-3 w-full text-sm text-muted-foreground hover:text-foreground"
                    onClick={cart.clear}
                  >
                    Clear cart
                  </button>
                </div>
              </>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

