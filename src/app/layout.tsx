import GlassRipple from "@/components/ui/glass-ripple";
import { CartProvider } from "@/context/cart-context";
import { LenisProvider } from "@/context/lenis-context";
import { ThemeProvider } from "@/provider/ThemeProvider";
import { X } from "lucide-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediStore - MSR",
  description:
    "A simple e-commerce website built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <CartProvider>
              <GlassRipple />
              {children}
            </CartProvider>
          </LenisProvider>
          <Toaster
            position="bottom-right"
            richColors
            expand
            visibleToasts={3}
            closeButton
            duration={4000}
            offset={16}
            icons={{
              close: <X className="w-4 h-4" />,
            }}
            toastOptions={{
              className:
                "rounded-xl border border-border/50 backdrop-blur-md shadow-lg",
              classNames: {
                toast:
                  "group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl",
                closeButton:
                  "opacity-60 hover:opacity-100 transition cursor-pointer",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
