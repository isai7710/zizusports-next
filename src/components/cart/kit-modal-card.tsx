import { X, Minus, Plus } from "react-feather";
import Image from "next/image";
import { KitCartItem, useCart } from "./cart-context";

interface KitModalCardProps {
  item: KitCartItem;
}

export default function KitModalCard({ item }: KitModalCardProps) {
  const { removeItem, updateQuantity } = useCart();
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={`https://res.cloudinary.com/de463zyga/image/upload/uniform${item.globalColor}.png`}
          alt={item.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{item.name}</h3>
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          <span className="mr-2">Color: {item.globalColor}</span>
          <span className="mr-2">Team: {item.team}</span>
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          <span className="mr-2">Jersey: {item.jersey.size}</span>
          <span className="mr-2">Short: {item.shorts.size}</span>
          <span>Sock: {item.socks.size}</span>
        </div>
        {item.player && (
          <div className="text-sm font-medium mt-1">Player: {item.player}</div>
        )}
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
          <span className="font-medium">${item.price}</span>
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
