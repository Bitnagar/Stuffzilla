import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const payload = await req.json();
  const line_items = payload.map((product) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.details.title,
          description: product.details.description,
          images: [product.details.image],
          metadata: []
        },
        unit_amount: product.details.price * 100
      },
      quantity: product.quantity
    };
  });
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `http://localhost:3000/checkout-success`,
      cancel_url: `http://localhost:3000/cart`
    });
    return NextResponse.json(session.url);
  } catch (err) {
    return new NextResponse({ message: err.message, status: 500 });
  }
}
