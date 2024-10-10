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
    <section className="w-full max-w-4xl mx-auto my-8 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
      {products.length > 0 ? (
        products.map((product: WooCommerceProduct) => (
          <div
            key={product.id}
            className={cn(
              className,
              "group bg-white flex flex-col hover:cursor-pointer",
            )}
          >
            <div className="min-h-[280px] rounded-lg pb-2 flex items-end">
              {product.images && product.images.length > 0 ? (
                <Image
                  key={product.images[0].id}
                  src={`https://res.cloudinary.com/de463zyga/image/upload/${product.images[0].name}.png`}
                  alt={product.images[0].alt}
                  width={200}
                  height={200}
                  className="mx-auto group-hover:scale-105 transition duration-200 ease-in-out"
                />
              ) : (
                <p>No images available</p>
              )}
            </div>
            <div className="px-8">
              <h2 className="text-lg font-bold w-full">{product.name}</h2>
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
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </section>
  );
}
