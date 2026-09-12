import React from "react";
import type { Metadata } from "next";
import { getGalleryItems, getSiteSettings } from "@/lib/api";
import { GalleryFilterClient } from "@/components/gallery/GalleryFilterClient";
import { Camera, Factory, ShieldCheck } from "lucide-react";

export const revalidate = 60; // ISR cache for 60s

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const companyName = settings?.company_name || "New Rahad Hosiery & Garments";

  return {
    title: "Photo & Facility Gallery",
    description: `Visual tour of ${companyName}: Knitting floor, sewing lines, machinery, finished garments, and on-site showroom.`,
    openGraph: {
      title: `Visual Gallery | ${companyName}`,
      description: `Visual tour of ${companyName} manufacturing operations.`,
    },
  };
}

export default async function GalleryPage() {
  const [galleryItems, settings] = await Promise.all([
    getGalleryItems(),
    getSiteSettings(),
  ]);

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Page Header */}
        <div className="flex flex-col items-start mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold tracking-wide uppercase mb-3 border border-sky-200">
            <Camera className="w-3.5 h-3.5 text-sky-700" />
            <span>Visual Evidence & Factory Tour</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
            Facility & Production Gallery
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Browse authentic photographs of our manufacturing units, knitting equipment, sewing workshops, showroom product displays, and finished packaging.
          </p>
        </div>

        {/* Interactive Filterable Gallery Grid with Lightbox */}
        <GalleryFilterClient initialItems={galleryItems} />
      </div>
    </div>
  );
}
