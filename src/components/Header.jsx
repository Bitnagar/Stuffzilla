"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

export default function Header() {
  const { isSignedIn, userId: id } = useAuth();
  const pathname = usePathname();
  const { data, isLoading } = useSWR(`/api/cart?id=${id}`, fetcher, {
    refreshInterval: 1000,
  });

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
            <Link href="/search" id="shop">
              SHOP
            </Link>
          </li>
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
              {isSignedIn && <>{!isLoading && data && <>{data.length}</>}</>}
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
