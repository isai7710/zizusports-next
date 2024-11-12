import { X } from "react-feather";
import { useCart } from "@/components/cart/cart-context";
import ProductModalCard from "./product-modal-card";
import KitModalCard from "./kit-modal-card";
import Link from "next/link";

export function CartModal() {
  const { items, getTotalPrice, isOpen, toggleModal } = useCart();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900 bg-opacity-50 z-50"
      onClick={(e) => e.target === e.currentTarget && toggleModal()}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-tl from-slate-50 to-slate-100 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button
              onClick={toggleModal}
              className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-200"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto pr-2">
            {items.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Your cart is empty.
              </p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id}>
                    {"product" in item ? (
                      <ProductModalCard item={item} />
                    ) : (
                      <KitModalCard item={item} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total</span>
                <span className="font-medium">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <Link href="/checkout" onClick={toggleModal}>
                <button className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-dark transition-colors duration-200">
                  Checkout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
