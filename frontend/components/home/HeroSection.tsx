import React from "react";
import Link from "next/link";
import { SiteSettings } from "@/types";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import {
  Factory,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Layers,
  Sparkles,
  MessageSquare,
} from "lucide-react";

interface HeroSectionProps {
  settings: SiteSettings | null;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const companyName = settings?.company_name || "New Rahad Hosiery & Garments";
  const tagline = settings?.tagline || "Quality Hosiery & Baby Wear — Manufactured With Care";
  const whatsappUrl = buildWhatsAppInquiryUrl({
    phone: settings?.whatsapp_number || "+880 1XXX-XXXXXX",
  });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-16 pb-20 lg:pt-24 lg:pb-28">
      {/* Background Industrial Subtle Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Manufacturer Stamp Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-950/80 border border-sky-800 text-sky-400 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm">
              <Factory className="w-3.5 h-3.5 text-sky-400" />
              <span>Genuine In-House Manufacturer</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.15] max-w-2xl mb-5">
              {tagline}
            </h1>

            {/* Supporting Proposition */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl mb-8">
              At <strong className="text-white font-semibold">{companyName}</strong>, we manufacture our own hosiery and baby wear line. From circular knitting looms and flatlock stitching to finishing and our on-site showroom, we deliver factory-direct craftsmanship you can trust.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10">
              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold shadow-lg shadow-sky-900/30 hover:shadow-sky-600/30 transition-all duration-200"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/factory"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm font-semibold border border-slate-700 transition-all duration-200"
              >
                <Factory className="w-4 h-4 text-sky-400" />
                <span>Our Factory Tour</span>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-sm font-semibold transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>

            {/* Verified Key Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/90 w-full text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>100% In-House Made</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Skin-Safe Infant Dye</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Showroom & Factory Hub</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Industrial Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-8 border border-slate-700/80 shadow-2xl backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />

              {/* Manufacturing Highlight Banner */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-700/70 mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block font-semibold">
                    Production Unit
                  </span>
                  <span className="font-heading font-bold text-xl text-white mt-0.5 block">
                    Manufacturing Hub
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Factory className="w-6 h-6" />
                </div>
              </div>

              {/* Feature Points */}
              <div className="space-y-4 text-sm text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400 flex-shrink-0 mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wide">
                      Knitting & Looms
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Precision circular knitting machines calibrated for soft-stretch infant hosiery and durable cotton knits.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wide">
                      Flatlock Anti-Chafing Sewing
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Smooth, irritation-free seam assembly specifically engineered for delicate baby skin.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wide">
                      Multi-Stage Quality Checks
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      100% garment inspection for seam strength, dimensional stability, and nickel-free hardware.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-6 pt-5 border-t border-slate-700/70 flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium text-slate-300">Showroom & Factory Direct</span>
                <Link
                  href="/showroom"
                  className="text-sky-400 hover:text-sky-300 font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <span>Visit Showroom</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
