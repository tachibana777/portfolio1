import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Kritsada Hongpatsa — Offensive Security", description: "Cybersecurity and penetration testing portfolio of Kritsada Hongpatsa." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className="dark"><body className="font-sans">{children}</body></html>; }
