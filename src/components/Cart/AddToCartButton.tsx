"use client";
import React from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface FakeStoreProducts {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string
  image: string,
  rating: { rate: number, count: number }
}

interface AddToCartButtonProps {
  product: FakeStoreProducts;
  children?: React.ReactNode;
}

export default function AddToCartButton({ product, children }: AddToCartButtonProps) {
  const { toast } = useToast();
  const { userId } = useAuth();
  async function addToCart(product: FakeStoreProducts) {
    const payload = JSON.stringify({ data: product, userId: userId });
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: payload
      });
      if (response.ok) {
        toast({
          description: "✅ Product added successfully!"
        });
      } else
        throw Error("Failed to add product in cart. Try again or contact us.");
    } catch (error) {
      console.error(error);
      toast({
        description: "❌ Failed to add products. Try again."
      });
    }
  }

  return (
    <Button
      onClick={() => {
        addToCart(product);
      }}
    >
      Add to Cart
    </Button>
  );
}
