import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Home",
  description: "Hanif Nahwan's portfolio",
  keywords: [
    "Hanif Nahwan Nurhadi",
    "Hanif Nahwan",
    "Hanif",
    "Hanif N2",
    "Hanif NN",
  ],
  openGraph: {
    type: "website",
    title: "Home",
    description: "Hanif Nahwan's portfolio",
    siteName: "Hanif Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home",
    description: "Hanif Nahwan's portfolio",
    creator: "@__notforyou__",
  },
  authors: [{ name: "Hanif Nahwan" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={robotoMono.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
