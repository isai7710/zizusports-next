"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export function SizePicker({ sizes }: { sizes: string[] }) {
  const [selectedSize, setSelectedSize] = useState(sizes[2]);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-medium text-gray-900">Select a size</h2>
        <a
          href="#"
          className="text-sm font-medium text-gray-400 hover:text-slate-500"
        >
          See sizing chart
        </a>
      </div>
      <div
        className={cn(
          "grid gap-3",
          sizes.length > 4 ? "grid-cols-4" : `grid-cols-${sizes.length}`,
        )}
      >
        {sizes.map((size, index) => (
          <span
            key={index}
            onClick={() => setSelectedSize(sizes[index])}
            className={cn(
              size === selectedSize
                ? "border-transparent bg-primary text-white hover:bg-opacity-80 transition duration-100 ease-in-out"
                : "border-gray-200 bg-white text-gray-900 hover:bg-gray-100 transition duration-100 ease-in-out",
              "flex items-center justify-center rounded-md border py-1 text-sm font-medium uppercase hover:cursor-pointer px-3",
            )}
          >
            {size}
          </span>
        ))}
      </div>
    </div>
  );
}
