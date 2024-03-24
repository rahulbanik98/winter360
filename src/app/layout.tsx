import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Winter360",
  description: "winter 360 it's a weather checking app",
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
