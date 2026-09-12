import React from "react";
import Image from "next/image";
import { FactoryProcessStep } from "@/types";
import { CheckCircle2, Factory, Layers, ShieldCheck, Sparkles, Package } from "lucide-react";

interface ProcessTimelineProps {
  steps: FactoryProcessStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const defaultSteps: FactoryProcessStep[] = [
    {
      id: "1",
      step_number: 1,
      title: "Raw Yarn Sourcing & Testing",
      description: "We carefully inspect and select high-grade combed cotton yarns, testing for tensile strength, staple length, and non-toxic dye absorption.",
      image: null,
      is_active: true,
    },
    {
      id: "2",
      step_number: 2,
      title: "In-House Knitting & Loom Weaving",
      description: "Fabric is knitted on high-precision circular and hosiery knitting machinery to achieve the exact target GSM, elasticity, and softness.",
      image: null,
      is_active: true,
    },
    {
      id: "3",
      step_number: 3,
      title: "Pattern Layout & Precision Cutting",
      description: "Master patterns specifically designed for infants and children are cut with tight tolerances to prevent distortion and fabric wastage.",
      image: null,
      is_active: true,
    },
    {
      id: "4",
      step_number: 4,
      title: "Flatlock Assembly & Seam Stitching",
      description: "Our dedicated sewing floor uses high-speed 4-thread overlock and flatlock stitching so inner seams stay completely smooth against baby skin.",
      image: null,
      is_active: true,
    },
    {
      id: "5",
      step_number: 5,
      title: "100% Quality Assurance Check",
      description: "Every single piece is scrutinized for stitch stability, snap button durability, measurement conformity, and color consistency.",
      image: null,
      is_active: true,
    },
    {
      id: "6",
      step_number: 6,
      title: "Steam Ironing & Protective Packaging",
      description: "Garments undergo steam finishing, delicate folding, and protective packaging ready for showroom distribution and wholesale fulfillment.",
      image: null,
      is_active: true,
    },
  ];

  const activeSteps = steps && steps.length > 0 ? steps : defaultSteps;

  return (
    <div className="relative py-8">
      {/* Central Line for Large Screens */}
      <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-0.5 bg-slate-200 -translate-x-1/2 pointer-events-none" />

      <div className="space-y-12 lg:space-y-20">
        {activeSteps.map((step, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={step.id || index}
              className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Center Badge */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-sky-600 text-white font-mono font-bold text-base items-center justify-center shadow-lg ring-4 ring-white z-10">
                {String(step.step_number).padStart(2, '0')}
              </div>

              {/* Text Card */}
              <div className="w-full lg:w-1/2 px-0 lg:px-8">
                <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="lg:hidden font-mono text-xl font-bold text-sky-600">
                      Step {String(step.step_number).padStart(2, '0')}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Stage {step.step_number} of {activeSteps.length}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Photo Card or Structured Graphic */}
              <div className="w-full lg:w-1/2 px-0 lg:px-8">
                <div className="relative aspect-[16/10] w-full rounded-3xl bg-slate-100 border border-slate-200 overflow-hidden shadow-sm flex items-center justify-center">
                  {step.image ? (
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="p-8 flex flex-col items-center justify-center text-center text-slate-400 bg-gradient-to-br from-slate-50 to-slate-200/70 w-full h-full">
                      <Factory className="w-12 h-12 text-slate-300 mb-2 stroke-[1.5]" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {step.title}
                      </span>
                      <span className="text-[11px] text-slate-400 mt-1">
                        Factory production activity showcase
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-slate-200">
                    Phase {step.step_number}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
