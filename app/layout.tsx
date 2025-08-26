import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import AppProviders from "@/providers/AppProviders";
import TanstackProvider from "@/providers/TanstackProvider";
import { Toaster } from "sonner";

const outFit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextJS Prisma Starter",
  description: "Build a simple Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outFit.variable} antialiased`}>
        <TanstackProvider>
          <AppProviders>
            {children}
          </AppProviders>
          <Toaster richColors position="bottom-right" />
        </TanstackProvider>
      </body>
    </html>
  );
}
