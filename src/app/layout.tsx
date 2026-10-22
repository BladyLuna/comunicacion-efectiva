import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Comunicación Efectiva · Aprende, practica y evalúa",
  description:
    "Plataforma educativa sobre comunicación efectiva: escucha activa, asertividad, lenguaje no verbal, retroalimentación y comunicación digital. Incluye quiz interactivo con preguntas desde base de datos.",
  keywords: [
    "comunicación efectiva",
    "escucha activa",
    "asertividad",
    "comunicación no verbal",
    "retroalimentación",
    "INCOS",
  ],
  authors: [{ name: "Bladimir Luna Corrales" }],
  openGraph: {
    title: "Comunicación Efectiva",
    description: "Aprende, practica y evalúa tus habilidades de comunicación.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="halo-fondo" aria-hidden="true" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
