"use client";

import * as React from "react";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";

export function AddToCartButton({
  product,
  disabled,
}: {
  product: {
    productId: string;
    slug: string;
    title: string;
    imageSrc: string;
    priceCents: number;
  };
  disabled?: boolean;
}) {
  const cart = useCart();
  const [added, setAdded] = React.useState(false);

  return (
    <Button
      type="button"
      variant={added ? "outline" : "primary"}
      className="w-full"
      disabled={disabled}
      onClick={() => {
        cart.addItem(product, 1);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 900);
      }}
    >
      {disabled ? "Sold out" : added ? "Added" : "Add to cart"}
    </Button>
  );
}

