"use client";
import useSWR from "swr";
import { useAuth } from "@clerk/nextjs";
import { fetcher } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { loadStripe } from "@stripe/stripe-js";

interface Product {
  details: {
    category: string,
    description: string,
    id: number,
    image: string,
    price: number,
    rating: {
      count: number,
      rate: number
    },
    title: string
  }
  product_id: number,
  quantity: number
}

type Data = { products: [Product] };

export default function CartProducts() {
  loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );
  const { toast } = useToast();
  const { userId: id } = useAuth();
  const [totalCost, setTotalCost] = useState(0);
  const { data, error, isLoading } = useSWR<Data>(`/api/cart?id=${id}`, fetcher, {
    refreshInterval: 1000
  });

  async function removeProducts(quantity: number, productId: number) {
    try {
      const response = await fetch(
        `/api/cart?id=${productId}&quantity=${quantity}&userId=${id}`,
        {
          method: "DELETE"
        }
      );
      const message = await response.json();
      if (message) {
        toast({
          description: "✅ Product removed successfully!"
        });
      }
    } catch (error) {
      toast({
        description: "❌ Failed to add product. Try again."
      });
    }
  }

  async function addProducts(quantity: number, productId: number) {
    try {
      const response = await fetch(
        `/api/cart?id=${productId}&quantity=${quantity}&userId=${id}`,
        {
          method: "PATCH"
        }
      );
      const message = await response.json();
      if (message)
        toast({
          description: "✅ Product added successfully!"
        });
    } catch (error) {
      toast({
        description: "❌ Failed to add product. Try again."
      });
    }
  }

  useEffect(() => {
    if (data?.products !== undefined) {
      let totalCost = 0;
      data?.products.forEach((product: Product) => {
        totalCost += product.details.price * product.quantity;
      });
      setTotalCost(totalCost);
    }
  }, [data]);

  async function checkout(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    e.preventDefault();
    try {
      fetch("/api/checkout_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then((json) => window.location.assign(json.url));
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) return <h1>Loading cart...</h1>;
  if (error) return <h1>Some error occured. Reload and try again.</h1>;
  if (data?.products === undefined || data.products.length < 1) return <h1>Your cart is empty. Do some shopping!</h1>;

  return (
    <>
      {data.products.map((product: Product, key: number) => {
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
