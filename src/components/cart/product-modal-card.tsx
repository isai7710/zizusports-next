import { X, Minus, Plus } from "react-feather";
import Image from "next/image";
import { ProductCartItem, useCart } from "./cart-context";

interface ProductModalCardProps {
  item: ProductCartItem;
}

export default function ProductModalCard({ item }: ProductModalCardProps) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
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
            <span className="mr-2">Size: {item.selectedAttributes.size}</span>
          )}
          {item.selectedAttributes.color && (
            <span className="mr-2">Color: {item.selectedAttributes.color}</span>
          )}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1 rounded-full hover:bg-gray-100"
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="font-medium">
            ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
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
  );
}
