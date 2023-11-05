"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import CartProducts from "@/components/Cart/CartProducts";

export default function Page() {
  const { isSignedIn, userId } = useAuth();

  // clear the pending checkout session after the user
  // clicks on the back button on checkout page and
  // comes to the cart page.
  useEffect(() => {
   try {
    fetch("/api/checkout_session", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId:userId })
    })
   } catch (error) {
      console.log(error);
   }
  })

  return (
    <main className="w-full h-full flex">
      {isSignedIn ?
        <>
          <section className="w-1/2 h-full bg-slate-500"></section>
          <section className="w-1/2 h-full bg-slate-300 p-8">
            <CartProducts />
          </section>
        </>
        : (
          <section>You are not signed in!</section>
        )}
    </main>
  );
}
