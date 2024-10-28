"use client";

import { WooCommerceProduct } from "@/lib/types/woocommerce";
import { useState } from "react";
import { ColorPicker } from "@/components/shop/color-picker";
import { SizePicker } from "@/components/shop/size-picker";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";

interface ProductInteractiveSectionProps {
  product: WooCommerceProduct;
  colors: string[];
  sizes: string[];
}

export function ProductInteractiveSection({
  product,
  colors,
  sizes,
}: ProductInteractiveSectionProps) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    colors.length > 0 ? colors[0] : undefined,
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    sizes.length > 0 ? sizes[0] : undefined,
  );

  return (
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
  );
}
