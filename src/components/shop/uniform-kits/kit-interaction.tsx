"use client";

import { useEffect, useState } from "react";
import { KitInfo } from "@/lib/types/kit";
import { AddKitToCartButton } from "@/components/cart/add-to-cart-button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function KitInteractiveSection(props: KitInfo) {
  const {
    kitName,
    kitPrice,
    images,
    colors,
    products,
    teamName,
    players,
    clubName,
  } = props;

  const [currentImage, setCurrentImage] = useState<string>(images[0] || "");
  const [currentProductImages, setCurrentProductImages] = useState<
    Record<number, string>
  >({});
  const [selectedProducts, setSelectedProducts] = useState<
    Record<number, string>
  >({});
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || "");

  const [errors, setErrors] = useState<{
    player: boolean;
    products: Record<number, boolean>;
  }>({
    player: false,
    products: {},
  });

  useEffect(() => {
    // Initialize `currentImages` with the first image of each product
    const initialImages: Record<number, string> = {};
    products.forEach((product) => {
      initialImages[product.id] =
        `https://res.cloudinary.com/de463zyga/image/upload/${product.images[0].name}`;
    });
    setCurrentProductImages(initialImages);
  }, [products]);

  const handlePlayerChange = (value: string) => {
    setSelectedPlayer(value);
    setErrors((prevErrors) => ({ ...prevErrors, player: false }));
  };

  const handleSizeChange = (productId: number, size: string) => {
    setSelectedProducts((prev) => ({ ...prev, [productId]: size }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      products: { ...prevErrors.products, [productId]: false },
    })); // Clear error for this product on selection
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);

    // Update each product image based on color
    const updatedImages: Record<number, string> = {};
    products.forEach((product) => {
      const colorSpecificImage = product.images.find((img) =>
        img.name.toLowerCase().includes(color.toLowerCase()),
      );
      updatedImages[product.id] = colorSpecificImage
        ? `https://res.cloudinary.com/de463zyga/image/upload/${colorSpecificImage.name}`
        : `https://res.cloudinary.com/de463zyga/image/upload/${product.images[0].name}`;
    });
    setCurrentProductImages(updatedImages);
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-11 md:gap-x-6">
      <div className="block md:hidden">
        <div className="flex justify-between items-end mb-1">
          <h1 className="text-2xl font-semibold text-gray-900">{kitName}</h1>
          <h2 className="text-xl font-medium text-primary">${kitPrice}</h2>
        </div>
        <p className="text-lg mb-2">
          {clubName} - {teamName}
        </p>
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
                currentImage === img
                  ? "border border-primary/30 shadow-md"
                  : "border border-gray-200",
                "relative w-16 md:w-full aspect-square flex-shrink-0 md:flex-shrink",
                "overflow-hidden rounded-md cursor-pointer",
              )}
            >
              <Image
                src={`https://res.cloudinary.com/de463zyga/image/upload/${img}.png`}
                alt={img}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="order-1 md:order-2 md:col-span-5 md:col-start-2 md:row-start-1">
        <div className="relative w-full aspect-square md:aspect-[2/3] overflow-hidden rounded-xl">
          {currentImage && (
            <Image
              key={currentImage}
              src={`https://res.cloudinary.com/de463zyga/image/upload/${currentImage}.png`}
              alt={currentImage}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          )}
        </div>
      </div>

      <div className="order-3 md:col-span-5 md:col-start-7 mt-6 md:mt-0">
        <div className="hidden md:block">
          <div className="flex md:justify-between items-end mb-1">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              {kitName}
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-primary">
              ${kitPrice}
            </h2>
          </div>
          <p className="text-lg">
            {clubName} - {teamName}
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="flex items-center justify-between my-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kit Color
              </label>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={cn(
                      `w-8 h-8 rounded-full ${color.toLowerCase()}-color border border-gray-300`,
                      selectedColor === color
                        ? "ring-2 ring-blue-500 ring-offset-2"
                        : "",
                    )}
                    aria-label={color}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="player-select"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Player
              </label>
              <Select
                onValueChange={(value) => handlePlayerChange(value)}
                value={selectedPlayer}
              >
                <SelectTrigger
                  id="player-select"
                  className={cn(
                    "w-full",
                    errors.player ? "border-red-500 ring-red-500" : "",
                  )}
                >
                  <SelectValue placeholder="Choose a player..." />
                </SelectTrigger>
                <SelectContent>
                  {players.map((player) => (
                    <SelectItem key={player.id} value={player.name}>
                      {player.name}
                    </SelectItem>
                  ))}
                </SelectContent>
                {errors.player && (
                  <p className="absolute text-red-500 text-sm">
                    Please select a player.
                  </p>
                )}
              </Select>
            </div>
          </div>

          <div className="my-6 space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="relative w-16 md:w-20 aspect-square flex-shrink-0">
                  {currentProductImages[product.id] && (
                    <Image
                      src={currentProductImages[product.id]}
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
                  <p className="text-xs text-gray-500">${product.price}</p>
                </div>
                <div>
                  <Select
                    onValueChange={(value) =>
                      handleSizeChange(product.id, value)
                    }
                    value={selectedProducts[product.id] || ""}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-[100px]",
                        errors.products[product.id]
                          ? "border-red-500 ring-red-500"
                          : "",
                      )}
                    >
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
                  {errors.products[product.id] && (
                    <p className="absolute text-red-500 text-sm -translate-x-6">
                      Please select a size.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <AddKitToCartButton
            kitName={kitName}
            kitPrice={kitPrice}
            kitImage={currentImage}
            selectedPlayer={selectedPlayer}
            selectedColor={selectedColor}
            selectedProducts={selectedProducts}
            teamName={teamName}
            products={products}
            setErrors={setErrors}
          />
        </form>
      </div>
    </div>
  );
}
