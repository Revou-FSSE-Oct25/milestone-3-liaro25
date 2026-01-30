import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import AddToCartButton from "@/components/AddToCartButton";

type PageProps = {
  params: { id: string };
};

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProduct(params.id);
  const imageUrl = product.images?.[0] || "/placeholder.png";

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl p-6">
        <Link
          href="/"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Back to Products
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border bg-white">
            <Image
              src={imageUrl}
              alt={product.title} 
              fill
              className="object-cover"
            />
          </div>

          <div className="rounded-2xl border bg-white p-6">

            <h1 className="mt-2 text-2xl font-bold">{product.title}</h1>

            <p className="mt-4 text-3xl font-extrabold">
              ${product.price}
            </p>

            <p className="mt-4 text-gray-700">
              {product.description}
            </p>

            <AddToCartButton product={product} />

          </div>
        </div>
      </main>
    </>
  );
}
