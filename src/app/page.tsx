import ProductGrid from "@/components/product-grid";

export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>
          Testing WooCommerce API (read-only for now) by displaying products
          below:
        </p>
        <ProductGrid />
      </main>
    </div>
  );
}
