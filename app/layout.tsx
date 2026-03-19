import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import AmbientBackground from "@/components/AmbientBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neon Drop Protocol",
  description:
    "Claim your genesis NFT drop. Cyberpunk-grade minting on the blockchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${inter.variable} antialiased bg-[#050505] text-white`}
      >
        <AmbientBackground />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
