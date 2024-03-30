import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory Design",
  description: "An frontend design of check in modal for inventory design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="${inter.className} flex justify-center align-middle items-center min-h-screen">{children}</body>
    </html>
  );
}
