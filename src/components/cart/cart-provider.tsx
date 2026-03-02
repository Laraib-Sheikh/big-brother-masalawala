"use client";

import * as React from "react";

export type CartItem = {
  productId: string;
  slug: string;
  title: string;
  imageSrc: string;
  priceCents: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  hydrated: boolean;
};

type StoredCart = {
  items: Array<{
    productId: unknown;
    slug: unknown;
    title: unknown;
    imageSrc: unknown;
    priceCents: unknown;
    quantity: unknown;
  }>;
};

type CartContextValue = {
  hydrated: boolean;
  items: CartItem[];
  itemCount: number;
  subtotalCents: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);
const STORAGE_KEY = "mw.cart.v1";

function clampQuantity(quantity: number) {
  if (!Number.isFinite(quantity)) return 1;
  return Math.max(1, Math.min(99, Math.floor(quantity)));
}

function computeSubtotalCents(items: CartItem[]) {
  return items.reduce((sum, it) => sum + it.priceCents * it.quantity, 0);
}

function computeItemCount(items: CartItem[]) {
  return items.reduce((sum, it) => sum + it.quantity, 0);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<CartState>({
    items: [],
    hydrated: false,
  });

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setState({ items: [], hydrated: true });
        return;
      }
      const parsed = JSON.parse(raw) as unknown;
      const stored: StoredCart | null =
        typeof parsed === "object" &&
        parsed !== null &&
        "items" in parsed &&
        Array.isArray((parsed as { items: unknown }).items)
          ? (parsed as StoredCart)
          : null;
      const items =
        stored?.items
          ? stored.items
              .map((it) => ({
                productId: typeof it.productId === "string" ? it.productId : "",
                slug: typeof it.slug === "string" ? it.slug : "",
                title: typeof it.title === "string" ? it.title : "",
                imageSrc: typeof it.imageSrc === "string" ? it.imageSrc : "",
                priceCents:
                  typeof it.priceCents === "number"
                    ? it.priceCents
                    : Number(it.priceCents),
                quantity:
                  typeof it.quantity === "number" ? it.quantity : Number(it.quantity),
              }))
              .filter(
                (it) =>
                  it.productId &&
                  it.slug &&
                  it.title &&
                  it.imageSrc &&
                  Number.isFinite(it.priceCents) &&
                  it.quantity > 0,
              )
              .map((it) => ({
                productId: it.productId,
                slug: it.slug,
                title: it.title,
                imageSrc: it.imageSrc,
                priceCents: it.priceCents,
                quantity: clampQuantity(it.quantity),
              }))
          : [];
      setState({ items, hydrated: true });
    } catch {
      setState({ items: [], hydrated: true });
    }
  }, []);

  React.useEffect(() => {
    if (!state.hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
  }, [state.hydrated, state.items]);

  const value = React.useMemo<CartContextValue>(() => {
    const addItem = (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setState((prev) => {
        const nextQty = clampQuantity(quantity);
        const existing = prev.items.find((i) => i.productId === item.productId);
        if (!existing) {
          return {
            ...prev,
            items: [...prev.items, { ...item, quantity: nextQty }],
          };
        }
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: clampQuantity(i.quantity + nextQty) }
              : i,
          ),
        };
      });
    };

    const removeItem = (productId: string) => {
      setState((prev) => ({
        ...prev,
        items: prev.items.filter((i) => i.productId !== productId),
      }));
    };

    const setQuantity = (productId: string, quantity: number) => {
      setState((prev) => {
        if (quantity <= 0) {
          return { ...prev, items: prev.items.filter((i) => i.productId !== productId) };
        }
        const q = clampQuantity(quantity);
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.productId === productId ? { ...i, quantity: q } : i,
          ),
        };
      });
    };

    const clear = () => setState((prev) => ({ ...prev, items: [] }));

    return {
      hydrated: state.hydrated,
      items: state.items,
      itemCount: computeItemCount(state.items),
      subtotalCents: computeSubtotalCents(state.items),
      addItem,
      removeItem,
      setQuantity,
      clear,
    };
  }, [state.hydrated, state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

