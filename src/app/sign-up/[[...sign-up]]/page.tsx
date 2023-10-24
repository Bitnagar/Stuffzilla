"use client";
import { usePathname } from "next/navigation";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  const pathname = usePathname();
  return (
    <main className="flex items-center justify-center">
      <SignUp afterSignInUrl={pathname} />
    </main>
  );
}
