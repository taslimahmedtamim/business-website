import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getSiteSettings } from "@/lib/api";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { ProductCard } from "@/components/products/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { ChevronRight, Factory, ArrowRight, Building2, MessageSquare } from "lucide-react";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";

export const revalidate = 60; // ISR cache for 60s

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const [product, settings] = await Promise.all([
    getProductBySlug(params.slug),
    getSiteSettings(),
  ]);

  const companyName = settings?.company_name || "New Rahad Hosiery & Garments";

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested manufactured product could not be found.",
    };
  }

  const title = `${product.name} (${product.product_code})`;
  const description =
    product.short_description ||
    `Manufactured ${product.name} by ${companyName}. Material: ${product.material || "Combed Cotton"}. Direct factory inquiry.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${companyName}`,
      description,
      type: "website",
      images: product.images && product.images.length > 0 ? [product.images[0].image] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const [product, settings] = await Promise.all([
    getProductBySlug(params.slug),
    getSiteSettings(),
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = product.related_products || [];
  const whatsappPhone = settings?.whatsapp_number || "+880 1XXX-XXXXXX";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "sku": product.product_code,
    "description": product.short_description || product.description,
    "image": product.images?.map((img) => img.image) || [],
    "brand": {
      "@type": "Brand",
      "name": settings?.company_name || "New Rahad Hosiery & Garments",
    },
    "category": product.category?.name,
    ...(product.material ? { "material": product.material } : {}),
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}/`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": `${baseUrl}/products`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.category?.name || "Garments",
        "item": `${baseUrl}/products?category=${product.category?.slug || ""}`,
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": product.name,
        "item": `${baseUrl}/products/${product.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 sm:pt-36 sm:pb-24">
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbsSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Breadcrumbs Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 overflow-x-auto pb-1 scrollbar-none">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <Link href="/products" className="hover:text-slate-900 transition-colors">
            Products
          </Link>
          {product.category && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <Link
                href={`/products?category=${product.category.slug}`}
                className="hover:text-slate-900 transition-colors whitespace-nowrap"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Core Product Details & Interactive Controls */}
        <ProductDetailClient product={product} settings={settings} />

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 pt-16 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200 mb-2 inline-block">
                  Similar Manufactured Lines
                </span>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                  Related Garments in {product.category?.name}
                </h2>
              </div>

              <Link
                href={`/products?category=${product.category?.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 hover:text-sky-800 transition-colors"
              >
                <span>View More in Category</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  whatsappPhone={whatsappPhone}
                />
              ))}
            </div>
          </section>
        )}

        {/* Factory Consultation Banner */}
        <div className="mt-20 rounded-3xl bg-slate-950 text-white p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-sky-950 border border-sky-800 text-sky-400 mb-3">
              <Building2 className="w-3.5 h-3.5" />
              Direct Manufacturing Partner
            </div>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-2">
              Interested in Bulk Production for {product.name}?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We offer custom batch manufacturing, private label packaging, and wholesale pricing directly from our facility floor.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap flex-shrink-0">
            <Link
              href={`/contact?product=${encodeURIComponent(product.name)}&type=wholesale`}
              className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold shadow transition-all"
            >
              Wholesale Inquiry
            </Link>
            <Link
              href="/factory"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-semibold transition-all"
            >
              View Factory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
