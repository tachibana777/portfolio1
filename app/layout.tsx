import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme";
import "./globals.css";
export const metadata: Metadata = { title: "Kritsada Hongpatsa — Offensive Security", description: "Cybersecurity and penetration testing portfolio of Kritsada Hongpatsa." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans"><ThemeProvider>{children}</ThemeProvider></body>
    </html>
  );
}
