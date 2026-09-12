import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FactoryProcessStep } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight, Factory, CheckCircle, ChevronRight } from "lucide-react";

interface ManufacturingProcessSectionProps {
  steps: FactoryProcessStep[];
}

export function ManufacturingProcessSection({ steps }: ManufacturingProcessSectionProps) {
  // Fallback default steps if backend is empty
  const displaySteps = steps.length > 0 ? steps : [
    {
      id: "1",
      step_number: 1,
      title: "Raw Yarn Sourcing & Testing",
      description: "Inspecting and selecting high-grade combed cotton yarns, verified for softness and tensile strength.",
      image: null,
      is_active: true,
    },
    {
      id: "2",
      step_number: 2,
      title: "In-House Knitting & Loom Weaving",
      description: "Fabric knitted on circular and hosiery machines calibrated for exact target GSM and soft stretch.",
      image: null,
      is_active: true,
    },
    {
      id: "3",
      step_number: 3,
      title: "Pattern Layout & Precision Cutting",
      description: "Computerized and master manual cutting ensuring ergonomic infant fits and zero fabric distortion.",
      image: null,
      is_active: true,
    },
    {
      id: "4",
      step_number: 4,
      title: "Flatlock Assembly & Seam Stitching",
      description: "High-speed 4-thread overlock and flatlock stitching keeping seams silky-smooth against baby skin.",
      image: null,
      is_active: true,
    },
    {
      id: "5",
      step_number: 5,
      title: "100% Quality Assurance Check",
      description: "Multi-point inspection for stitch integrity, button durability, and dimensional consistency.",
      image: null,
      is_active: true,
    },
    {
      id: "6",
      step_number: 6,
      title: "Steam Ironing & Protective Packaging",
      description: "Steam finishing, hygienic folding, and packaging ready for showroom and wholesale fulfillment.",
      image: null,
      is_active: true,
    },
  ];

  return (
    <section className="py-20 bg-slate-100/70 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          badge="Manufacturing Story"
          badgeVariant="sky"
          title="From Production to Product"
          subtitle="Explore how raw combed cotton transforms into finished baby wear and hosiery in our in-house manufacturing floor."
          align="center"
        />

        {/* Process Flow Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {displaySteps.map((step, idx) => (
            <div
              key={step.id || idx}
              className="group relative flex flex-col p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {step.image && (
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 border border-slate-100 shadow-sm bg-slate-100">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Header with Step Number */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-sky-700">
                  {String(step.step_number).padStart(2, '0')}
                </span>
                <span className="w-8 h-8 rounded-full bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xs border border-sky-100">
                  <CheckCircle className="w-4 h-4 text-sky-600" />
                </span>
              </div>

              {/* Step Title */}
              <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-sky-700 transition-colors mb-2">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                {step.description}
              </p>

              {/* Step Stage Tag */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Phase {step.step_number} of {displaySteps.length}</span>
                <span className="text-sky-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Process CTA Button */}
        <div className="mt-12 text-center">
          <Link
            href="/factory"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow transition-all"
          >
            <Factory className="w-4 h-4 text-sky-400" />
            <span>Discover Our Factory & Machinery in Detail</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
