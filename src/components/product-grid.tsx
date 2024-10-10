import { getWooCommerceProducts } from "@/lib/woocommerce";
import Image from "next/image";
import { WooCommerceProduct } from "@/lib/types/woocommerce";
import { cn } from "@/lib/utils";

export default async function ProductGrid({
  className,
}: {
  className?: string;
}) {
  const products = await getWooCommerceProducts();

  return (
    <section className="w-full max-w-5xl mx-auto my-8 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
      {products.length > 0 ? (
        products.map((product: WooCommerceProduct) => (
          <div
            key={product.id}
            className={cn(className, "bg-white flex flex-col")}
          >
            {product.images && product.images.length > 0 ? (
              <Image
                key={product.images[0].id}
                src={`https://res.cloudinary.com/de463zyga/image/upload/${product.images[0].name}.png`}
                alt={product.images[0].alt}
                width={200}
                height={200}
                className="min-h-[260px] mx-auto hover:scale-105 transition duration-200 ease-in-out"
              />
            ) : (
              <p>No images available</p>
            )}
            <div className="flex items-center justify-between px-8">
              <h2 className="text-lg font-bold max-w-[200px]">
                {product.name}
              </h2>
              <p className="font-light text-xs sm:text-sm">${product.price}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </section>
  );
}
