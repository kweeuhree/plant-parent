// import type { Metadata } from "next";
// import  font and styles
import { Inter } from "next/font/google";
// import "./globals.css";
// import SideBar
import SideBar from "../../(components)/SideBar/SideBar";

const inter = Inter({ subsets: ["latin"] });

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <SideBar />
        </body>
    </html>
  );
}
