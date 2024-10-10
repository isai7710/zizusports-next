"use client";

import { cn } from "@/lib/utils";
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
  const [imgState, setImgState] = useState(1);

  // Automatic image cycling every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setImgState((prevState) => (prevState + 1) % imgs.length);
    }, 5000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [imgs.length]);

  const cycleNext = () => setImgState((prev) => (prev + 1) % imgs.length);
  const cyclePrev = () =>
    setImgState((prev) => (prev - 1 + imgs.length) % imgs.length);

  return (
    <div
      className={cn(
        className,
        "relative bg-center bg-cover bg-no-repeat transition-all duration-500 ease-in-out",
      )}
      style={{
        backgroundImage: `url(https://res.cloudinary.com/de463zyga/image/upload/${imgs[imgState]})`,
      }}
    >
      <button
        onClick={cyclePrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-1 rounded-full"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {children}
      <button
        onClick={cycleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-1 rounded-full"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
