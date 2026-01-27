import Image from "next/image";
import Link from "next/link";

// Props define the required data for a single product card
// These values are passed from the ProductGrid component
type ProductCardProps = {
  id: number;        // Unique product ID, used for routing to detail page
  title: string;     // Product name/title
  price: number;     // Product price (kept as number for calculations)
  image: string;     // Product image URL
};

export default function ProductCard({
  id,
  title,
  price,
  image,
}: ProductCardProps) {
  return (
    // Link enables client-side navigation to the product detail page
    <Link href={`/products/${id}`} className="block">
      
      {/* Card container */}
      <div className="border rounded-lg p-4 hover:shadow-md transition">
        
        {/* Image wrapper
            `relative` and fixed height are required when using next/image with `fill`
        */}
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt={title}           // Alt text for accessibility and SEO
            fill
            className="object-contain"
          />
        </div>

        {/* Product title */}
        <h3 className="mt-4 text-sm font-medium line-clamp-2">
          {title}
        </h3>

        {/* Product price */}
        <p className="mt-2 font-semibold">
          ${price}
        </p>
      </div>
    </Link>
  );
}
