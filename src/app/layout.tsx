import type { Metadata } from "next";
//import localFont from "next/font/local";
import "./globals.css";
import { lusitana } from "@/lib/fonts";
import Footer from "@/components/footer";
import NavBar from "@/components/header";

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
      <body className={`${lusitana.className} antialiased relative`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
