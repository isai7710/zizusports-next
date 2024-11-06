"use client";

import { WooCommerceProduct, ProductImage } from "@/lib/types/woocommerce";
import { useState } from "react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Star } from "react-feather";
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
    <section className="flex flex-col md:grid md:grid-cols-11 md:gap-x-6">
      <div className="block md:hidden">
        <div className="flex flex-col md:justify-between items-start mb-2">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            {kit.name}
          </h1>
          <p className="text-xl md:text-2xl font-medium text-gray-900">
            ${kit.price}
          </p>
        </div>
        <div className="my-4">
          <h2 className="sr-only">Reviews</h2>
          <div className="flex items-center flex-wrap">
            <div className="flex items-center mr-2">
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
            <p className="text-sm text-gray-700 mr-4">
              4 (5)
              <span className="sr-only"> out of 5 stars</span>
            </p>
            <a
              href="#"
              className="text-sm font-medium text-slate-600 hover:text-slate-500"
            >
              See all {42} reviews
            </a>
          </div>
        </div>
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
          <div className="flex flex-col md:justify-between items-start mb-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              {kit.name}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-gray-900">
              ${kit.price}
            </p>
          </div>
          <div className="my-4">
            <h2 className="sr-only">Reviews</h2>
            <div className="flex items-center flex-wrap">
              <div className="flex items-center mr-2">
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
              <p className="text-sm text-gray-700 mr-4">
                4 (5)
                <span className="sr-only"> out of 5 stars</span>
              </p>
              <a
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-slate-500"
              >
                See all {42} reviews
              </a>
            </div>
          </div>
        </div>
        <div className="my-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Select Products
          </h2>
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm"
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
    </section>
  );
}
