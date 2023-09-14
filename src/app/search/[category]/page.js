"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page({ params }) {
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

  const [products, setProducts] = useState([]);
  const category = params.category.replaceAll("-", " ");
  useEffect(() => {
    const resp = fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );
    resp.then((data) => data.json()).then((data) => setProducts(data));
  }, [category]);

  return (
    <div>
      {products.map((c, k) => {
        return (
          <div key={k}>
            <Image src={c.image} width={200} height={200} alt={c.title} />
            <h1>{c.description}</h1>
            <h1>${c.price}</h1>
            <button>Add to cart</button>
          </div>
        );
      })}
    </div>
  );
}
