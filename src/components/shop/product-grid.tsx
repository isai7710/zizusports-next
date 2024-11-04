import { getWooProducts } from "@/lib/woocommerce";
import Image from "next/image";
import { WooCommerceProduct } from "@/lib/types/woocommerce";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function ProductGrid({
  className,
}: {
  className?: string;
}) {
  const products: WooCommerceProduct[] = await getWooProducts();

  return (
    <section
      className={cn(
        "w-full max-w-4xl mx-auto md:my-8 grid grid-cols-2 md:grid-cols-3 gap-4",
        className,
      )}
    >
      {products.length > 0 ? (
        products.map((product) => (
          <Link
            href={`/shop/products/${product.id}`}
            key={product.id}
            className="bg-slate-100 flex flex-col hover:cursor-pointer rounded-xl"
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <Image
                  key={product.images[0].id}
                  src={`https://res.cloudinary.com/de463zyga/image/upload/${product.images[0].name}.png`}
                  alt={product.images[0].alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover rounded-xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <p className="text-gray-500">No image</p>
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-lg font-bold w-full truncate">
                {product.name}
              </h2>
              <p className="font-light text-xs sm:text-sm">${product.price}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.attributes &&
                  product.attributes
                    .find((attr) => attr.name.toLowerCase() === "color")
                    ?.options.map((color, index) => (
                      <span
                        key={index}
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      ></span>
                    ))}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No products available</p>
      )}
    </section>
  );
}
