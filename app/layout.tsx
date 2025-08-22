import { Roboto_Mono } from "next/font/google";
import "./globals.css";


import Menu from "@/components/Menu";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>
        {children}
        <Menu />
      </body>
    </html>
  );
}
