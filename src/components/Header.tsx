"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/60 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="block leading-tight">
          <p className="text-xl font-extrabold tracking-tight text-orange-900">
            RevoShop
          </p>
          <p className="text-xs text-orange-600">
            Where online feels like offline — without the hustle of queueing
          </p>
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            href="/faq"
            className="text-sm font-medium text-orange-700 hover:text-orange-900"
          >
            FAQ
          </Link>

          <Link href="/cart" className="btn-primary">
            Cart ({totalItems})
          </Link>
        </nav>
      </div>
    </header>
  );
}
