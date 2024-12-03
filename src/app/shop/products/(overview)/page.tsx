"use client";

import ProductGrid from "@/components/shop/product-grid";
import ProductGridSkeleton from "@/components/shop/product-grid-skeleton";
import Image from "next/image";
import { Suspense } from "react";
import ClubSelector from "@/components/shop/club-selector";

export default function Shop() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <section className="relative w-full h-[50vh] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/de463zyga/image/upload/upslatrslindoor.jpg"
          alt="header image"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-center">
            For the Love of the Game
          </h1>
          <p className="text-xl md:text-2xl font-medium text-center">
            Designed for the Field. Worn with Pride.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto flex justify-center px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <ClubSelector />
      </div>
      <main className="max-w-4xl mx-auto">
        <Suspense fallback={<ProductGridSkeleton />}>
          {/* include a prop to display appropriate club's products like `clubId={selectedClub.id}` */}
          <ProductGrid />
        </Suspense>
      </main>
    </div>
  );
}
