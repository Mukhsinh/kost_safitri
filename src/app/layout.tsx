import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kost SAFITRI: Kenyamanan Rumah, Fleksibilitas Modern",
  description: "Hunian premium di pusat kota dengan fasilitas lengkap, keamanan 24 jam, dan desain modern. Daftar sekarang untuk pengalaman tinggal yang tak terlupakan.",
  keywords: ["Kost Pekalongan", "Kost Premium", "Hunian Modern", "Sewa Kamar Kost", "Kost Fasilitas Lengkap"],
  authors: [{ name: "Kost SAFITRI" }],
  metadataBase: new URL("https://kostsafitri.com"),
  openGraph: {
    title: "Kost SAFITRI | Kenyamanan Rumah Modern",
    description: "Nikmati hunian premium dengan standar kenyamanan tinggi dan fasilitas modern.",
    url: "/",
    siteName: "Kost SAFITRI",
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-inter">{children}</body>
    </html>
  );
}

