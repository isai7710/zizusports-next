import ProductGrid from "@/components/shop/product-grid";
import Image from "next/image";

export default function Shop() {
  return (
    <>
      <section className="relative w-full h-48 md:h-80 bg-black">
        <Image
          src="https://res.cloudinary.com/de463zyga/image/upload/upslatrslindoor.jpg"
          alt="header image"
          fill
          className="object-cover object-[0px_57%]"
        />
        <h1 className="absolute text-nowrap z-10 text-palette-1 text-2xl md:text-5xl font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-32 md:pt-44">
          Gear Up For Your Story.
        </h1>
      </section>
      <ProductGrid />
    </>
  );
}
