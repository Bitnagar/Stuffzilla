import "./globals.css";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import ReduxProvider from "@/components/redux/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stuffzilla | Shop Now",
  description:
    "Stuffzilla gives your a range of products to shop from. Buy Now!"
};

export default function RootLayout({ children }) {
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
