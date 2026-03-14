import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toast/toaster";
import { Providers } from "@/context/providers";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  variable: "--jakarta-font",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DewSprint",
    template: "%s | DewSprint",
  },
  description: "DewSprint",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} antialiased`}>
        <Providers>{children}</Providers>
        <NextTopLoader showSpinner={false} />

        <Toaster />
      </body>
    </html>
  );
}
