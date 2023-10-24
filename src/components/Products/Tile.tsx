"use client";
import Image from "next/image";
import AddToCartButton from "@/components/Cart/AddToCartButton";

interface FakeStoreProducts {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string
  image: string,
  rating: { rate: number, count: number }
}

type products = Array<FakeStoreProducts>;


export default function Tile({ products, filter }: { products: products, filter: { price?: string, rating?: string } }) {
  if (filter) {
    if (filter.price === "low") {
      products.sort((a, b) => a.price - b.price);
    } else if (filter.price === "high") {
      products.sort((a, b) => b.price - a.price);
    } else if (filter.rating === "low") {
      products.sort((a, b) => a.rating.rate - b.rating.rate);
    } else if (filter.rating === "high") {
      products.sort((a, b) => b.rating.rate - a.rating.rate);
    }
  }

  return (
    <>
      {products.map((product, k) => {
        return (
          <div
            key={k}
            className="flex flex-col gap-10 m-5 border border-solid rounded p-5 items-center justify-center"
          >
            <Image
              src={product.image}
              width={200}
              height={200}
              alt={product.title}
            />
            <h1>{product.description}</h1>
            <h1>${product.price}</h1>
            <AddToCartButton product={product}>Add to cart</AddToCartButton>
          </div>
        );
      })}
    </>
  );
}
