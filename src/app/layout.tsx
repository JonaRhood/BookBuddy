import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { PreloadResources } from "./preload-resources";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookBuddy",
  description: "BookBuddy is a fun, fast-growing startup on a mission to help people discover books they'll love and keep track of what they want to read. Whether it’s thrillers, graphic novels, or sci-fi epics, BookBuddy gives users a simple way to explore and save books to their reading list.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PreloadResources />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <div className="fixed w-full z-10">
            <Header />
          </div>
          <div className="pt-26">
            {children}
          </div>
      </body>
    </html>
  );
}
