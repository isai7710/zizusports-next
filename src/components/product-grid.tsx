import { getWooCommerceProducts } from "@/lib/woocommerce";
import Image from "next/image";
import { WooCommerceProduct } from "@/lib/types/woocommerce";

export default async function ProductGrid() {
  const products = await getWooCommerceProducts();

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
        {products.length > 0 ? (
          products.map((product: WooCommerceProduct) => (
            <div
              key={product.id}
              className="bg-white flex justify-between border p-4 rounded shadow"
            >
              <div>
                <h2 className="text-sm sm:text-md font-bold max-w-[200px] text-wrap">
                  {product.name}
                </h2>
                <p className="font-light text-xs sm:text-sm">
                  <span className="inline">Price: </span>${product.price}
                </p>
              </div>
              <div>
                {product.images && product.images.length > 0 ? (
                  <Image
                    key={product.images[0].id}
                    src={`https://res.cloudinary.com/de463zyga/image/upload/${product.images[0].name}.png`}
                    alt={product.images[0].alt}
                    width={100}
                    height={100}
                  />
                ) : (
                  <p>No images available</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </>
  );
}
