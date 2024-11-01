"use client";

import { WooCommerceProduct, ProductImage } from "@/lib/types/woocommerce";
import { useState } from "react";
import { ColorPicker } from "@/components/shop/color-picker";
import { SizePicker } from "@/components/shop/size-picker";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import Image from "next/image";
import { Star } from "react-feather";
import { cn } from "@/lib/utils";

interface ProductInteractiveSectionProps {
  product: WooCommerceProduct;
  colors: string[];
  sizes: string[];
  images: ProductImage[];
}

export function ProductInteractiveSection({
  product,
  colors,
  sizes,
  images,
}: ProductInteractiveSectionProps) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    colors.length > 0 ? colors[0] : undefined,
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    sizes.length > 0 ? sizes[0] : undefined,
  );
  const [currentImage, setCurrentImage] = useState<ProductImage | undefined>(
    images.length > 0 ? images[0] : undefined,
  );

  return (
    <section className="md:grid md:grid-cols-8 md:auto-rows-min md:gap-x-6">
      <div className="md:col-span-4 md:col-start-1 md:row-start-1">
        <div className="relative w-full aspect-[3/4] md:aspect-[4/5] md:overflow-hidden">
          {currentImage && (
            <Image
              key={currentImage.id}
              src={`https://res.cloudinary.com/de463zyga/image/upload/${currentImage.name}.png`}
              alt={currentImage.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover rounded-xl"
            />
          )}
        </div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setCurrentImage(img)}
              className={cn(
                currentImage?.id === img.id
                  ? "border border-primary/40 shadow-xl"
                  : "border-none",
                "relative w-full aspect-square overflow-hidden rounded-md",
              )}
            >
              <Image
                src={`https://res.cloudinary.com/de463zyga/image/upload/${img.name}.png`}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-4 md:col-start-5">
        <div className="mt-2 md:mt-0 flex md:flex-col justify-between">
          <h1 className="text-2xl md:text-4xl font-medium text-gray-900">
            {product.name}
          </h1>
          <p className="text-xl font-medium text-gray-900">${product.price}</p>
        </div>
        <div className="mt-2 md:mt-4 mb-4 md:mb-0">
          <h2 className="sr-only">Reviews</h2>
          <div className="flex items-center">
            {/* TODO: add reviews attribute when fetching product data*/}
            <div className="mr-2 flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <Star
                  key={rating}
                  className={cn(
                    4 > rating ? "text-yellow-400" : "text-gray-200",
                    "h-5 w-5 flex-shrink-0",
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-sm text-gray-700">
              {/* TODO: add reviews attribute when fetching product data*/}
              {4}
              <span className="sr-only"> out of 5 stars</span>
            </p>
            <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
              ·
            </div>
            <div className="ml-4 flex">
              <a
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-slate-500"
              >
                See all {42} reviews
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="md:mt-8 md:mb-1 flex flex-col gap-3">
            {colors.length > 0 && (
              <ColorPicker
                colors={colors}
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
              />
            )}
            {sizes.length > 0 && (
              <SizePicker
                sizeLabels={sizes}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
                productName={product.name}
                productCategory={product.categories[0].name.toLowerCase()}
              />
            )}
          </div>

          <AddToCartButton
            product={product}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
          />
        </form>
      </div>
    </section>
  );
}
