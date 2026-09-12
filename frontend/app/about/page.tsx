import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings, getCategories } from "@/lib/api";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Factory,
  ShieldCheck,
  Building2,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Heart,
  Target,
  Award,
} from "lucide-react";

export const revalidate = 60; // ISR cache for 60s

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const companyName = settings?.company_name || "New Rahad Hosiery & Garments";

  return {
    title: "About Us & Manufacturing Identity",
    description: `Learn about ${companyName}. Our manufacturing roots, specialized baby wear craft, circular knitting capabilities, and commitment to quality.`,
    openGraph: {
      title: `About Us | ${companyName}`,
      description: `Learn about ${companyName} manufacturing operations and company roots.`,
    },
  };
}

export default async function AboutPage() {
  const [settings, categories] = await Promise.all([
    getSiteSettings(),
    getCategories(),
  ]);

  const companyName = settings?.company_name || "New Rahad Hosiery & Garments";
  const tagline = settings?.tagline || "Quality Hosiery & Baby Wear — Manufactured With Care";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Header Banner */}
      <section className="relative bg-slate-950 text-white pt-28 pb-20 sm:pt-36 sm:pb-24 border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-950 border border-sky-800 text-sky-400 text-xs font-semibold tracking-wide uppercase mb-5">
              <Factory className="w-3.5 h-3.5" />
              <span>Manufacturer Profile</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-6">
              About New Rahad Hosiery & Garments
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
              {tagline}
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              We are a genuine manufacturing enterprise. We produce our own hosiery, socks, infant rompers, and knit garments with end-to-end in-house control over knitting, cutting, sewing, and finishing.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Core Manufacturing Identity Narrative */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-md border border-sky-200 inline-block">
              Our Manufacturing Commitment
            </span>

            <h2 className="font-heading font-bold text-2xl sm:text-4xl text-slate-900 tracking-tight leading-snug">
              Authentic Production Without Middlemen
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              In a market crowded with traders, distributors, and drop-shippers, <strong>{companyName}</strong> stands apart as an active manufacturing business. Every piece of clothing begins as selected combed cotton yarn on our knitting machinery.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              By controlling our own production lines, we eliminate markups from third-party subcontractors while maintaining direct oversight over stitch density, fiber breathability, and non-toxic baby-safe colorfastness.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/factory"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow transition-all"
              >
                <span>Tour Our Factory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold transition-all"
              >
                <span>Browse Products</span>
              </Link>
            </div>
          </div>

          {/* 3 Core Identity Cards */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900 mb-1">
                  Our Mission
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To manufacture comfortable, dermatologically safe, and durable hosiery and baby wear accessible to families, wholesalers, and retail businesses directly from our factory floor.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900 mb-1">
                  Baby-Wear First Craftsmanship
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Infants have fragile skin. We calibrate our knitting tension and seam stitches specifically to prevent redness, itching, and friction chafing.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900 mb-1">
                  Showroom & Partner Focus
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We maintain an open-door on-site showroom for retail store owners, wholesalers, and corporate buyers seeking bulk manufacturing partnerships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Manufactured Product Categories Summary */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            badge="Manufactured Collections"
            title="What We Produce"
            subtitle="Explore the product categories manufactured within our facility."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-semibold text-sky-700 uppercase">
                    {cat.products_count} Items
                  </span>
                  <h3 className="font-heading font-bold text-lg text-slate-900 mt-1 mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <Link
                  href={`/products?category=${cat.slug}`}
                  className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-sky-700 hover:text-sky-800"
                >
                  <span>View Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Ready for Partnership CTA */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 text-center max-w-3xl mx-auto shadow-xl">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-3">
            Interested in Partnering With Us?
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            Explore our catalogue, inspect our showroom, or send our sales desk an inquiry for custom manufacturing terms.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow transition-all"
            >
              Contact Our Sales Desk
            </Link>
            <Link
              href="/showroom"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
            >
              Visit Showroom
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
