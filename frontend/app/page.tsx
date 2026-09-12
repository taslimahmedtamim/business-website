import React from "react";
import Link from "next/link";
import {
  getSiteSettings,
  getCategories,
  getProducts,
  getFactoryProcessSteps,
} from "@/lib/api";
import { HeroShowcase } from "@/components/home/HeroShowcase";
import { CategorySection } from "@/components/home/CategorySection";
import { ManufacturingProcessSection } from "@/components/home/ManufacturingProcessSection";
import { WholesaleBanner } from "@/components/home/WholesaleBanner";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Factory,
  ArrowRight,
  ShieldCheck,
  Building2,
  Layers,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const revalidate = 60; // Incremental Static Regeneration every 60s

export default async function HomePage() {
  const [settings, categories, productsResponse, processSteps] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getProducts({ featured: true }),
    getFactoryProcessSteps(),
  ]);

  const featuredProducts = productsResponse?.results || [];
  const whatsappPhone = settings?.whatsapp_number || "+880 1XXX-XXXXXX";

  return (
    <div className="flex flex-col w-full">
      {/* 1. Dynamic Animated Hero Showcase connected to backend featured products */}
      <HeroShowcase settings={settings} featuredProducts={featuredProducts} />

      {/* 2. Manufacturing Roots & About Intro */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200 mb-4">
                <Factory className="w-3.5 h-3.5" />
                About Our Operations
              </span>

              <h2 className="font-heading font-bold text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight mb-5">
                We Manufacture What We Sell. Genuine In-House Quality.
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                Unlike retail resellers or trading agents, <strong>New Rahad Hosiery & Garments</strong> manages its own active manufacturing facilities. We specialize in delicate baby wear suits, rompers, ribbed sets, and high-performance hosiery.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                By maintaining in-house circular knitting, precision pattern cutting, soft flatlock stitching, and multi-point inspection under one roof, we guarantee optimal fiber breathability, non-toxic infant dye compliance, and direct factory affordability.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow transition-all"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/factory"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-sm font-semibold transition-all"
                >
                  <Factory className="w-4 h-4 text-sky-600" />
                  <span>Factory Machinery</span>
                </Link>
              </div>
            </div>

            {/* 3 Pillars Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-base text-slate-900 mb-2">
                  Circular Knitting
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Controlled tension knitting producing 100% combed cotton jersey and interlock with gentle lateral elasticity.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-base text-slate-900 mb-2">
                  Infant Soft Seams
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Flatlock and 4-thread overlock assembly ensuring inner seams do not chafe or irritate newborn skin.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-base text-slate-900 mb-2">
                  Quality Assurance
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Multi-stage inspection protocol examining stitch strength, colorfastness, and dimensional wash stability.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-base text-slate-900 mb-2">
                  Factory Showroom
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  On-site sample showroom displaying active manufacturing catalogues for retailers, distributors, and buyers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Categories Showcase */}
      <CategorySection categories={categories} />

      {/* 4. Featured Manufactured Products */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-50 text-sky-700 border border-sky-200 mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Direct Production
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-4xl text-slate-900 tracking-tight">
                Featured Manufactured Products
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
                Examine our current flagship hosiery sets and baby wear pieces, manufactured to strict textile standards.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 hover:text-sky-800 transition-colors flex-shrink-0"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  whatsappPhone={whatsappPhone}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-sm">
                No featured products yet. Add or mark products as featured in the admin panel.
              </p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold shadow-md transition-all"
            >
              <span>Explore Complete Product Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Manufacturing Story (From Production to Product) */}
      <ManufacturingProcessSection steps={processSteps} />

      {/* 6. B2B / Wholesale Inquiry Banner */}
      <WholesaleBanner settings={settings} />
    </div>
  );
}
