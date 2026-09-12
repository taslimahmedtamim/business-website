"use client";

import React from "react";
import Link from "next/link";
import { SiteSettings } from "@/types";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { Building2, MessageSquare, Phone, ArrowRight, ShieldCheck } from "lucide-react";

interface WholesaleBannerProps {
  settings: SiteSettings | null;
}

export function WholesaleBanner({ settings }: WholesaleBannerProps) {
  const phone = settings?.phone_primary || "+880 1XXX-XXXXXX";
  const whatsappNumber = settings?.whatsapp_number || "+880 1XXX-XXXXXX";
  const whatsappUrl = buildWhatsAppInquiryUrl({
    phone: whatsappNumber,
    customMessage: "Hello New Rahad Hosiery & Garments, I am interested in discussing wholesale/bulk manufacturing opportunities.",
  });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden p-8 sm:p-14 lg:p-20 border border-white/10 shadow-2xl">
          {/* Subtle industrial background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl flex flex-col items-start">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/15 text-amber-400 mb-6 backdrop-blur-md">
              <Building2 className="w-3.5 h-3.5" />
              Direct B2B & Wholesale Supply
            </span>

            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-6">
              Partner Directly With Our Factory Floor.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-10 max-w-2xl">
              We work directly with retailers, baby shop chains, brand distributors, and institutional buyers across Bangladesh. Gain competitive factory-direct pricing, guaranteed batch consistency, custom labeling, and reliable delivery schedules.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <Link
                href="/contact"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-slate-950 hover:bg-slate-100 text-xs sm:text-sm font-bold shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                <span>Submit Wholesale Request</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Desk</span>
              </a>

              <a
                href={`tel:${phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/15 text-xs sm:text-sm font-semibold backdrop-blur-md transition-all"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call: {phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
