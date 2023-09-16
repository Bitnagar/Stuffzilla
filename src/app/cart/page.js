"use client";
import { useUser } from "@clerk/nextjs";
import { useSelector } from "react-redux";

export default function Page() {
  const { isSignedIn, user } = useUser();
  const cart = useSelector((state) => state.cart);
  if (!isSignedIn) {
  }

  return <div>Hello, {user.firstName}</div>;
}
