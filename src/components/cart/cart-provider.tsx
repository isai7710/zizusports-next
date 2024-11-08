"use client";

import React, { useState, useEffect } from "react";
import { ProductCartItem, KitCartItem, CartContext } from "./cart-context";
import { WooCommerceProduct } from "@/lib/types/woocommerce";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<(ProductCartItem | KitCartItem)[]>([]);
  const [isOpen, setIsOpen] = useState(false);

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

  const addKitItem = (kit: KitCartItem, quantity: number) => {
    setItems((currentItems) => {
      // Find if the kit already exists in the cart by checking kitItemId
      const existingItemIndex = currentItems.findIndex(
        (item) =>
          "jersey" in item && // Type guard to check if it's a KitCartItem
          item.id === kit.id,
      );

      if (existingItemIndex > -1) {
        // If item exists, update the quantity
        const newItems = [...currentItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      }

      // Otherwise, add a new kit to the cart
      return [
        ...currentItems,
        {
          ...kit, // Spread the original kit item
          quantity, // Set the initial quantity
        },
      ];
    });
  };

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

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      if ("product" in item) {
        // Handle ProductCartItem
        const productPrice = parseFloat(item.product.price);
        return total + productPrice * item.quantity;
      } else if ("jersey" in item) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  };

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
        getTotalItems,
        getTotalPrice,
        isOpen,
        toggleModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
