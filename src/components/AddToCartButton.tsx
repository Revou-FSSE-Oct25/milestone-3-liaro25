"use client";

import type { Product } from "@/types/products";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => addItem(product, 1)}
      className="mt-8 w-full rounded-lg bg-black px-4 py-3 text-white hover:opacity-90 transition"
    >
      Add to Cart
    </button>
  );
}
