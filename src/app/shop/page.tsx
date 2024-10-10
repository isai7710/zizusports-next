import ProductGrid from "@/components/product-grid";
import Image from "next/image";

export default function Shop() {
  return (
    <>
      <section className="relative w-full h-48 2xl:h-64 bg-black">
        <Image
          src="https://res.cloudinary.com/de463zyga/image/upload/upslatrslindoor.jpg"
          alt="header image"
          fill
          className="object-cover object-[0px_51%]"
        />
        <h1 className="absolute z-10 text-palette-1 text-4xl font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pb-6">
          Gear Up For Your Story.
        </h1>
      </section>
      <main className="flex flex-col w-full max-w-5xl mx-auto my-8">
        <p>
          Testing WooCommerce API (read-only for now) by displaying products
          below:
        </p>
        <ProductGrid />
      </main>
    </>
  );
}
