import ProductGrid from "@/components/product-grid";

export default async function Home() {
  return (
    <div className="flex p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-start">
        <p>
          Testing WooCommerce API (read-only for now) by displaying products
          below:
        </p>
        <ProductGrid />
      </main>
    </div>
  );
}
