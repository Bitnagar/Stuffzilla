"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useSelector } from "react-redux";

export default function Header() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const cart = useSelector((state) => state.cart);
  return (
    <header className=" bg-transparent p-5 2xl:px-40">
      <nav className="flex items-center justify-between">
        <div>
          <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight text-center 2xl:text-3xl">
            StuffZilla
          </h1>
        </div>
        <ul className="flex gap-4 xl:gap-10 [&>li]:font-bold [&>li]:text-sm  items-center 2xl:[&>li]:text-base">
          <li>
            <Link href="/" id="home">
              HOME
            </Link>
          </li>
          <li>
            <Link href="/" id="about">
              ABOUT
            </Link>
          </li>
          <li>
            <Link href="/cart" id="about" className="flex gap-2">
              <ShoppingCart />
              <p>{cart.length}</p>
            </Link>
          </li>
          {isSignedIn && (
            <SignedIn>
              {/* Mount the UserButton component */}
              <UserButton afterSignOutUrl={pathname} />
            </SignedIn>
          )}
          {!isSignedIn && (
            <>
              <SignedOut>
                <SignInButton />
                /
                <SignUpButton />
              </SignedOut>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}