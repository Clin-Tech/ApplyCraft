import Header from "../components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "../components/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ApplyCraft - Job Application Tracker + AI Outreach",
  description:
    "Track applications, generate AI-powered outreach, and land your dream job faster",
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
