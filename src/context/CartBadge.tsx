"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartBadge() {
  const { totalItems } = useCart();

  return (
    <div className="fixed bottom-6 right-6">
      <Link
        href="/"
        className="rounded-full bg-black px-4 py-3 text-white shadow-lg"
      >
        Cart: {totalItems}
      </Link>
    </div>
  );
}
