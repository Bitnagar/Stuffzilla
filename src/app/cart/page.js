"use client";
import { useUser } from "@clerk/nextjs";
import { useSelector } from "react-redux";

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
  const { isSignedIn, user } = useUser();
  const cart = useSelector((state) => state.cart);
  if (!isSignedIn) {
  }

  return <div>Hello, {user.firstName}</div>;
}
