import React from "react";
import Image from "next/image";
import { FactorySection } from "@/types";
import { Layers, ShieldCheck, Cog, CheckCircle2, Factory, Sparkles } from "lucide-react";

interface FacilityShowcaseProps {
  sections: FactorySection[];
}

export function FacilityShowcase({ sections }: FacilityShowcaseProps) {
  const defaultSections: FactorySection[] = [
    {
      id: "1",
      section_key: "machinery",
      title: "Circular Knitting & Specialized Hosiery Looms",
      subtitle: "Precision engineering calibrated for soft stretch",
      content:
        "Our facility houses computerized circular knitting machines capable of manufacturing high-density jersey, interlock, and rib knits. By regulating yarn tension at the knitting phase, we ensure every roll of fabric features balanced lateral stretch and consistent GSM.",
      image: null,
      display_order: 1,
    },
    {
      id: "2",
      section_key: "sewing",
      title: "Flatlock & Overlock Assembly Floor",
      subtitle: "Anti-chafing infant garment construction",
      content:
        "Infant clothing requires special seam engineering. Our sewing lines utilize 4-thread overlock and flatlock stitching stations, ensuring that internal seams remain completely flat and soft against sensitive baby skin without raw edges.",
      image: null,
      display_order: 2,
    },
    {
      id: "3",
      section_key: "quality_control",
      title: "Multi-Point Quality Control & Inspection",
      subtitle: "Rigorous standards from yarn to packaging",
      content:
        "Before any garment leaves our manufacturing floor, it undergoes extensive testing: stitch tensile strength, dimensional wash stability, snap button pull resistance, and needle-detector metal scanning to guarantee 100% infant safety.",
      image: null,
      display_order: 3,
    },
  ];

  const activeSections = sections && sections.length > 0 ? sections : defaultSections;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {activeSections.map((sec, idx) => (
        <div
          key={sec.id || idx}
          className="group flex flex-col p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        >
          {sec.image && (
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 border border-slate-100 shadow-sm bg-slate-100">
              <Image
                src={sec.image}
                alt={sec.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 border border-sky-100 flex items-center justify-center mb-6 shadow-sm">
            {idx === 0 ? (
              <Layers className="w-6 h-6" />
            ) : idx === 1 ? (
              <Sparkles className="w-6 h-6 text-amber-600" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            )}
          </div>

          <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 mb-1">
            {sec.subtitle || "Manufacturing Facility"}
          </span>

          <h3 className="font-heading font-bold text-xl text-slate-900 mb-3 leading-snug">
            {sec.title}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed flex-1">
            {sec.content}
          </p>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>In-House Verified Capability</span>
          </div>
        </div>
      ))}
    </div>
  );
}
