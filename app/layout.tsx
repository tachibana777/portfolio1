import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import { ThemeProvider } from "@/components/theme";
import { LanguageProvider } from "@/components/i18n";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({ subsets: ["thai", "latin"], display: "swap", variable: "--font-thai" });

export const metadata: Metadata = {
  title: "Kritsada Hongpatsa — Penetration Tester & SOC Analyst",
  description: "Cybersecurity, penetration testing, and SOC analyst portfolio of Kritsada Hongpatsa.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

// Runs before first paint: if the visitor chose Thai, mark <html> so the page is hidden until the Thai text is applied (max 1.8 s).
const earlyLanguage = `try{if(localStorage.getItem('lang')==='th'){var d=document.documentElement;d.lang='th';d.setAttribute('data-lang','th');d.classList.add('i18n-pending');setTimeout(function(){d.classList.remove('i18n-pending')},1800)}}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={notoSansThai.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: earlyLanguage }} />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
