"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/stripe/convertToSubcurrency";
import { Button } from "@/components/ui/button";
import { KitCartItem, ProductCartItem } from "../cart/cart-context";

interface CheckoutFormProps {
  amount: number;
  items: (ProductCartItem | KitCartItem)[];
}

const CheckoutForm = ({ amount, items }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  // Prepare cart items for metadata
  const prepareMetadata = (items: (ProductCartItem | KitCartItem)[]) => {
    return items
      .map((item, index) => {
        // Handle ProductCartItem
        if ("product" in item) {
          return {
            [`item_${index}_type`]: "product",
            [`item_${index}_name`]: item.product.name,
            [`item_${index}_quantity`]: item.quantity.toString(),
            [`item_${index}_size`]: item.selectedAttributes.size || "N/A",
            [`item_${index}_color`]: item.selectedAttributes.color || "N/A",
          };
          // Handle KitCartItem
        } else {
          return {
            [`item_${index}_type`]: "kit",
            [`item_${index}_name`]: item.name,
            [`item_${index}_quantity`]: item.quantity.toString(),
            [`item_${index}_jersey_size`]: item.jersey.size,
            [`item_${index}_shorts_size`]: item.shorts.size,
            [`item_${index}_socks_size`]: item.socks.size,
            [`item_${index}_color`]: item.globalColor,
            [`item_${index}_player`]: item.player,
            [`item_${index}_team`]: item.team,
          };
        }
      })
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  };

  const formatOrderDescription = (items: (ProductCartItem | KitCartItem)[]) => {
    const itemDescriptions = items.map((item) => {
      if ("product" in item) {
        return `${item.quantity}x ${item.product.name}`;
      } else {
        return `${item.quantity}x ${item.name} Kit`;
      }
    });

    // Join items with commas and "and" for the last item
    if (itemDescriptions.length === 0) return "";
    if (itemDescriptions.length === 1) return itemDescriptions[0];

    const lastItem = itemDescriptions.pop();
    return `${itemDescriptions.join(", ")} and ${lastItem}`;
  };

  // generate client every time amount changes by sending POST request to the API route handler
  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: convertToSubcurrency(amount),
        metadata: prepareMetadata(items),
        description: formatOrderDescription(items),
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount, items]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/checkout/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when confirming the payment
      // Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation at which point
      // your customer is redirected to your "return_url"
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {clientSecret && (
        <PaymentElement
          options={{
            layout: {
              type: "accordion",
              defaultCollapsed: true,
              radios: true,
              spacedAccordionItems: false,
            },
            business: {
              name: "Sizu",
            },
          }}
        />
      )}
      <Button
        className="w-full py-5 mt-4 text-white"
        type="submit"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
      </Button>
      {errorMessage && (
        <p className="text-red-600 text-center text-md mt-2">
          Error: {errorMessage}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
