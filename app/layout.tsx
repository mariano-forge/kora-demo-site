import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

import Script from "next/script";


const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Café Boréal · torréfacteur à Lyon", template: "%s · Café Boréal" },
  description: "Café de spécialité torréfié sur place, pâtisseries maison et brunch le dimanche. Site de recette.",
  // A staging site: never indexed.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <p className="staging">Site de recette · version de travail, non publiée</p>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <Script src="https://scopeguard-eosin.vercel.app/kora-toolbar.js" data-site="eyJvIjoiRjBRTlQ2alZTRk1QYWFZWlRXMnB4dlJFeTF2NUdsZWoiLCJsIjoxNzkyMzQ3MDgwNzQxLCJwZXJtYW5lbnQiOnRydWV9~GOvjQ-8SZMC5jg-mqKwTarI_-KwUSuok7UzsAjOn7LQ" defer />
      </body>
    </html>
  );
}
