"use client";

import { WooCommerceProduct, ProductImage } from "@/lib/types/woocommerce";
import { useState } from "react";
import { ColorPicker } from "@/components/shop/color-picker";
import { SizePicker } from "@/components/shop/size-picker";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ProductHeader from "./product-header";

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
    <section className="flex flex-col md:grid md:grid-cols-11 md:gap-x-6">
      <div className="block md:hidden">
        <ProductHeader name={product.name} price={product.price} />
      </div>

      <div className="order-2 md:order-1 md:col-span-1 md:col-start-1 md:row-start-1">
        <div
          className={cn(
            "flex md:grid md:grid-rows-4 gap-2",
            "overflow-x-auto md:overflow-x-visible",
            "my-4 md:my-0 space-x-2 md:space-x-0",
          )}
        >
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setCurrentImage(img)}
              className={cn(
                currentImage?.id === img.id
                  ? "border-2 border-primary/40 shadow-xl"
                  : "border-none",
                "relative w-16 md:w-full aspect-square flex-shrink-0 md:flex-shrink",
                "overflow-hidden rounded-md cursor-pointer",
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

      <div className="order-1 md:order-2 md:col-span-5 md:col-start-2 md:row-start-1">
        <div className="relative w-full aspect-square md:aspect-[4/5] overflow-hidden rounded-xl">
          {currentImage && (
            <Image
              key={currentImage.id}
              src={`https://res.cloudinary.com/de463zyga/image/upload/${currentImage.name}.png`}
              alt={currentImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          )}
        </div>
      </div>

      <div className="order-3 md:col-span-5 md:col-start-7 mt-6 md:mt-0">
        <div className="hidden md:block">
          <ProductHeader name={product.name} price={product.price} />
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
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
