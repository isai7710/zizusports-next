"use client";

import ProductGrid from "@/components/shop/product-grid";
import ProductGridSkeleton from "@/components/shop/product-grid-skeleton";
import Image from "next/image";
import { Suspense, useState } from "react";
import { cn } from "@/lib/utils";

const clubs = [
  { id: 1, name: "Starlight United", logo: "/clublogo1.webp" },
  { id: 2, name: "Atlas Athletics", logo: "/clublogo2.webp" },
  { id: 3, name: "Horizon Strikers", logo: "/clublogo3.webp" },
];

export default function Shop() {
  const [selectedClub, setSelectedClub] = useState(clubs[0]);

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
        <div className="inline-flex bg-gray-100 rounded-full p-2 gap-3">
          {clubs.map((club) => (
            <button
              key={club.id}
              onClick={() => setSelectedClub(club)}
              disabled={true}
              className={cn(
                "flex items-center space-x-1 sm:space-x-2 px-2 py-1 rounded-full transition-all duration-300 ease-in-out",
                selectedClub.id === club.id
                  ? "bg-white shadow-lg transform"
                  : "hover:bg-gray-200",
              )}
            >
              <div className="w-8 md:w-10 relative aspect-square overflow-hidden border border-slate-300 rounded-full">
                <Image
                  src={club.logo}
                  alt={`${club.name} logo`}
                  fill
                  className="object-cover object-center scale-150 rounded-full"
                />
              </div>
              <p
                className={cn(
                  "text-sm md:text-md font-medium",
                  selectedClub.id === club.id
                    ? "text-primary"
                    : "text-gray-700",
                )}
              >
                {club.name}
              </p>
            </button>
          ))}
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Shop <span className="text-primary">{selectedClub.name}&apos;s</span>{" "}
          Gear
        </h2>
        <Suspense fallback={<ProductGridSkeleton />}>
          {/* include a prop to display appropriate club's products like `clubId={selectedClub.id}` */}
          <ProductGrid />
        </Suspense>
      </main>
    </div>
  );
}
