import { getWooCommerceProducts } from "@/lib/woocommerce";
import { WooCommerceProduct } from "@/lib/types/woocommerce";

export default async function ProductGrid() {
  const products = await getWooCommerceProducts();
  return (
    <div className="grid grid-cols-2 gap-4 mt-8">
      {products.length > 0 ? (
        products.map((product: WooCommerceProduct) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{product.name}</h2>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}
