import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SalesAI — AI Sales Employee for Your Business",
  description: "Connect your knowledge base and let AI handle incoming sales inquiries 24/7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
