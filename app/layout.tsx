import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Manrope } from "next/font/google";

import "./globals.css";
import { invitationData } from "@/data/invitation";
import { buildMetadata } from "@/lib/seo";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

const script = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"]
});

export const metadata: Metadata = buildMetadata(invitationData);

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${script.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
