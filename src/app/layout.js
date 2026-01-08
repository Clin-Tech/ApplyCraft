import Header from "../components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "../components/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://apply-craft.vercel.app"), // set your prod URL
  title: "ApplyCraft – AI Job Tracker & Outreach Assistant",
  description:
    "ApplyCraft helps you track job applications, store job descriptions, and generate tailored AI-powered cold emails, LinkedIn DMs, and cover letters.",
  openGraph: {
    title: "ApplyCraft – AI Job Tracker & Outreach Assistant",
    description:
      "Track your applications, centralize job descriptions, and generate tailored outreach with AI.",
    url: "https://apply-craft.vercel.app",
    siteName: "ApplyCraft",
    images: [
      {
        url: "/og-applycraft.png",
        width: 1200,
        height: 630,
        alt: "ApplyCraft dashboard preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ApplyCraft – AI Job Tracker & Outreach Assistant",
    description:
      "Track applications and generate tailored AI outreach from job descriptions.",
    images: ["/og-applycraft.png"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-slate-50`}>
        <Header />

        <main className="min-h-screen pt-4 pb-20 px-4 md:px-6 lg:px-8">
          {children}
        </main>

        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
