import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Comercial del Valle - Tu Tienda de Telas en San Pedro Sula",
  description:
    "Amplia variedad de telas estampadas, tropicales, florales, impermeables y de moda. Visítanos en Barrio El Benque, San Pedro Sula, Honduras.",
  keywords: [
    "telas",
    "tienda de telas",
    "San Pedro Sula",
    "Honduras",
    "telas estampadas",
    "telas tropicales",
    "telas florales",
    "telas impermeables",
    "Comercial del Valle",
  ],
  openGraph: {
    title: "Comercial del Valle - Tu Tienda de Telas en San Pedro Sula",
    description:
      "Amplia variedad de telas estampadas, tropicales, florales, impermeables y de moda. Visítanos en Barrio El Benque, San Pedro Sula, Honduras.",
    locale: "es_HN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#FAFAF7] text-[#1A1A1A]`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
