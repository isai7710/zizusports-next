"use client";

import React, { useState, useEffect } from "react";
import { CartItem, CartContext } from "./cart-context";
import { WooCommerceProduct } from "@/lib/types/woocommerce";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
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

  const addItem = (
    product: WooCommerceProduct,
    quantity: number,
    selectedAttributes: CartItem["selectedAttributes"],
  ) => {
    setItems((currentItems) => {
      // Create a unique ID for this cart item based on product ID and selected attributes
      const attributeString = Object.entries(selectedAttributes)
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .map(([key, value]) => `${key}:${value}`)
        .join("|");
      const cartItemId = parseInt(
        `${product.id}${attributeString.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)}`,
      );

      // Check if item with same product ID and attributes already exists
      const existingItemIndex = currentItems.findIndex(
        (item) => item.id === cartItemId,
      );

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const newItems = [...currentItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      }

      // Add new item
      return [
        ...currentItems,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          price: parseFloat(product.price),
          quantity,
          image: product.images?.[0]?.name,
          selectedAttributes,
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
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
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
