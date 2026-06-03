import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DentAI — AI-адміністратор для стоматологічних клінік",
  description: "DentAI відповідає пацієнтам у Instagram, Telegram і WhatsApp цілодобово та автоматично записує на прийом. Спробуйте 14 днів безкоштовно.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
