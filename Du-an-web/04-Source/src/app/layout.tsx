import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: {
    default: "Mekong Sling — Rigging & Lifting Equipment Vietnam",
    template: "%s | Mekong Sling",
  },
  description:
    "Genuine hardware & certified slings. Wire rope, shackles, chains and rigging assemblies for offshore, port, and heavy industry. Based in Vung Tau, Vietnam.",
  keywords: [
    "wire rope",
    "shackle",
    "rigging",
    "lifting equipment",
    "Vung Tau",
    "Vietnam",
    "Green Pin",
    "ABLE",
    "wire rope sling",
    "rigging hardware",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${ibmPlexMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
