import { NextResponse } from "next/server";
import Stripe from "stripe";
import Cors from "micro-cors";

// Initialize the CORS middleware
const cors = Cors({
  allowMethods: ["GET", "POST"],
  origin: "http://localhost:3000/", // Replace with your frontend origin
});

export async function POST(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const payload = await req.json();
  //   [
  //     {
  //       product_id: 5,
  //       details: {
  //         id: 5,
  //         title:
  //           "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
  //         price: 695,
  //         description:
  //           "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
  //         category: "jewelery",
  //         image:
  //           "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
  //         rating: [Object],
  //       },
  //       quantity: 5,
  //     },
  //   ];

  const line_items = payload.map((product) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.details.title,
          description: product.details.description,
          images: [product.details.image],
          metadata: [],
        },
        unit_amount: product.details.price * 100,
      },
      quantity: product.quantity,
    };
  });
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `http://localhost:3000/checkout-success`,
      cancel_url: `http://localhost:3000/cart`,
    });
    return NextResponse.json(session.url);
  } catch (err) {
    return new NextResponse({ message: err.message, status: 500 });
  }
}
