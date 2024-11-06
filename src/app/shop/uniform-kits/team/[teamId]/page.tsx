import { getWooProductById, getWooProductsByTagId } from "@/lib/woocommerce";
import { WooCommerceProduct } from "@/lib/types/woocommerce";
import { KitInteractiveSection } from "@/components/shop/uniform-kits/kit-interaction";

export default async function KitPage() {
  const kit: WooCommerceProduct = await getWooProductById("1276");
  const products: WooCommerceProduct[] = await getWooProductsByTagId("34");

  const kitImages = kit.images?.length ? kit.images : [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white-50 to-gray-300 p-8">
      <KitInteractiveSection kit={kit} images={kitImages} products={products} />

      {kit.short_description && (
        <div className="mt-4 md:mt-8 flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Description</h2>
          <p>{kit.short_description.replace(/<\/?p>/g, "")}</p>
        </div>
      )}
    </main>
  );
}
