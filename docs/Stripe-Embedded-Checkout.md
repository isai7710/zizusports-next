# Stripe Checkout Implementation Guide

## Overview

This document outlines the implementation of Stripe's embedded UI checkout process in this Next.js 14 application with the App Router. The system integrates with WooCommerce for product management and uses a custom cart context for state management.

## Architecture Overview

### Key Components

1. **Cart Context (cart-provider.tsx and cart-context.ts)** - Manages the shopping cart state globally throughout the site
2. **checkout/page.tsx** - Handles the main checkout UI
3. **checkout-form.tsx** - Manages Stripe Elements integration
4. **API Route Handler in api/create-payment-intent** - Handles sensitive Stripe operations server-side for security purposes

## Implementation Details

### 1. Setup & Configuration

Required packages

```
npm install stripe @stripe/react-stripe-js @stripe/stripe-js
```

Environment variables required from your Stripe dashboard:

```
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### 2. Cart Context

The cart context maintains two types of items:

- ProductCartItem: Individual products with attributes (size, color, etc)
- KitCartItem: Bundled items (jersey, shorts, socks) with individual attributes

The context provides essential methods to handle basic shopping cart functionality:

- addProductItem/addKitItem
- removeItem
- updateQuantity
- getTotalPrice
- clearCart

### 3. Checkout Flow

#### Step 1: Initialize Stripe

in the checkout/page.tsx file:

```typescript
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
```

#### Step 2: Create Payment Intent

The checkout form only renders when items are in the cart, so before the checkout-form.tsx component renders, the client must...

1. Send a POST request to the `/api/create-payment-intent` route handler
2. Wait for server to create a PaymentIntent using Stripe SDK
3. Wait for server to return client secret if successful

#### Step 3: Render Payment Form

Stripe's **Elements** provider must wrap the checkout form for it to work. Learn more about it [here](https://docs.stripe.com/sdks/stripejs-react#elements-provider).

```typescript
<Elements
  stripe={stripePromise}
  options={{
    mode: "payment",
    amount: convertToSubcurrency(getTotalPrice()),
    currency: "usd",
  }}
>
  <CheckoutForm amount={getTotalPrice()} />
</Elements>
```

#### Step 4: Handle Payment Submission

1. Prevent form default submission
2. Submit card details to Stripe
3. Confirm payment with client secret
4. Handle success/error responses
5. Redirect to success page or show error

## Security Considerations

### Client-Side

- Never log or expose client secret, this is where the route handler (which runs server-side) comes into play
- Validate input before submission and handle errors gracefully, Stripe's `<PaymentElement />` component helps with this error UI in each form field but you can also display the error message with the errorMessage state variable in the checkout-form.tsx file
- Implement proper loading states and ui

### Server-Side

- Keep Stripe secret key secure in the route handler
- Validate payment amounts before creating intent! Notice we used the convertToSubcurrency utility function in the checkout-from POST request to convert the final amount (dollars) to cents (subcurrency), this is required by Stripe

## Notes and Considerations

- For Google Pay and Apple Pay integration to work, localhost needs to be https. Since it is http by default, consider using [lcl](lcl.host) for secure https connections in your local environment
