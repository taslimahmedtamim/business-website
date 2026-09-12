import React from "react";
import Link from "next/link";
import { SiteSettings, Category } from "@/types";
import {
  Factory,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Facebook,
  MessageSquare,
} from "lucide-react";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";

interface FooterProps {
  settings: SiteSettings | null;
  categories: Category[];
}

export function Footer({ settings, categories }: FooterProps) {
  const companyName = settings?.company_name || "New Rahad Hosiery & Garments";
  const tagline = settings?.tagline || "Quality Hosiery & Baby Wear — Manufactured With Care";
  const phone = settings?.phone_primary || "+880 1XXX-XXXXXX";
  const email = settings?.email_primary || "info@newrahad.com";
  const address = settings?.physical_address || "Factory & Showroom Premises, Bangladesh";
  const whatsappNumber = settings?.whatsapp_number || "+880 1XXX-XXXXXX";
  const facebookUrl = settings?.facebook_url || "";
  const googleMapsUrl = settings?.google_maps_page_url || "";
  const whatsappUrl = buildWhatsAppInquiryUrl({ phone: whatsappNumber });

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Col 1 & 2: Brand & Manufacturing Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-sm">
                <Factory className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold font-heading text-xl tracking-tight text-white block leading-none">
                  {companyName}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 mt-1 block">
                  Manufacturing & Showroom
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              {tagline}
            </p>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                Verified Manufacturing Facility
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                We manufacture our own hosiery, socks, and infant garments with in-house knitting, precision pattern cutting, soft-seam stitching, and stringent multi-point quality checks.
              </p>
            </div>

            {/* Social Channels */}
            {facebookUrl && (
              <div className="pt-2">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors border border-slate-800"
                >
                  <Facebook className="w-4 h-4 text-sky-400" />
                  Follow us on Facebook
                </a>
              </div>
            )}
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2.5">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/factory" className="hover:text-white transition-colors">
                  Our Factory & Operations
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Product Catalogue
                </Link>
              </li>
              <li>
                <Link href="/showroom" className="hover:text-white transition-colors">
                  Showroom Tour
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Visual Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About the Company
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Manufactured Categories */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2.5">
              Categories
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/products?category=${cat.slug}`}
                      className="hover:text-white transition-colors flex items-center justify-between group"
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-slate-500 group-hover:text-sky-400">
                        ({cat.products_count})
                      </span>
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link href="/products" className="hover:text-white">Baby Wear</Link></li>
                  <li><Link href="/products" className="hover:text-white">Hosiery & Socks</Link></li>
                  <li><Link href="/products" className="hover:text-white">Kids Knits</Link></li>
                  <li><Link href="/products" className="hover:text-white">Cotton Basics</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Col 5: Factory & Contact Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2.5">
              Factory & Showroom
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  WhatsApp: {whatsappNumber}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </li>
            </ul>

            {googleMapsUrl && (
              <div className="pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="border-t border-slate-900 bg-black/40 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <p className="text-slate-400">
            Manufactured with in-house care and quality controls.
          </p>
        </div>
      </div>
    </footer>
  );
}
