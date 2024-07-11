import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner"

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Budget-planner",
  description: "An application designed to help manage and keep track of your finances",
  icons:{
    icon:"/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
      <body className={outfit.className}>{children}
      <Toaster />
      </body>
      </ClerkProvider>
    </html>
  );
}
