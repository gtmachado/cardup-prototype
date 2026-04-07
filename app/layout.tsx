import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { SupportChat } from "@/components/SupportChat";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CardUp - Cardápio Digital",
  description: "Seu cardápio merece um CardUp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} font-sans antialiased`}>
      <body className="min-h-screen">
        <AuthProvider>{children}</AuthProvider>
        <SupportChat />
      </body>
    </html>
  );
}
