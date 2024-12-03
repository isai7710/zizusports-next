"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const clubs = [
  { id: 1, name: "Starlight United", logo: "/clublogo1.webp" },
  { id: 2, name: "Atlas Athletics", logo: "/clublogo2.webp" },
  { id: 3, name: "Horizon Strikers", logo: "/clublogo3.webp" },
];

export default function ClubSelector() {
  const [selectedClub, setSelectedClub] = useState(clubs[0]);
  return (
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
              selectedClub.id === club.id ? "text-primary" : "text-gray-700",
            )}
          >
            {club.name}
          </p>
        </button>
      ))}
    </div>
  );
}
