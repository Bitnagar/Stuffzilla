import "./globals.css";
import Header from "@/components/layout/Header";
import { Inter } from "next/font/google";
import Footer from "@/components/layout/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster";
import ReduxProvider from "@/components/redux/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stuffzilla | Shop Now",
  description:
    "Stuffzilla gives your a range of products to shop from. Buy Now!"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className + " "}>
          <ReduxProvider>
            <Header />
            {children}
            <Footer />
          </ReduxProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
