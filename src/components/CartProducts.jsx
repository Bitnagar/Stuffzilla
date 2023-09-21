"use client";
import useSWR from "swr";
import { useAuth } from "@clerk/nextjs";
import { fetcher } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

export default function CartProducts() {
  const { userId: id } = useAuth();
  const { data, error, isLoading } = useSWR(`/api/cart?id=${id}`, fetcher, {
    refreshInterval: 1000,
  });
  async function removeProducts(quantity, productId) {
    const response = await fetch(
      `/api/cart?id=${productId}&quantity=${quantity}&userId=${id}`,
      {
        method: "DELETE",
      }
    );
    const message = await response.json();
    console.log(message);
  }
  async function addProducts(quantity, productId) {
    const response = await fetch(
      `/api/cart?id=${productId}&quantity=${quantity}&userId=${id}`,
      {
        method: "PATCH",
      }
    );
    const message = await response.json();
  }
  if (isLoading) return <h1>Loading cart...</h1>;
  if (error) return <h1>Some error occured. Reload and try again.</h1>;
  if (data.length < 1) return <h1>Your cart is empty. Do some shopping!</h1>;
  return (
    <>
      {data.map((product, key) => {
        return (
          <div key={key} className="flex">
            <Image
              src={product.details.image}
              alt={product.details.title}
              width={200}
              height={200}
            />
            <div className="flex flex-col">
              <h1>{product.details.title}</h1>
              <h1>{product.details.category}</h1>
              <h3>{product.details.description}</h3>
              <h3>{product.details.price}</h3>
              <div>
                <Button
                  onClick={() =>
                    removeProducts(product.quantity, product.product_id)
                  }
                >
                  -
                </Button>
                <span className="mx-5">{product.quantity}</span>
                <Button
                  onClick={() =>
                    addProducts(product.quantity, product.product_id)
                  }
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
