import { getWooProductById } from "@/lib/woocommerce";
import { WooCommerceProduct } from "@/lib/types/woocommerce";
import { cn } from "@/lib/utils";
import { Star } from "react-feather";
import Image from "next/image";
import { ProductInteractiveSection } from "@/components/shop/product-interaction";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
    <main className="mx-auto mt-6 md:mt-8 max-w-xl px-4 pb-16 sm:px-6 sm:pb-24 md:max-w-5xl md:px-8">
      <div className="mb-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{product.name}</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="md:grid md:auto-rows-min md:grid-cols-10 md:gap-x-6 lg:gap-x-8 lg:grid-cols-12">
        <div className="md:col-span-5 md:col-start-6 lg:col-span-6 lg:col-start-7">
          <div className="flex justify-between">
            <h1 className="text-xl font-medium text-gray-900">
              {product.name}
            </h1>
            <p className="text-xl font-medium text-gray-900">
              ${product.price}
            </p>
          </div>
          <div className="mt-4 mb-2 md:mb-0">
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

        <div className="md:col-span-5 md:col-start-1 md:row-span-3 md:row-start-1 lg:col-span-6">
          <div className="relative w-full aspect-[3/4] md:aspect-[4/5] md:overflow-hidden">
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
        </div>

        <div className="md:col-span-5 lg:col-span-6">
          <ProductInteractiveSection
            product={product}
            colors={colors}
            sizes={sizes}
          />
        </div>
      </div>
    </main>
  );
}
