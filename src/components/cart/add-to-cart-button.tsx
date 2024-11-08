"use client";

import { KitCartItem, useCart } from "@/components/cart/cart-context";
import { WooCommerceProduct } from "@/lib/types/woocommerce";

interface AddProductToCartButtonProps {
  product: WooCommerceProduct;
  selectedColor?: string;
  selectedSize?: string;
}

export function AddProductToCartButton({
  product,
  selectedColor,
  selectedSize,
}: AddProductToCartButtonProps) {
  const { addProductItem, toggleModal } = useCart();

  const handleAddToCart = () => {
    addProductItem(product, 1, {
      color: selectedColor,
      size: selectedSize,
    });
    toggleModal();
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
    >
      Add to cart
    </button>
  );
}

interface AddKitToCartButtonProps {
  kitName: string;
  kitPrice: string;
  kitImage: string;
  selectedPlayer: string;
  selectedColor: "Black" | "White";
  selectedProducts: Record<number, string>;
  products: WooCommerceProduct[];
  teamName: string;
}

export function AddKitToCartButton({
  kitName,
  kitPrice,
  selectedPlayer,
  selectedColor,
  selectedProducts,
  teamName,
  products,
}: AddKitToCartButtonProps) {
  const { addKitItem, toggleModal } = useCart();

  const handleAddToCart = () => {
    console.log("in handle add to cart func");
    const jerseyProduct = products.find((product) =>
      product.name.toLowerCase().includes("jersey"),
    );
    const shortsProduct = products.find((product) =>
      product.name.toLowerCase().includes("shorts"),
    );
    const socksProduct = products.find((product) =>
      product.name.toLowerCase().includes("socks"),
    );

    console.log(selectedProducts[1]);

    if (!jerseyProduct || !shortsProduct || !socksProduct) {
      console.error("Missing product details for kit components!");
      return;
    }
    // Create a KitCartItem
    const kitCartItem: KitCartItem = {
      id: parseInt(
        `${selectedProducts[1]}${selectedProducts[2]}${selectedProducts[3]}${selectedColor}`,
      ), // Generate a unique ID for the kit (based on product IDs and color)
      name: kitName,
      img: jerseyProduct.images[0]?.name || "", // Assuming the jersey image is used for kit image
      jersey: {
        product: jerseyProduct,
        size: selectedProducts[jerseyProduct.id], // selected size for jersey
      },
      shorts: {
        product: shortsProduct,
        size: selectedProducts[shortsProduct.id], // selected size for shorts
      },
      socks: {
        product: socksProduct,
        size: selectedProducts[socksProduct.id], // selected size for socks
      },
      globalColor: selectedColor,
      price: parseFloat(kitPrice),
      player: selectedPlayer,
      team: teamName,
      quantity: 1,
    };

    addKitItem(kitCartItem, 1);
    toggleModal();
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
    >
      Add to cart
    </button>
  );
}
