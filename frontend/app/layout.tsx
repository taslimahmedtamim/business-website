import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { getSiteSettings, getCategories } from "@/lib/api";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { JsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const companyName = settings?.company_name || "New Rahad Hosiery & Garments";
  const defaultTitle = settings?.meta_title_default || `${companyName} | Genuine Manufacturer`;
  const defaultDesc =
    settings?.meta_description_default ||
    "Genuine manufacturer of high-grade hosiery and baby wear products. In-house knitting, precision pattern cutting, and quality-tested garments.";

  return {
    title: {
      default: defaultTitle,
      template: `%s | ${companyName}`,
    },
    description: defaultDesc,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    icons: {
      icon: settings?.favicon || "/favicon.ico",
    },
    openGraph: {
      title: defaultTitle,
      description: defaultDesc,
      siteName: companyName,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, categories] = await Promise.all([
    getSiteSettings(),
    getCategories(),
  ]);

  const whatsappPhone = settings?.whatsapp_number || "+880 1XXX-XXXXXX";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": settings?.company_name || "New Rahad Hosiery & Garments",
    "url": baseUrl,
    "description": settings?.tagline || "Genuine manufacturer of premium hosiery and baby wear garments.",
    "telephone": settings?.phone_primary,
    "email": settings?.email_primary,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": settings?.physical_address || "Factory & Showroom Location, Bangladesh",
      "addressCountry": "BD"
    },
    ...(settings?.facebook_url ? { "sameAs": [settings.facebook_url] } : {})
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} overflow-x-hidden`}>
      <body className="min-h-screen flex flex-col font-sans antialiased text-slate-900 bg-slate-50 selection:bg-sky-500 selection:text-white overflow-x-hidden">
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-sky-700 focus:text-white focus:rounded-xl focus:shadow-2xl focus:font-semibold focus:outline-none focus:ring-4 focus:ring-sky-300"
        >
          Skip to main content
        </a>
        <JsonLd data={organizationSchema} />
        <Navbar settings={settings} />
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer settings={settings} categories={categories} />
        <FloatingWhatsApp phone={whatsappPhone} />
      </body>
    </html>
  );
}
