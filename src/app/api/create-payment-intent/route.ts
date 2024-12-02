import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
//import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  try {
    // 1. Request Validation
    /*
    const headersList = headers();
    const origin = headersList.get("origin");
    if (!origin || origin !== process.env.NEXT_PUBLIC_APP_URL) {
      return NextResponse.json(
        { error: "Error: Invalid Origin Request" },
        { status: 403 },
      );
    }
    */

    // 2? Rate limiting implemented here

    // 3. Input validation
    const { amount, metadata, description } = await request.json();
    if (!amount || !metadata || !description) {
      return NextResponse.json(
        { error: "Error: Missing Required Fields" },
        { status: 400 },
      );
    }

    // 4. Validate metadata size since Stripe has a limit
    const metadataSize = JSON.stringify(metadata).length;
    if (metadataSize > 50000) {
      return NextResponse.json(
        { error: "Error: Metadata size is too large" },
        { status: 400 },
      );
    }

    // 5. Server-side Cart Validation
    // const validation = await validateCartPrices(items, amount);

    // CREATE PAYMENT INTENT
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: metadata,
      description: description,
    });

    // RETURN CLIENT SECRET
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Payment Intent Creation Error:", error);
    // Handle other errors (e.g. network issues, parsing errors, etc)
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 },
    );
  }
}
