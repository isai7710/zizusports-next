"use client";

import { WooCommerceProduct, ProductImage } from "@/lib/types/woocommerce";
import { useState } from "react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface KitInteractiveSectionProps {
  kit: WooCommerceProduct;
  images: ProductImage[];
  products: WooCommerceProduct[];
}

export function KitInteractiveSection({
  kit,
  images,
  products,
}: KitInteractiveSectionProps) {
  const [currentImage, setCurrentImage] = useState<ProductImage | undefined>(
    images.length > 0 ? images[0] : undefined,
  );
  const [selectedProducts, setSelectedProducts] = useState<{
    [key: number]: string;
  }>({});

  const handleSizeChange = (productId: number, size: string) => {
    setSelectedProducts((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <section className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden p-4">
      <div className="flex flex-col md:grid md:grid-cols-11 md:gap-x-6">
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
                    ? "border-2 border-primary/20"
                    : "border-none",
                  "relative w-16 md:w-full aspect-[2/3] flex-shrink-0 md:flex-shrink",
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
            <div className="flex flex-col md:justify-between items-start mb-2">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                {kit.name}
              </h1>
              <p className="text-xl md:text-2xl font-medium text-primary">
                ${kit.price}
              </p>
            </div>
          </div>
          <div className="my-6 space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="relative w-16 h-16 flex-shrink-0">
                  {product.images.length > 0 && (
                    <Image
                      src={`https://res.cloudinary.com/de463zyga/image/upload/${product.images[0].name}`}
                      alt={product.images[0].alt}
                      fill
                      className="object-cover rounded-md"
                    />
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">${product.price}</p>
                </div>
                <Select
                  onValueChange={(value) => handleSizeChange(product.id, value)}
                  value={selectedProducts[product.id] || ""}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.attributes
                      .find((attr) => attr.name.toLowerCase() === "size")
                      ?.options.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <AddToCartButton product={kit} />
          </form>
        </div>
      </div>
    </section>
  );
}
