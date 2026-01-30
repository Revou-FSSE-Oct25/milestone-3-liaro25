import ProductCard from "@/components/ProductCard";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
  rating?: {
    rate: number;
    count: number;
  };
};

type NoticeProps = {
  products: Product[];
};

export default function ProductGrid({ products }: NoticeProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          title={p.title}
          price={p.price}
          image={p.image}
        />
      ))}
    </div>
  );
}
