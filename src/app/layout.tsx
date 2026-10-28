import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: "#0675c1",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tutorbari.com"),
  title: {
    default: "#1 Platform for All Tutors | Hire Verified Tutors & Find Tuitions | TutorBari",
    template: "%s | TutorBari",
  },
  description:
    "Find verified home tutors or tuition jobs in Bangladesh by using TutorBari. A trusted platform to hire the best tutors near you or start your tutoring journey.",
  keywords: [
    "tutor",
    "tuitions",
    "home tutor",
    "online tutor",
    "dhaka tutor",
    "caretutors alternative",
    "tutorbari",
    "hire a tutor",
    "become a tutor",
  ],
  authors: [{ name: "TutorBari Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tutorbari.com",
    title: "#1 Platform for All Tutors | Hire Verified Tutors & Find Tuitions | TutorBari",
    description:
      "Find verified home tutors or tuition jobs in Bangladesh by using TutorBari. A trusted platform to hire the best tutors near you or start your tutoring journey.",
    siteName: "TutorBari",
  },
  twitter: {
    card: "summary_large_image",
    title: "#1 Platform for All Tutors | Hire Verified Tutors & Find Tuitions | TutorBari",
    description:
      "Find verified home tutors or tuition jobs in Bangladesh by using TutorBari. A trusted platform to hire the best tutors near you or start your tutoring journey.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 antialiased selection:bg-[#0675c1] selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
