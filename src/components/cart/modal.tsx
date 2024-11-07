import { X, Plus, Minus } from "react-feather";
import { useCart } from "@/components/cart/cart-context";
import Image from "next/image";

export function CartModal() {
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalPrice,
    isOpen,
    toggleModal,
  } = useCart();

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

          <div className="flex-grow overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Your cart is empty.
              </p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm"
                  >
                    {item.product.images && (
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={`https://res.cloudinary.com/de463zyga/image/upload/${item.product.images[0].name}.png`}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <div className="text-sm text-gray-500">
                        {item.selectedAttributes.size && (
                          <span className="mr-2">
                            Size: {item.selectedAttributes.size}
                          </span>
                        )}
                        {item.selectedAttributes.color && (
                          <span className="mr-2">
                            Color: {item.selectedAttributes.color}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 rounded-full hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="font-medium">
                          $
                          {(
                            parseFloat(item.product.price) * item.quantity
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                      aria-label="Remove item"
                    >
                      <X className="w-5 h-5" />
                    </button>
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
              <button className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-dark transition-colors duration-200">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
