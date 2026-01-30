import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";
import Header from "@/components/Header";

// Server-side data fetching
async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://api.escuelajs.co/api/v1/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
  <>
    <Header />
    <main className="mx-auto max-w-6xl p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-sm text-gray-600">Showing {products.length} items</p>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, 18).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  </>
);

}
