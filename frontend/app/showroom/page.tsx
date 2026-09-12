import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getShowroom, getSiteSettings } from "@/lib/api";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import {
  Building2,
  MapPin,
  Calendar,
  MessageSquare,
  Phone,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";

export const revalidate = 60; // ISR cache for 60s

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const companyName = settings?.company_name || "New Rahad Hosiery & Garments";

  return {
    title: "On-Site Showroom & Sample Exhibition",
    description: `Visit the official showroom of ${companyName}. Examine manufactured hosiery and infant clothing samples, test fabric GSM, and discuss bulk orders.`,
    openGraph: {
      title: `Showroom & Sample Exhibition | ${companyName}`,
      description: `Visit the official showroom of ${companyName}.`,
    },
  };
}

export default async function ShowroomPage() {
  const [showroomList, settings] = await Promise.all([
    getShowroom(),
    getSiteSettings(),
  ]);

  const primaryShowroom = showroomList && showroomList.length > 0 ? showroomList[0] : null;
  const companyName = settings?.company_name || "New Rahad Hosiery & Garments";
  const address = primaryShowroom?.address_override || settings?.physical_address || "Factory Showroom Premises, Bangladesh";
  const phone = settings?.phone_primary || "+880 1XXX-XXXXXX";
  const whatsappNumber = settings?.whatsapp_number || "+880 1XXX-XXXXXX";
  const googleMapsUrl = settings?.google_maps_page_url || "";

  const whatsappUrl = buildWhatsAppInquiryUrl({
    phone: whatsappNumber,
    customMessage: "Hello New Rahad Hosiery & Garments, I would like to schedule a visit to your factory showroom to inspect product samples and discuss orders.",
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* 1. Header Banner */}
        <div className="flex flex-col items-start mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold tracking-wide uppercase mb-3 border border-sky-200">
            <Building2 className="w-3.5 h-3.5 text-sky-700" />
            <span>Factory Showroom & Sample Suite</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
            Our On-Site Showroom
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Directly connected to our manufacturing floor, our showroom displays our complete catalogue of hosiery, infant rompers, and knitwear. Business buyers, retailers, and distributors are invited to inspect fabric quality and discuss partnerships.
          </p>
        </div>

        {/* 2. Showroom Profile Card & Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Visual Presentation */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] w-full rounded-3xl bg-slate-100 border border-slate-200 overflow-hidden shadow-sm flex items-center justify-center">
              {primaryShowroom?.image ? (
                <Image
                  src={primaryShowroom.image}
                  alt={primaryShowroom.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
              ) : (
                <div className="p-10 flex flex-col items-center justify-center text-center text-slate-400 bg-gradient-to-br from-slate-100 to-slate-200/80 w-full h-full">
                  <Building2 className="w-16 h-16 text-slate-300 mb-3 stroke-[1.5]" />
                  <span className="font-heading font-bold text-lg text-slate-600">
                    Main Factory Showroom
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    Garment sample displays & wholesale negotiation desk
                  </span>
                </div>
              )}

              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-md text-slate-900 shadow-sm">
                  Active Display Suite
                </span>
              </div>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
                <Sparkles className="w-5 h-5 text-amber-500 mx-auto mb-1.5" />
                <span className="text-xs font-bold text-slate-900 block">Touch & Feel Samples</span>
                <span className="text-[11px] text-slate-500">Examine 100% combed cotton</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
                <Layers className="w-5 h-5 text-sky-600 mx-auto mb-1.5" />
                <span className="text-xs font-bold text-slate-900 block">Full Color Lineup</span>
                <span className="text-[11px] text-slate-500">Evaluate colorfast shades</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1.5" />
                <span className="text-xs font-bold text-slate-900 block">Direct Factory Terms</span>
                <span className="text-[11px] text-slate-500">Negotiate with management</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visiting Coordinates & Actions */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col">
              <h2 className="font-heading font-bold text-xl text-slate-900 mb-4">
                Visitor & Appointment Guide
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {primaryShowroom?.description ||
                  "Our showroom is open to prospective business partners, retail clothing store owners, wholesalers, and institutional garment buyers. Experience our manufacturing quality firsthand."}
              </p>

              <div className="space-y-3.5 text-xs text-slate-700 pb-6 border-b border-slate-100">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Showroom Location:</span>
                    <span className="text-slate-600">{address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">Direct Contact:</span>
                    <a href={`tel:${phone}`} className="text-slate-600 hover:text-sky-700">
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">Visiting Hours:</span>
                    <span className="text-slate-600">Saturday to Thursday (Business Hours)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Book Visit via WhatsApp</span>
                </a>

                <Link
                  href="/contact?type=wholesale"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow transition-all"
                >
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span>Request Business Appointment</span>
                </Link>

                {googleMapsUrl && (
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium transition-colors"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Transition CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading font-bold text-xl text-white mb-1">
              Want to see our manufacturing facility first?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Take a tour of our in-house knitting looms and sewing floor.
            </p>
          </div>

          <Link
            href="/factory"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow transition-all flex-shrink-0"
          >
            <span>Explore Factory Tour</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
