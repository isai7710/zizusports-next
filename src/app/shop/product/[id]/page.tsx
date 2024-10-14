import { getWooProductById } from "@/lib/woocommerce";
import { WooCommerceProduct } from "@/lib/types/woocommerce";
import { cn } from "@/lib/utils";
import { Star } from "react-feather";
import Image from "next/image";
import { ColorPicker } from "@/components/shop/color-picker";
import { SizePicker } from "@/components/shop/size-picker";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product: WooCommerceProduct = await getWooProductById(params.id);

  // Find the color and sizes attribute in the product attributes if it exists
  const colorAttribute = product.attributes.find(
    (attr) => attr.name.toLowerCase() === "color",
  );
  const sizeAttribute = product.attributes.find(
    (attr) => attr.name.toLowerCase() === "size",
  );

  // If the color and size attributes exist, extract the options of that attribute
  const colors = colorAttribute ? colorAttribute.options : [];
  const sizes = sizeAttribute ? sizeAttribute.options : [];

  return (
    <main className="mx-auto mt-6 md:mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-5xl lg:px-8">
      <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-5 lg:col-start-7">
          <div className="flex justify-between">
            <h1 className="text-xl font-medium text-gray-900">
              {product.name}
            </h1>
            <p className="text-xl font-medium text-gray-900">
              ${product.price}
            </p>
          </div>
          <div className="mt-4">
            <h2 className="sr-only">Reviews</h2>
            <div className="flex items-center">
              <p className="text-sm text-gray-700">
                {/* TODO: add reviews attribute when fetching product data*/}
                {4}
                <span className="sr-only"> out of 5 stars</span>
              </p>
              {/* TODO: add reviews attribute when fetching product data*/}
              <div className="ml-1 flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star
                    key={rating}
                    className={cn(
                      4 > rating ? "text-yellow-400" : "text-gray-200",
                      "h-5 w-5 flex-shrink-0",
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                ·
              </div>
              <div className="ml-4 flex">
                <a
                  href="#"
                  className="text-sm font-medium text-slate-600 hover:text-slate-500"
                >
                  See all {42} reviews
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-1 lg:row-span-3 lg:row-start-1">
          <div className="relative w-full aspect-[3/4] md:aspect-[4/5] md:overflow-hidden">
            {product.images && product.images.length > 0 ? (
              <Image
                key={product.images[0].id}
                src={`https://res.cloudinary.com/de463zyga/image/upload/${product.images[0].name}.png`}
                alt={product.images[0].alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <p className="text-gray-500">No image</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <form>
            <div className="md:mt-8 md:mb-1 flex flex-col gap-3">
              {colors.length > 0 && <ColorPicker colors={colors} />}
              {sizes.length > 0 && (
                <SizePicker sizes={sizes} productName={product.name} />
              )}
            </div>

            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Add to cart
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
