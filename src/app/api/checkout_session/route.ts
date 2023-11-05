import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL as string;

function getExpiresAtTime(afterMinutes: number): number {
  const currentDate = new Date();
  const epochTimeMilliseconds = currentDate.getTime();
  const epochTimeSeconds = Math.floor(epochTimeMilliseconds / 1000);
  const expires_at = epochTimeSeconds + afterMinutes * 60;
  return expires_at;
}

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
  const line_items = payload.data.products.map((product: PayloadProduct) => {
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
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      expires_at: getExpiresAtTime(30),
      success_url: headersList.get("origin") + `/checkout-success`,
      cancel_url: headersList.get("origin") + "/cart"
    });
    if (session && session.object === "checkout.session") {
      const client = new MongoClient(uri as string);
      const collection = client.db("stuffzilla").collection("transactions");
      try {
        await client.connect()
        await collection.insertOne({
          userId: payload.userId,
          checkoutSessionId: session.id,
          amount: session.amount_total,
          status: "pending",
          created_at: new Date(),
          updated: new Date()
        })
        await client.close();
      } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const client = new MongoClient(uri as string);
  const collection = client.db("stuffzilla").collection("transactions");
  const payload = await req.json();
  try {
    await client.connect()
    await collection.deleteMany({
      userId: payload.userId,
      status: "pending"
    });
    await client.close();
    return NextResponse.json({ message: "Pending transaction(s) removed." })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
