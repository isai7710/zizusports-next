"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

export default function Carousel({
  className,
  imgs,
  children,
}: {
  className?: string;
  imgs: string[];
  children?: ReactNode;
}) {
  const [imgState, setImgState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgState((prevState) => (prevState + 1) % imgs.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imgState, imgs.length]);

  const cycleNext = () => {
    setImgState((prev) => (prev + 1) % imgs.length);
  };
  const cyclePrev = () => {
    setImgState((prev) => (prev - 1 + imgs.length) % imgs.length);
  };

  return (
    <div className="relative w-full h-full">
      {imgs.map((img, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-500 ease-in-out",
            index === imgState ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={`https://res.cloudinary.com/de463zyga/image/upload/${img}.jpg`}
            alt={`carousel image ${index}`}
            fill
            className={cn("object-cover", className)}
          />
        </div>
      ))}
      <button
        onClick={cyclePrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      {children}
      <button
        onClick={cycleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
