import ProductGrid from "@/components/product-grid";

export default function Shop() {
  return (
    <div className="min-h-screen">
      <section className="flex flex-col mt-6 px-2 mx-auto items-start">
        <p>
          Testing WooCommerce API (read-only for now) by displaying products
          below:
        </p>
        <ProductGrid />
      </section>
    </div>
  );
}
