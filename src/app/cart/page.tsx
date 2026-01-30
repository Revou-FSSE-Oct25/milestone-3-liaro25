"use client";

import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, totalItems, totalPrice, increase, decrease, remove, clear } = useCart();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          {items.length > 0 && (
            <button
              onClick={clear}
              className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Clear cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border bg-white p-6">
            <p className="text-gray-700">Cart is empty.</p>
            <Link
              href="/"
              className="mt-3 inline-block text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              ← Continue shopping
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <section className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-2xl border bg-white p-4">
                  <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-gray-50">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-gray-600">${item.price}</p>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center overflow-hidden rounded-xl border">
                        <button
                          onClick={() => decrease(item.id)}
                          className="px-3 py-2 text-sm hover:bg-gray-50"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-3 py-2 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => increase(item.id)}
                          className="px-3 py-2 text-sm hover:bg-gray-50"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => remove(item.id)}
                        className="text-sm font-medium text-gray-600 hover:text-gray-900"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </section>

            <aside className="rounded-2xl border bg-white p-6">
              <h2 className="text-lg font-bold">Summary</h2>
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                className="mt-6 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                type="button"
              >
                Checkout (demo)
              </button>

              <p className="mt-3 text-xs text-gray-500">
                Cart is persisted in localStorage for demo purposes.
              </p>
            </aside>
          </div>
        )}
      </main>
    </>
  );
}
