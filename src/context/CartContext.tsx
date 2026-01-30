"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, qty?: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "revoshop_cart_v1";

function safeParseCart(value: string | null): CartItem[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    // minimal validation
    return parsed
      .filter((x) => x && typeof x.id === "number" && typeof x.quantity === "number")
      .map((x) => ({
        id: x.id,
        title: String(x.title ?? ""),
        price: Number(x.price ?? 0),
        image: String(x.image ?? "/placeholder.png"),
        quantity: Number(x.quantity ?? 1),
      }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage (client only)
  useEffect(() => {
    const stored = safeParseCart(localStorage.getItem(STORAGE_KEY));
    setItems(stored);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, qty: number = 1) => {
    const image = product.images?.[0] || "/placeholder.png";

    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [
        ...prev,
        { id: product.id, title: product.title, price: product.price, image, quantity: qty },
      ];
    });
  };

  const increase = (id: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  };

  const decrease = (id: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const remove = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clear = () => setItems([]);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    totalItems,
    totalPrice,
    addToCart,
    increase,
    decrease,
    remove,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
