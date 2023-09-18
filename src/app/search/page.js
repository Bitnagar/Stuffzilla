"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { add } from "@/store/cartSlice";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { user } = useUser();
  const data = useSelector((state) => state.cart);

  useEffect(() => {
    const resp = fetch(`https://fakestoreapi.com/products`);
    resp.then((data) => data.json()).then((data) => setProducts(data));
  }, []);

  async function addToCart(product) {
    dispatch(add(product));
    const payload = JSON.stringify({ data: product, userId: user.id });
    console.log(payload);
    try {
      const response = await fetch("/api/add-to-cart", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload, // body data type must match "Content-Type" header
      });
      const body = await response.json();
      console.log(body);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="grid grid-cols-3">
      {products.map((c, k) => {
        return (
          <div
            key={k}
            className="flex flex-col gap-10 m-5 border border-solid rounded p-5 items-center justify-center"
          >
            <Image src={c.image} width={200} height={200} alt={c.title} />
            <h1>{c.description}</h1>
            <h1>${c.price}</h1>
            <Button onClick={() => addToCart(c)}>Add to cart</Button>
          </div>
        );
      })}
    </div>
  );
}
