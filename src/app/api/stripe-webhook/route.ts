import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

type WebhookResponse = {
  success: boolean;
  message: string;
};

async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent,
) {
  try {
    // 1. Send confirmation email to customer
    // await sendOrderConfirmationEmail({
    //   email: paymentIntent.receipt_email,
    //   orderId: paymentIntent.metadata.orderId
    // });

    // 2. Update inventory ????????
    // await updateInventory(paymentIntent.metadata.items);

    console.log(`Payment ${paymentIntent.id} processed successfully`);
  } catch (error) {
    // Log the error but don't throw - we don't want to trigger a webhook retry
    console.error("Error handling successful payment:", error);
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    // 2. Send notification to customer
    // await sendPaymentFailureEmail({
    //   email: paymentIntent.receipt_email,
    //   orderId: paymentIntent.metadata.orderId
    // });

    console.log(`Payment ${paymentIntent.id} failed`);
  } catch (error) {
    console.error("Error handling failed payment:", error);
  }
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<WebhookResponse>> {
  try {
    // 1. Get the raw request body as text
    const body = await request.text();

    // 2. Get the signature from headers
    const signature = headers().get("stripe-signature");

    // 3. Validate required data
    if (!endpointSecret) {
      throw new Error("Missing Stripe webhook secret");
    }

    if (!signature) {
      throw new Error("Missing Stripe signature");
    }

    // 4. Verify the event
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed:`, err);
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 },
      );
    }

    // 5. Handle different event types
    try {
      switch (event.type) {
        case "payment_intent.succeeded":
          await handlePaymentIntentSucceeded(
            event.data.object as Stripe.PaymentIntent,
          );
          break;

        case "payment_intent.payment_failed":
          await handlePaymentIntentFailed(
            event.data.object as Stripe.PaymentIntent,
          );
          break;

        case "checkout.session.completed":
          // Handle checkout session completion
          break;

        case "charge.refunded":
          // Handle refund
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      // 6. Return a successful response
      return NextResponse.json(
        { success: true, message: "Webhook processed successfully" },
        { status: 200 },
      );
    } catch (error) {
      // Log the error but return 200 to prevent retries
      console.error(`Error processing webhook: ${error}`);
      return NextResponse.json(
        { success: true, message: "Webhook received" },
        { status: 200 },
      );
    }
  } catch (error) {
    // Only return 500 for serious errors that should trigger a retry
    console.error("Critical webhook error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
