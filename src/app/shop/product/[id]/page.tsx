import { getWooProductById } from "@/lib/woocommerce";
import { WooCommerceProduct } from "@/lib/types/woocommerce";
import { cn } from "@/lib/utils";
import { Star } from "react-feather";
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

  const images = product.images?.length ? product.images : [];

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
    <main className="mx-auto mt-6 md:mt-8 max-w-xl px-4 pb-16 sm:px-6 sm:pb-24 md:max-w-4xl md:px-8 2xl:max-w-5xl">
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
      <div className="md:grid md:auto-rows-min md:grid-cols-10 md:gap-x-6 lg:gap-x-8">
        <div className="md:col-span-5 md:col-start-6">
          <div className="mt-2 md:mt-0 flex md:flex-col justify-between">
            <h1 className="text-2xl md:text-4xl font-medium text-gray-900">
              {product.name}
            </h1>
            <p className="text-xl font-medium text-gray-900">
              ${product.price}
            </p>
          </div>
          <div className="mt-2 md:mt-4 mb-4 md:mb-0">
            <h2 className="sr-only">Reviews</h2>
            <div className="flex items-center">
              {/* TODO: add reviews attribute when fetching product data*/}
              <div className="mr-2 flex items-center">
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
              <p className="text-sm text-gray-700">
                {/* TODO: add reviews attribute when fetching product data*/}
                {4}
                <span className="sr-only"> out of 5 stars</span>
              </p>
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

        <ProductInteractiveSection
          product={product}
          colors={colors}
          sizes={sizes}
          images={images}
        />

        {product.short_description && (
          <div className="mt-4 md:mt-8 md:col-span-5 flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Description</h2>
            <p>{product.short_description.replace(/<\/?p>/g, "")}</p>
          </div>
        )}
      </div>
    </main>
  );
}
