import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fellthriver",
  description: "Hanif Nahwan's portfolio",
  icons : {
    icon: "/icons/logo-white.svg",
  },
  keywords: [
    "Hanif Nahwan Nurhadi",
    "Hanif Nahwan",
    "Hanif",
    "Hanif N2",
    "Hanif NN",
    "Website Hanif",
    "hanifnurh xyz",
    "hanifnurh.xyz",
    "hanif ub",
    "hanif nfbs",
  ],
  openGraph: {
    type: "website",
    title: "Fellthriver",
    description: "Hanif Nahwan's portfolio",
    siteName: "Hanif Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fellthiver",
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
