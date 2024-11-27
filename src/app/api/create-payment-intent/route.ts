import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const { amount, metadata, description } = await request.json();

    // validate metadata size since Stripe has a limit
    const metadataSize = JSON.stringify(metadata).length;
    if (metadataSize > 50000) {
      console.log(metadataSize);
      throw new Error("metadata exceeds Stripe size limit");
    }

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
    console.error("Internal Error:", error);
    // Handle other errors (e.g. network issues, parsing errors, etc)
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 },
    );
  }
}
