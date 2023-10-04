"use client";
import useSWR from "swr";
import { useAuth } from "@clerk/nextjs";
import { fetcher } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { loadStripe } from "@stripe/stripe-js";

export default function CartProducts() {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const { toast } = useToast();
  const { userId: id } = useAuth();
  const [totalCost, setTotalCost] = useState(0);
  const { data, error, isLoading } = useSWR(`/api/cart?id=${id}`, fetcher, {
    refreshInterval: 1000,
  });

  async function removeProducts(quantity, productId) {
    try {
      const response = await fetch(
        `/api/cart?id=${productId}&quantity=${quantity}&userId=${id}`,
        {
          method: "DELETE",
        }
      );
      const message = await response.json();
      if (message) {
        toast({
          description: "✅ Product removed successfully!",
        });
      }
    } catch (error) {
      toast({
        description: "❌ Failed to add product. Try again.",
      });
    }
  }

  async function addProducts(quantity, productId) {
    try {
      const response = await fetch(
        `/api/cart?id=${productId}&quantity=${quantity}&userId=${id}`,
        {
          method: "PATCH",
        }
      );
      const message = await response.json();
      if (message)
        toast({
          description: "✅ Product added successfully!",
        });
    } catch (error) {
      toast({
        description: "❌ Failed to add product. Try again.",
      });
    }
  }

  useEffect(() => {
    if (data) {
      let totalCost = 0;
      data.forEach((product) => {
        totalCost += product.details.price * product.quantity;
      });
      setTotalCost(totalCost);
    }
  }, [data]);

  async function checkout(e) {
    e.preventDefault();
    try {
      const url = fetch("/api/checkout_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((json) => window.location.assign(json));
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) return <h1>Loading cart...</h1>;
  if (error) return <h1>Some error occured. Reload and try again.</h1>;
  if (data.length < 1) return <h1>Your cart is empty. Do some shopping!</h1>;

  return (
    <>
      {data.map((product, key) => {
        return (
          <div key={key} className="flex gap-10">
            <Image
              src={product.details.image}
              alt={product.details.title}
              width="0"
              height="0"
              sizes="100vw"
              style={{ width: "200px", height: "auto" }}
            />
            <div className="flex flex-col gap-5">
              <h1>{product.details.title}</h1>
              <h1>{product.details.category}</h1>
              <h3>{product.details.description}</h3>
              <h3>${product.details.price}</h3>
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
      <div>this is the total cost: ${totalCost.toFixed(2)}</div>

      <Button onClick={(e) => checkout(e)}>Checkout</Button>
    </>
  );
}
