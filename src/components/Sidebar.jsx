"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const resp = fetch("https://fakestoreapi.com/products/categories");
    resp.then((data) => data.json()).then((data) => setCategories(data));
  }, []);
  return (
    <>
      <Link href={"/search"}>All</Link>
      {categories.map((c, k) => {
        return (
          <Link key={k} href={`/search/${c.replaceAll(" ", "-")}`}>
            {c}
          </Link>
        );
      })}
      <br></br>
      <div className="flex flex-col">
        <h1>Sort</h1>
        <Link href={"/"}>Price: low to high</Link>
        <Link href={"/"}>Price: high to low</Link>
        <Link href={"/"}>Rating: lowest</Link>
        <Link href={"/"}>Rating: highest</Link>
      </div>
    </>
  );
}
