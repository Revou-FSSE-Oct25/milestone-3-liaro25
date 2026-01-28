"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type { CartItem, Product } from "@/types/products";

// 1) Define what data + functions the Cart Context will expose
type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: number) => void;
  updateQty: (productId: number, qty: number) => void;
  clearCart: () => void;

  // Helpful derived values
  totalItems: number;
  totalPrice: number;
};

// 2) Create the context (starts as undefined to force proper Provider usage)
const CartContext = createContext<CartContextValue | undefined>(undefined);

// 3) Provider component wraps the app so any component can access cart
export function CartProvider({ children }: { children: React.ReactNode }) {
  // Store cart items in state (in-memory for now)
  const [items, setItems] = useState<CartItem[]>([]);

  // Add item to cart; if item exists, increase quantity
  function addItem(product: Product, qty: number = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);

      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }

      return [...prev, { ...product, quantity: qty }];
    });
  }

  // Remove item completely from cart
  function removeItem(productId: number) {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  }

  // Update quantity (if qty <= 0, remove item)
  function updateQty(productId: number, qty: number) {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => i.id !== productId);

      return prev.map((i) => (i.id === productId ? { ...i, quantity: qty } : i));
    });
  }

  // Clear all items
  function clearCart() {
    setItems([]);
  }

  // Derived totals (computed from items)
  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  // Memoize value to avoid unnecessary re-renders
  const value: CartContextValue = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [items, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 4) Custom hook for consuming the cart context safely
export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }

  return ctx;
}
