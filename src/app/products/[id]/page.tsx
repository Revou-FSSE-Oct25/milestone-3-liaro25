import Image from "next/image";

// Force this page to be rendered dynamically (SSR)
// Prevents build-time data fetching that can fail on Vercel
export const dynamic = "force-dynamic";

// Product type definition (based on FakeStore API response)
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

// Fetch a single product by ID on the SERVER
// Uses no-store to ensure data is fetched per request (SSR)
// Wrapped in try/catch to avoid crashing the build or request
async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    });

    // If API returns non-200 status, return null instead of throwing
    if (!res.ok) return null;

    return res.json();
  } catch {
    // Network or fetch error fallback
    return null;
  }
}

// Product Detail Page component
// Receives dynamic route params from the URL (e.g. /products/1)
export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Fetch product data for the requested ID
  const product = await getProduct(params.id);

  // Fallback UI if product data is unavailable
  // Important to keep the page renderable and deploy-safe
  if (!product) {
    return (
      <main className="p-8">
        <h1 className="text-xl font-semibold">Product not available</h1>
        <p className="mt-2 text-gray-600">
          Please go back and try another product.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product image section */}
        <div className="relative h-80 w-full border rounded-lg p-6">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>

        {/* Product information section */}
        <div>
          <p className="text-sm text-gray-500">{product.category}</p>

          <h1 className="mt-2 text-2xl font-bold">{product.title}</h1>

          <p className="mt-2 text-sm text-gray-600">
            ⭐ {product.rating.rate} / 5 ({product.rating.count} reviews)
          </p>

          <p className="mt-4 text-2xl font-semibold">${product.price}</p>

          <p className="mt-6 text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* Placeholder action button (logic not implemented yet) */}
          <button
            type="button"
            className="mt-8 w-full rounded-lg bg-black px-4 py-3 text-white hover:opacity-90 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
