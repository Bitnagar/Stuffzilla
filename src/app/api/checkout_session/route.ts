import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

interface PayloadProduct {
  product_id: number,
  details: {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: [
      rate: number,
      count: number
    ]
  },
  quantity: number

}

export async function POST(req: Request) {
  const headersList = headers()
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2023-08-16" });
  const payload = await req.json();
  const line_items = payload.products.map((product: PayloadProduct) => {
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
      success_url: headersList.get("origin") + "/checkout-success",
      cancel_url: headersList.get("origin") + "/cart"
    });
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
