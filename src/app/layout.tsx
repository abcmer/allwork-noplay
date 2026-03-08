import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "All Work No Play",
  description: "All work and no play makes Jack a dull boy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
