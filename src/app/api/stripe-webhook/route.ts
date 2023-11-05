import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;

export async function POST(req: Request) {
  const event = await req.json();  
  if(event.type === "checkout.session.completed") {
    const client = new MongoClient(uri as string);
    const collection = client.db("stuffzilla").collection("transactions");
    const checkoutSessionId = event.data.object.id;
    try {
      client
    .connect()
    .then(async () => {
        const record = await collection.findOne({ checkoutSessionId: checkoutSessionId})
        return record;
      })
      .then(
        async record => {
          const userId = record?.userId;
          if(userId) {
            const collection = client.db("stuffzilla").collection("cart");
            const updatedCart = await collection.updateOne({
              id: userId
            }, {
              $set: {
                products: [],
                updated: new Date(),
              }
            })
            return updatedCart;
          } else throw Error("Cart not found.");
        }
      )
      .then(
        async updatedCart => {
          await collection.updateOne({
            checkoutSessionId: checkoutSessionId
          }, {
            $set: {
              status: "complete",
              updated: new Date()
            }
          })
          return updatedCart;
        }
      )
      .then(
        async data => await client.close()
      );
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  return NextResponse.json({received: true});
}
