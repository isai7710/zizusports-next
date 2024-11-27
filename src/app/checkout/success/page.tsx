"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { amount: string };
}) {
  const [formattedAmount, setFormattedAmount] = useState("");

  useEffect(() => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    setFormattedAmount(formatter.format(parseFloat(searchParams.amount)));
  }, [searchParams.amount]);

  return (
    <main className="flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full my-8">
        <div className="flex flex-col items-center text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Thank you for your purchase
          </p>
          <p className="text-2xl font-semibold text-green-600 mb-6">
            {formattedAmount}
          </p>
          <p className="text-gray-600 mb-8">
            Please check your email for the payment confirmation and further
            details.
          </p>
          <Link
            href="/shop/products"
            className="bg-primary hover:bg-primary/80 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 mr-3" />
            Return to Shop
          </Link>
        </div>
      </div>
    </main>
  );
}
