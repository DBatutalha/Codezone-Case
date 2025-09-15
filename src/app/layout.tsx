import type { Metadata } from "next";
import { Inter, Saira_Condensed } from "next/font/google";
import "./globals.css";
import TRPCProvider from "@/components/providers/TRPCProvider";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });
const saira = Saira_Condensed({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-saira-condensed",
});

export const metadata: Metadata = {
  title: "Rapkology - Rap Kültürü Blog Platformu",
  description:
    "Modern rap kültürü blog platformu. En güncel rap haberleri, müzik keşifleri ve trend analizleri.",
  keywords: ["rap", "hip hop", "müzik", "blog", "kültür", "trend"],
  authors: [{ name: "Rapkology Team" }],
  openGraph: {
    title: "Rapkology - Rap Kültürü Blog Platformu",
    description:
      "Modern rap kültürü blog platformu. En güncel rap haberleri, müzik keşifleri ve trend analizleri.",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rapkology - Rap Kültürü Blog Platformu",
    description:
      "Modern rap kültürü blog platformu. En güncel rap haberleri, müzik keşifleri ve trend analizleri.",
  },
  other: {
    "preload-css": "false",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} ${saira.variable}`}>
        <TRPCProvider>
          <div className="w-full min-h-screen overflow-x-hidden">
            <Navbar />
            {children}
          </div>
        </TRPCProvider>
      </body>
    </html>
  );
}
