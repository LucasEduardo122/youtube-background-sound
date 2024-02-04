import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Youtube Background Sound",
  description: "Lo-fi youtube background sound",
  icons: [
    {
      rel: 'icon',
      url: '/logo.png',
      sizes: '48x48',
      type: 'image/png',
    },
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className + ' flex m-0 p-0 h-full w-full'}>{children}
      </body>
    </html>
  );
}
