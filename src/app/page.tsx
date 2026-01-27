export const dynamic = "force-dynamic";
import ProductGrid from "@/components/ProductGrid";

// Fetch product list from FakeStore API
// This function runs on the SERVER (not in the browser)
async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");

  // Basic error handling to prevent rendering invalid data
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  // Convert API response to JavaScript object (array of products)
  return res.json();
}

// Home page component
// This is a Server Component by default (no "use client")
// Data is fetched before the page is rendered
export default async function HomePage() {
  // Fetch product data on the server
  const products = await getProducts();

  return (
    <main className="p-8">
      {/* Page title */}
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {/* ProductGrid handles layout and mapping of product cards */}
      <ProductGrid products={products} />
    </main>
  );
}
