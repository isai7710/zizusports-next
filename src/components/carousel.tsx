"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Carousel({ imgs = [] }: { imgs: string[] }) {
  const [leftColumn, setLeftColumn] = useState<string[]>([]);
  const [rightColumn, setRightColumn] = useState<string[]>([]);

  useEffect(() => {
    const left: string[] = [];
    const right: string[] = [];
    imgs.forEach((img, index) => {
      if (index % 2 === 0) {
        left.push(img);
      } else {
        right.push(img);
      }
    });
    setLeftColumn(left);
    setRightColumn(right);
  }, [imgs]);

  return (
    <div className="w-full h-full flex overflow-hidden gap-4">
      <div className="w-1/2 h-full overflow-hidden">
        <div className="animate-scroll-up">
          {leftColumn.map((img, index) => (
            <div key={`left-${index}`} className="w-full h-full mb-4">
              <Image
                src={`https://res.cloudinary.com/de463zyga/image/upload/${img}.jpg`}
                alt={`Image ${img}`}
                width={400}
                height={300}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
          {leftColumn.map((img, index) => (
            <div key={`left-repeat-${index}`} className="w-full h-full mb-4">
              <Image
                src={`https://res.cloudinary.com/de463zyga/image/upload/${img}.jpg`}
                alt={`Image ${img}`}
                width={400}
                height={300}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 h-full overflow-hidden">
        <div className="animate-scroll-down animation-delay-1000">
          {rightColumn.map((img, index) => (
            <div key={`right-${index}`} className="w-full h-full mb-4">
              <Image
                src={`https://res.cloudinary.com/de463zyga/image/upload/${img}.jpg`}
                alt={`Image ${img}`}
                width={400}
                height={300}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
          {rightColumn.map((img, index) => (
            <div key={`right-repeat-${index}`} className="w-full h-full mb-4">
              <Image
                src={`https://res.cloudinary.com/de463zyga/image/upload/${img}.jpg`}
                alt={`Image ${img}`}
                width={400}
                height={300}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
