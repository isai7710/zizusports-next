"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
//import { useCart } from "@/components/cart/cart-context";

type PaymentStatus =
  | "succeeded"
  | "processing"
  | "requires_payment_method"
  | "failed";

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000;

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const paymentIntentId = searchParams.get("payment_intent");
        if (!paymentIntentId) {
          throw new Error("No payment intent ID found");
        }
        setIsLoading(true);

        // Get payment_intent from URL parameters
        const paymentIntent = searchParams.get("payment_intent");

        if (!paymentIntent) {
          throw new Error("No payment intent ID found");
        }

        // Make GET request with query parameter
        const response = await fetch(
          `/api/retrieve-payment-intent-status?payment_intent=${paymentIntent}`,
          {
            method: "GET",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch payment status");
        }

        const data = await response.json();

        // If payment is still processing and we haven't hit max retries
        if (data.status === "processing" && retryCount < MAX_RETRIES) {
          setTimeout(() => {
            setRetryCount((prev) => prev + 1);
          }, RETRY_DELAY);
          return;
        }

        setStatus(data.status);
        setAmount(data.amount);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
        setStatus("failed");
      } finally {
        setIsLoading(false);
      }
    };

    checkPaymentStatus();
  }, [searchParams, retryCount]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <p className="text-lg text-gray-600">Verifying your payment...</p>
        </div>
      );
    }

    switch (status) {
      case "succeeded":
        return (
          <div className="flex flex-col items-center text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Payment Successful!
              </h1>
              {amount && (
                <p className="text-xl text-green-600 font-semibold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(amount / 100)}
                </p>
              )}
              <p className="text-gray-600">
                Thank you for your purchase. You will receive a confirmation
                email shortly.
              </p>
            </div>
          </div>
        );

      case "processing":
        return (
          <div className="flex flex-col items-center text-center space-y-4">
            <AlertCircle className="h-16 w-16 text-yellow-500" />
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Payment Processing
              </h1>
              <p className="text-gray-600">
                Your payment is being processed. Please do not close this page.
                We&apos;ll update you once the payment is confirmed.
              </p>
            </div>
          </div>
        );

      case "failed":
        return (
          <div className="flex flex-col items-center text-center space-y-4">
            <XCircle className="h-16 w-16 text-red-500" />
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Payment Failed
              </h1>
              <p className="text-gray-600">
                {error || "There was an issue processing your payment."}
              </p>
              <Button asChild className="mt-4">
                <Link href="/checkout">Try Again</Link>
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              An unexpected error occurred. Please contact support if this
              persists.
            </AlertDescription>
          </Alert>
        );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        {renderContent()}

        <div className="mt-4 text-center">
          <Button
            disabled={isLoading}
            className="text-white bg-primary hover:bg-primary/80 font-medium rounded-md px-6 py-3"
          >
            <Link href="/shop/products">Return to Shop</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

// Loading component
function LoadingFallback() {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="text-lg text-gray-600">Loading payment status...</p>
      </div>
    </div>
  );
}

export default function StatusPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={<LoadingFallback />}>
        <PaymentStatusContent />
      </Suspense>
    </main>
  );
}
