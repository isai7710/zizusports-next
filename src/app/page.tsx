import ProductGrid from "@/components/product-grid";

export default async function Home() {
  return (
    <main className="flex flex-col p-8 font-[family-name:var(--font-geist-sans)]">
      <section className="flex flex-col mt-20 px-2 mx-auto items-start">
        <p>
          Testing WooCommerce API (read-only for now) by displaying products
          below:
        </p>
        <ProductGrid />
      </section>
    </main>
  );
}
