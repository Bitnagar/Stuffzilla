"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { add } from "@/store/cartSlice";
import { useUser } from "@clerk/nextjs";

export default function Page({ params }) {
  const dispatch = useDispatch();
  const { isSignedIn } = useUser();
  /**
   * 
   * {
    id: 20,
    title: 'DANVOUY Womens T Shirt Casual Cotton Short',
    price: 12.99,
    description: '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
    rating: { rate: 3.6, count: 145 }
  }
  */
  const addToCart = async (product) => {
    dispatch(add(product));
  };

  const [products, setProducts] = useState([]);
  const category = params.category.replaceAll("-", " ");
  useEffect(() => {
    const resp = fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );
    resp.then((data) => data.json()).then((data) => setProducts(data));
  }, [category]);

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
