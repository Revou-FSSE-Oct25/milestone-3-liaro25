"use client";

import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => addToCart(product, 1)}
      className="mt-6 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800"
    >
      Add to Cart
    </button>
  );
}
