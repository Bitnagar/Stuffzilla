import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

//add to cart api
export async function POST(req) {
  const payload = await req.json();
  const uri = process.env.DATABASE_URL;
  const client = new MongoClient(uri);
  try {
    client
      .connect()
      .then(async () => {
        const collection = client.db("stuffzilla").collection("cart");
        //check if cart exists for that user. if true, then update the cart. else create a cart.
        const cart = await collection.findOne({ id: payload.userId });
        if (!cart) {
          const createdCart = await collection.insertOne({
            id: payload.userId,
            products: [
              {
                product: {
                  details: payload.data,
                  product_id: payload.data.id,
                },
                quantity: {
                  nos: 1,
                },
              },
            ],
            created_at: new Date(),
            updated: new Date(),
          });
          return createdCart;
        } else {
          let foundAndUpdated = false;
          cart.products.map((product) => {
            if (product.product.product_id === payload.data.id) {
              product.quantity.nos += 1;
              foundAndUpdated = true;
            }
          });
          if (foundAndUpdated) {
            const updatedProduct = await collection.updateOne(
              {
                id: payload.userId,
              },
              {
                $set: {
                  products: cart.products,
                  updated: new Date(),
                },
              }
            );
            return updatedProduct;
          } else {
            const updatedProduct = await collection.updateOne(
              {
                id: payload.userId,
              },
              {
                $push: {
                  products: {
                    product: {
                      details: payload.data,
                      product_id: payload.data.id,
                    },
                    quantity: {
                      nos: 1,
                    },
                  },
                },
                $set: {
                  updated: new Date(),
                },
              }
            );
            return updatedProduct;
          }
        }
      })
      .then(async (cartData) => {
        if (cartData) await client.close();
      });
    return new NextResponse(JSON.stringify({ "message": "cart updated." }), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ "message": error }), {
      status: 500,
    });
  }
}
