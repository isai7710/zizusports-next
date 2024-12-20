import type { Metadata } from "next";
//import localFont from "next/font/local";
import "./globals.css";
import { saira } from "@/lib/fonts";
import Footer from "@/components/footer";
import NavBar from "@/components/header";
import { CartProvider } from "@/components/cart/cart-provider";

/* 
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
*/
export const metadata: Metadata = {
  title: "Home | Zizu Sports",
  description: "Created with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${saira.className} antialiased custom-scrollbar bg-gradient-to-tl from-slate-50  to-slate-100`}
      >
        <CartProvider>
          <NavBar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
