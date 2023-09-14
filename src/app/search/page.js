"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { add } from "@/store/cartSlice";
import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const resp = fetch(`https://fakestoreapi.com/products`);
    resp.then((data) => data.json()).then((data) => setProducts(data));
  }, []);

  const addToCart = (product) => {
    dispatch(add(product));
  };
  return (
    <div>
      {products.map((c, k) => {
        return (
          <div key={k}>
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
