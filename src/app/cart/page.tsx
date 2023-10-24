"use client";
import { useAuth } from "@clerk/nextjs";
import CartProducts from "@/components/CartProducts";

export default function Page() {
  const { isSignedIn } = useAuth();
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
