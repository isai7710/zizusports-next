import ProductGrid from "@/components/shop/product-grid";
import ProductGridSkeleton from "@/components/shop/product-grid-skeleton";
import Image from "next/image";
import { Suspense } from "react";

export default function Shop() {
  return (
    <div className="min-h-screen bg-gray-100">
      <section className="relative w-full h-64 md:h-80 overflow-hidden">
        <Image
          src="https://res.cloudinary.com/de463zyga/image/upload/upslatrslindoor.jpg"
          alt="header image"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            For the Love of the Game
          </h1>
          <p className="text-xl md:text-2xl font-medium">
            Designed for the Field. Worn with Pride.
          </p>
        </div>
      </section>

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid />
      </Suspense>
    </div>
  );
}
