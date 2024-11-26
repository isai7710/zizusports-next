import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in-up">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Payment Successful!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Thank you for your purchase
          </p>
        </div>

        <div className="bg-primary/10 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700">Amount paid</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            ${parseFloat(amount).toFixed(2)}
          </p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-600">
            A confirmation email has been sent to your registered email address.
            Please check your inbox for further details.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-150"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
