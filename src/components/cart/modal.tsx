import { X } from "react-feather";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-slate bg-opacity-50 z-50"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-tl from-slate-50 to-slate-100 shadow-xl transition-transform duration-300 ease-in-out transform translate-x-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-200"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto">
            {/* Add cart items here */}
            <p>Your cart is empty.</p>
          </div>
          <div className="mt-4">
            <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-200">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
