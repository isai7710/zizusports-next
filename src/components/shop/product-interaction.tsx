"use client";

import { WooCommerceProduct, ProductImage } from "@/lib/types/woocommerce";
import { useState } from "react";
import { ColorPicker } from "@/components/shop/color-picker";
import { SizePicker } from "@/components/shop/size-picker";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import Image from "next/image";

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

  return (
    <>
      <div className="md:col-span-5 md:col-start-1 md:row-span-3 md:row-start-1">
        <div className="relative w-full aspect-[3/4] md:aspect-[4/5] md:overflow-hidden">
          {images && images.length > 0 ? (
            <Image
              key={images[0].id}
              src={`https://res.cloudinary.com/de463zyga/image/upload/${product.images[0].name}.png`}
              alt={images[0].alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <p className="text-gray-500">No image</p>
            </div>
          )}
        </div>
        <div className="w-full mt-4 grid grid-cols-4 gap-x-2">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative w-24 aspect-[3/4] overflow-hidden"
            >
              <Image
                src={`https://res.cloudinary.com/de463zyga/image/upload/${img.name}.png`}
                alt={img.alt}
                fill
                className="object-fit rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-5">
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
    </>
  );
}
