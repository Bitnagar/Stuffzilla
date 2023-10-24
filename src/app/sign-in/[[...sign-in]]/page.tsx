"use client";
import { usePathname } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  const pathname = usePathname();
  return (
    <main className="flex items-center justify-center">
      <SignIn afterSignInUrl={pathname} />;
    </main>
  );
}
