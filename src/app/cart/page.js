"use client";
import { useAuth } from "@clerk/nextjs";
import CartProducts from "@/components/CartProducts";

export default function Page() {
  //to-do
  /**
   *
   * Show all products in cart of the user. if empty show accordingly.
   *
   * give option to add or remove the same products.
   *
   * give similar products and let user add them.
   *
   * show total with discounts, taxes etc (optional)
   *
   * give a checkout button.
   */

  const { isSignedIn } = useAuth();
  return (
    <main className="w-full h-full flex">
      {isSignedIn ? (
        <>
          <section className="w-1/2 h-full bg-slate-500"></section>
          <section className="w-1/2 h-full bg-slate-300 p-8">
            <CartProducts />
          </section>
        </>
      ) : (
        <section>You are not signed in!</section>
      )}
    </main>
  );
}
