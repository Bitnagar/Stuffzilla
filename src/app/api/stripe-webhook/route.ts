import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;

export async function POST(req: Request) {
  const event = await req.json();
  if (event.type === "checkout.session.completed") {
    const client = new MongoClient(uri as string);
    const collection = client.db("stuffzilla").collection("transactions");
    const checkoutSessionId = event.data.object.id;
    try {
      await client.connect();
      const record = await collection.findOne({ checkoutSessionId: checkoutSessionId })
      const userId = record?.userId;
      if (userId) {
        const collection = client.db("stuffzilla").collection("cart");
        await collection.updateOne({
          id: userId
        }, {
          $set: {
            products: [],
            updated: new Date(),
          }
        })
      } else throw Error("Cart not found.");
      await collection.updateOne({
        checkoutSessionId: checkoutSessionId
      }, {
        $set: {
          status: "complete",
          updated: new Date()
        }
      })
      await client.close();
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  return NextResponse.json({ received: true });
}
