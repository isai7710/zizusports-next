"use client";

import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import {
  convertToSubcurrency,
  prepareMetadata,
  formatOrderDescription,
} from "@/lib/stripe/utils";
import { Button } from "@/components/ui/button";
import { KitCartItem, ProductCartItem } from "../cart/cart-context";

interface CheckoutFormProps {
  amount: number;
  items: (ProductCartItem | KitCartItem)[];
}

export default function CheckoutForm({ amount, items }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  // on mount and every time cart amount or items change we want to...
  // 1. send order information to server API endpoint to tell Stripe we want to create a payment intent
  // 2. retreive that payment intent's client secret and use it
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: convertToSubcurrency(amount),
            metadata: prepareMetadata(items),
            description: formatOrderDescription(items),
          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(
            errorData.error || "Failed to create payment intent.",
          );
          return;
        }

        const data = await response.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setErrorMessage(
            "Payment Intent creation failed. No client secret received.",
          );
        }
      } catch (error) {
        console.error("Error creating payment intent:", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    };

    createPaymentIntent();
  }, [amount, items]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet. Please try again.");
      setLoading(false);
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
        return_url: `${window.location.origin}/checkout/payment-status?amount=${amount}`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
      console.log(error);
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

  // Show the payment form
  return (
    <form onSubmit={handleSubmit}>
      {clientSecret && (
        <>
          <div className="mb-2">
            <LinkAuthenticationElement />
          </div>
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
        </>
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
}
