import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getFactoryProcessSteps, getFactorySections, getSiteSettings } from "@/lib/api";
import { ProcessTimeline } from "@/components/factory/ProcessTimeline";
import { FacilityShowcase } from "@/components/factory/FacilityShowcase";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Factory,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
  Layers,
  MapPin,
  Calendar,
} from "lucide-react";

export const revalidate = 60; // ISR cache for 60s

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const companyName = settings?.company_name || "New Rahad Hosiery & Garments";

  return {
    title: "Our Factory & Manufacturing Operations",
    description: `Explore the manufacturing facility of ${companyName}. In-house circular knitting, precision pattern cutting, soft infant flatlock stitching, and multi-stage quality control.`,
    openGraph: {
      title: `Our Factory & Manufacturing Operations | ${companyName}`,
      description: `Explore the manufacturing facility of ${companyName}.`,
    },
  };
}

export default async function FactoryPage() {
  const [steps, sections, settings] = await Promise.all([
    getFactoryProcessSteps(),
    getFactorySections(),
    getSiteSettings(),
  ]);

  const companyName = settings?.company_name || "New Rahad Hosiery & Garments";
  const address = settings?.physical_address || "Factory & Showroom Premises, Bangladesh";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Industrial Header Banner */}
      <section className="relative bg-slate-950 text-white pt-28 pb-20 sm:pt-36 sm:pb-24 border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-950 border border-sky-800 text-sky-400 text-xs font-semibold tracking-wide uppercase mb-5">
              <Factory className="w-3.5 h-3.5" />
              <span>In-House Manufacturing Facility</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-6">
              Our Factory & Production Activities
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              At <strong className="text-white">{companyName}</strong>, manufacturing is not outsourced. We manage our own active manufacturing facility, combining precision knitting looms, specialized baby-wear sewing lines, and stringent quality control under one roof.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>100% In-House Operations</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Infant Safe Standards</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>On-Site Showroom Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Facility Operations */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          badge="Core Operations"
          title="Engineered for Precision & Infant Care"
          subtitle="Our factory infrastructure is purpose-built to handle both delicate baby clothing and high-durability daily hosiery."
          align="center"
        />

        <FacilityShowcase sections={sections} />
      </section>

      {/* 3. Sequential Manufacturing Pipeline Timeline */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            badge="Process Workflow"
            badgeVariant="amber"
            title="The Step-by-Step Manufacturing Journey"
            subtitle="From raw yarn intake to sterile steam-iron packaging, see how we craft garments with uncompromising attention to detail."
            align="center"
          />

          <ProcessTimeline steps={steps} />
        </div>
      </section>

      {/* 4. Factory & Showroom Visit Invitation Banner */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-14 border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-sky-950 border border-sky-800 text-sky-400 mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>Showroom & Factory Visits</span>
            </div>

            <h2 className="font-heading font-bold text-2xl sm:text-4xl text-white tracking-tight mb-4">
              Schedule a Factory & Showroom Inspection
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              We welcome retailers, wholesale buyers, and institutional partners to tour our manufacturing floor, observe the knitting machinery in operation, and inspect finished garment samples in our showroom.
            </p>

            <div className="flex items-start gap-2.5 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
              <span>{address}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto flex-shrink-0">
            <Link
              href="/contact?type=wholesale"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold shadow transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule a Visit</span>
            </Link>

            <Link
              href="/showroom"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-semibold transition-all"
            >
              <span>Explore Showroom</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
