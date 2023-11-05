import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

interface CartProducts {
  product_id: number,
  details: {
    id: number;
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

const uri = process.env.DATABASE_URL;

//get all products in cart
export async function GET(request: Request) {
  const client = new MongoClient(uri as string);
  const collection = client.db("stuffzilla").collection("cart");
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  try {
    await client.connect();
    const cart = await collection.findOne({
      id: id
    });
    if (cart) {
      await client.close();
      return NextResponse.json({ products: cart.products }, { status: 200 });
    } else {
      await client.close();
      return NextResponse.json({ error: "Cart not found. Please add some Products." }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//add items to cart
export async function POST(request: Request) {
  const client = new MongoClient(uri as string);
  const collection = client.db("stuffzilla").collection("cart");
  const payload = await request.json();
  try {
    await client .connect()
    //check if cart exists for that user. if true, then update the cart. else create a cart.
    const cart = await collection.findOne({ id: payload.userId });
    if (!cart) {
      await collection.insertOne({
        id: payload.userId,
        products: [
          {
            product_id: payload.data.id,
            details: payload.data,
            quantity: 1
          }
        ],
        created_at: new Date(),
        updated: new Date()
      });
    } else {
      let foundAndUpdated = false;
      cart.products.map((product: CartProducts) => {
        if (product.product_id === payload.data.id) {
          product.quantity += 1;
          foundAndUpdated = true;
        }
      });
      if (foundAndUpdated) {
        await collection.updateOne(
          {
            id: payload.userId
          },
          {
            $set: {
              products: cart.products,
              updated: new Date()
            }
          }
        );
      } else {
        await collection.updateOne(
          {
            id: payload.userId
          },
          {
            $push: {
              products: {
                product_id: payload.data.id,
                details: payload.data,
                quantity: 1
              }
            },
            $set: {
              updated: new Date()
            }
          }
        );
      }
    }
    await client.close();
    return new NextResponse(JSON.stringify({ "message": "cart updated." }), {
      status: 201
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ "error": error }), {
      status: 500
    });
  }
}

//remove items from cart
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const client = new MongoClient(uri as string);
  const collection = client.db("stuffzilla").collection("cart");
  const product_id = parseInt(searchParams.get("id") as string);
  const quantity = parseInt(searchParams.get("quantity") as string);
  const userId = searchParams.get("userId");
  try {
    await client.connect();
    if (quantity > 1) {
      const updatedCart = collection.updateOne(
        {
          id: userId,
          products: { $elemMatch: { "product_id": product_id } }
        },
        {
          $set: {
            "products.$.quantity": quantity - 1
          }
        }
      );
      if (await updatedCart) {
        await client.close();
      }
      return NextResponse.json(
        { "message": `Success. Quantity updated to ${quantity - 1}.` },
        { status: 200 }
      );
    } else {
      const updatedCart = collection.updateOne(
        {
          id: userId
        },
        {
          $pull: {
            products: { product_id: product_id }
          }
        }
      );
      if (await updatedCart) {
        await client.close();
      }
      return NextResponse.json(
        { "message": "item removed from cart." },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//remove items from cart
export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const client = new MongoClient(uri as string);
  const collection = client.db("stuffzilla").collection("cart");
  const product_id = parseInt(searchParams.get("id") as string);
  const quantity = parseInt(searchParams.get("quantity") as string);
  const userId = searchParams.get("userId");
  try {
    await client.connect();
    if (quantity >= 1) {
      const updatedCart = collection.updateOne(
        {
          id: userId,
          products: { $elemMatch: { "product_id": product_id } }
        },
        {
          $set: {
            "products.$.quantity": quantity + 1
          }
        }
      );
      if (await updatedCart) {
        await client.close();
      }
      return NextResponse.json(
        { "message": `Success. Quantity updated to ${quantity + 1}.` },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { "message": "Quantity was below 1." },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
