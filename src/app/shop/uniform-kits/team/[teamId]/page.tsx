import { getWooProductById } from "@/lib/woocommerce";
import { WooCommerceProduct } from "@/lib/types/woocommerce";
import { ProductInteractiveSection } from "@/components/shop/product-interaction";

export default async function ProductPage() {
  const product: WooCommerceProduct = await getWooProductById("1276");

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
      <ProductInteractiveSection
        product={product}
        colors={colors}
        sizes={sizes}
        images={images}
      />

      {product.short_description && (
        <div className="mt-4 md:mt-8 flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Description</h2>
          <p>{product.short_description.replace(/<\/?p>/g, "")}</p>
        </div>
      )}
    </main>
  );
}
