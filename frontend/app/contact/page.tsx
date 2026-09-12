import React from "react";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/api";
import { ContactForm } from "@/components/contact/ContactForm";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Facebook,
  ExternalLink,
  Building2,
  Factory,
  Clock,
} from "lucide-react";

export const revalidate = 60; // ISR cache for 60s

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const companyName = settings?.company_name || "New Rahad Hosiery & Garments";

  return {
    title: "Contact Us & Business Inquiries",
    description: `Connect with ${companyName}. Factory location, direct phone, WhatsApp business chat, wholesale inquiries, and showroom visit scheduling.`,
    openGraph: {
      title: `Contact Us | ${companyName}`,
      description: `Connect directly with ${companyName} for product and wholesale inquiries.`,
    },
  };
}

interface ContactPageProps {
  searchParams?: {
    product?: string;
    type?: string;
    sku?: string;
  };
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const settings = await getSiteSettings();

  const companyName = settings?.company_name || "New Rahad Hosiery & Garments";
  const phone = settings?.phone_primary || "+880 1XXX-XXXXXX";
  const secondaryPhone = settings?.phone_secondary || "";
  const email = settings?.email_primary || "info@newrahad.com";
  const salesEmail = settings?.email_inquiry || "sales@newrahad.com";
  const address = settings?.physical_address || "Factory & Showroom Premises, Industrial Hub, Bangladesh";
  const whatsappNumber = settings?.whatsapp_number || "+880 1XXX-XXXXXX";
  const facebookUrl = settings?.facebook_url || "";
  const googleMapsEmbedUrl = settings?.google_maps_embed_url || "";
  const googleMapsPageUrl = settings?.google_maps_page_url || "";

  const initialProductName = searchParams?.product
    ? `${searchParams.product}${searchParams.sku ? ` (${searchParams.sku})` : ""}`
    : "";

  const whatsappUrl = buildWhatsAppInquiryUrl({
    phone: whatsappNumber,
    productName: searchParams?.product,
    productCode: searchParams?.sku,
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Page Header */}
        <div className="flex flex-col items-start mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold tracking-wide uppercase mb-3 border border-sky-200">
            <Building2 className="w-3.5 h-3.5 text-sky-700" />
            <span>Direct Business Communications</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
            Contact Our Manufacturing Desk
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Have an inquiry about our manufactured products, bulk order pricing, custom sizes, or wish to schedule a factory tour? Reach out directly via our contact form or instant WhatsApp.
          </p>
        </div>

        {/* Main Grid: Contact Channels + Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          {/* Left Column: Direct Coordinates Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* WhatsApp Quick Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-emerald-600 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg leading-tight">
                    Instant WhatsApp Support
                  </h3>
                  <span className="text-xs text-emerald-100">Fastest response for buyers</span>
                </div>
              </div>

              <p className="text-xs text-emerald-50 leading-relaxed mb-5">
                Chat directly with our factory sales desk for instant stock availability, wholesale minimum order quantities, and sample catalogs.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-semibold text-xs shadow transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Start WhatsApp Chat ({whatsappNumber})</span>
              </a>
            </div>

            {/* Contact Details List */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
                Factory & Office Coordinates
              </h3>

              <div className="space-y-4 text-xs text-slate-600">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Facility Address:</span>
                    <span className="text-slate-600 leading-relaxed">{address}</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Direct Phone Lines:</span>
                    <a href={`tel:${phone}`} className="text-slate-600 hover:text-sky-700 block">
                      Primary: {phone}
                    </a>
                    {secondaryPhone && (
                      <a href={`tel:${secondaryPhone}`} className="text-slate-600 hover:text-sky-700 block">
                        Secondary: {secondaryPhone}
                      </a>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Email Correspondence:</span>
                    <a href={`mailto:${email}`} className="text-slate-600 hover:text-sky-700 block">
                      General: {email}
                    </a>
                    <a href={`mailto:${salesEmail}`} className="text-slate-600 hover:text-sky-700 block">
                      Wholesale & Sales: {salesEmail}
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Working Hours:</span>
                    <span className="text-slate-600">Saturday to Thursday (9:00 AM – 7:00 PM)</span>
                  </div>
                </div>

                {/* Facebook Integration */}
                {facebookUrl && (
                  <div className="pt-2">
                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors w-full justify-center"
                    >
                      <Facebook className="w-4 h-4 text-sky-600" />
                      <span>Official Facebook Page</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <ContactForm
              initialProduct={initialProductName}
              initialType={searchParams?.type || "general"}
            />
          </div>
        </div>

        {/* 3. Google Maps Integration Section */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 block mb-1">
                Geographic Location
              </span>
              <h3 className="font-heading font-bold text-xl text-slate-900">
                Factory & Showroom Map
              </h3>
            </div>

            {googleMapsPageUrl && (
              <a
                href={googleMapsPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow transition-all self-start sm:self-auto"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Responsive Map Container */}
          <div className="relative aspect-[21/9] w-full rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden">
            {googleMapsEmbedUrl ? (
              <iframe
                src={googleMapsEmbedUrl}
                title="Factory and Showroom Location Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-slate-100 text-slate-400">
                <MapPin className="w-12 h-12 text-slate-300 mb-2 stroke-[1.5]" />
                <span className="text-xs font-semibold text-slate-700">
                  {address}
                </span>
                <span className="text-[11px] text-slate-400 mt-1">
                  Google Maps iframe embed placeholder (manageable via Admin Site Settings)
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
