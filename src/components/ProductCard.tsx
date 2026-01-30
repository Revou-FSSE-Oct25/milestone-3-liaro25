"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const imageUrl = product.images?.[0] || "/placeholder.png";

  return (
    <article className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
<Image
  src={imageUrl}
  alt={product.title}
  fill
  sizes="(max-width: 768px) 100vw, 33vw"
  className="object-cover"
  unoptimized
/>
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-semibold">{product.title}</h3>
        <p className="font-bold">${product.price}</p>

        <div className="mt-3 flex gap-2">
          {/* VIEW DETAIL */}
          <Link
            href={`/products/${product.id}`}
            className="flex-1 rounded-xl border px-3 py-2 text-center text-sm hover:bg-gray-50"
          >
            View Details
          </Link>

          {/* ADD TO CART */}
          <button
            onClick={() => addToCart(product, 1)}
            className="flex-1 rounded-xl bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
