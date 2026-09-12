import React from "react";
import type { Metadata } from "next";
import { getCategories, getProducts, getSiteSettings } from "@/lib/api";
import { ProductFilterClient } from "@/components/products/ProductFilterClient";
import { Factory, ShieldCheck, Tag } from "lucide-react";

export const revalidate = 60; // ISR cache for 60s

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const companyName = settings?.company_name || "New Rahad Hosiery & Garments";

  return {
    title: "Product Catalogue",
    description: `Explore manufactured baby wear and hosiery garments from ${companyName}. In-house circular knitting, soft infant seams, and direct factory inquiry.`,
    openGraph: {
      title: `Product Catalogue | ${companyName}`,
      description: `Explore manufactured baby wear and hosiery garments from ${companyName}.`,
    },
  };
}

interface ProductsPageProps {
  searchParams?: {
    category?: string;
    search?: string;
    featured?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const [categories, productsResponse, settings] = await Promise.all([
    getCategories(),
    getProducts(),
    getSiteSettings(),
  ]);

  const initialCategorySlug = searchParams?.category || "all";
  const whatsappPhone = settings?.whatsapp_number || "+880 1XXX-XXXXXX";

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Page Header */}
        <div className="flex flex-col items-start mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold tracking-wide uppercase mb-3 border border-sky-200">
            <Factory className="w-3.5 h-3.5 text-sky-700" />
            <span>Direct Manufacturer Supply</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
            Manufactured Product Catalogue
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Every piece in our catalogue is manufactured in-house. Browse our current collections of combed cotton baby wear, soft-stretch infant sets, and reinforced hosiery.
          </p>
        </div>

        {/* Client Interactive Filter & Grid */}
        <ProductFilterClient
          initialProducts={productsResponse.results}
          categories={categories}
          whatsappPhone={whatsappPhone}
          initialCategorySlug={initialCategorySlug}
        />
      </div>
    </div>
  );
}
