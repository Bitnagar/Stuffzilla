"use client";
import React from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function AddToCartButton({ product }) {
  const { userId } = useAuth();
  async function addToCart(product) {
    const payload = JSON.stringify({ data: product, userId: userId });
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      });
    } catch (error) {
      console.error(error);
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
