import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Inter } from 'next/font/google';
import 'antd/dist/reset.css';
import { ConfigProvider } from "antd";
import Navbar from "@/components/ui/navbar";
import Header from "@/components/ui/header";
import MenuBarShop from "@/components/ui/menu";
import AppProvider from "@/app/app-provider";
import { cookies } from "next/headers";
import FooterShop from "@/components/ui/footer-shop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Shop3Man",
  description: "Shop3Man",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${inter.className} bg-white`}
      >
        <ConfigProvider>
          <AppProvider initialAccessToken={accessToken}>
            <Navbar />
            <Header />
            <MenuBarShop />
            {children}
            <FooterShop />
            <Toaster />
          </AppProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
