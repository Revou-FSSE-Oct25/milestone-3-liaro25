import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import type { Product } from "@/types/product";
import Header from "@/components/Header";

type Props = {
  params: { id: string };
};

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProduct(params.id);

  const imageUrl = product.images?.[0] || "/placeholder.png";

  return (
    <>
    <Header />
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border bg-white">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-xl font-semibold">${product.price}</p>

          {product.description ? (
            <p className="text-gray-600">{product.description}</p>
          ) : null}

          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
    </>
  );
}
