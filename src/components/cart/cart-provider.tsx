"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ProductCartItem, KitCartItem, CartContext } from "./cart-context";
import { WooCommerceProduct } from "@/lib/types/woocommerce";
import { generateKitId } from "@/lib/cart/utils";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<(ProductCartItem | KitCartItem)[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Memoize expensive calculations
  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () =>
      items.reduce((total, item) => {
        if ("product" in item) {
          return total + parseFloat(item.product.price) * item.quantity;
        }
        return total + item.price * item.quantity;
      }, 0),
    [items],
  );

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addProductItem = (
    product: WooCommerceProduct,
    quantity: number,
    selectedAttributes: ProductCartItem["selectedAttributes"],
  ) => {
    setItems((currentItems) => {
      const attributeString = Object.entries(selectedAttributes)
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .map(([key, value]) => `${key}:${value}`)
        .join("|");
      const cartItemId = parseInt(
        `${product.id}${attributeString
          .split("")
          .reduce((acc, char) => acc + char.charCodeAt(0), 0)}`,
      );

      const existingItemIndex = currentItems.findIndex(
        (item) =>
          "product" in item && // type guard to ensure item we're looking for is of ProductCartItem type
          item.product.id === product.id &&
          item.id === cartItemId,
      );

      if (existingItemIndex > -1) {
        const newItems = [...currentItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      }

      return [
        ...currentItems,
        {
          id: cartItemId,
          product,
          quantity,
          selectedAttributes,
        } as ProductCartItem,
      ];
    });
  };

  const addKitItem = useCallback((kitData: Omit<KitCartItem, "id">) => {
    const kit: KitCartItem = {
      ...kitData,
      id: generateKitId(kitData),
    };

    // Optional: Validate with Zod
    // const validatedKit = KitCartItemSchema.parse(kit);

    setItems((currentItems) => {
      // Find if the kit already exists in the cart by checking kitItemId
      const existingItemIndex = currentItems.findIndex(
        (item) =>
          "jersey" in item && // Type guard to check if it's a KitCartItem
          item.id === kit.id,
      );

      if (existingItemIndex > -1) {
        return currentItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // Otherwise, add a new kit to the cart
      return [...currentItems, kit];
    });
  }, []);

  const removeItem = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem("cart");
  }, []);

  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        items,
        addProductItem,
        addKitItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems: () => totalItems,
        getTotalPrice: () => totalPrice,
        isOpen,
        toggleModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
