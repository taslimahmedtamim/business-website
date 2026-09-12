"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";
import { ArrowRight, Tag, Sparkles } from "lucide-react";

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-slate-100 text-slate-800 border border-slate-200 mb-3">
              <Tag className="w-3.5 h-3.5 text-amber-500" />
              In-House Collections
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
              Manufactured Categories
            </h2>
            <p className="mt-3 text-slate-500 text-sm sm:text-base max-w-xl leading-relaxed">
              Every garment starts on our specialized circular knitting looms. Explore our tailored baby wear and hosiery lines.
            </p>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors flex-shrink-0"
          >
            <span>Browse All Collections</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Modern Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group relative flex flex-col p-6 sm:p-7 rounded-3xl bg-slate-50/80 hover:bg-slate-950 border border-slate-200/80 hover:border-slate-900 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {cat.image && (
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-5 border border-slate-200/80 group-hover:border-white/10 shadow-sm bg-slate-100">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-white/10 flex items-center justify-center text-slate-900 group-hover:text-amber-400 transition-colors shadow-sm border border-slate-100 group-hover:border-white/10">
                  <Tag className="w-5 h-5" />
                </div>
                <span className="px-3 py-1 rounded-full bg-white group-hover:bg-white/10 text-xs font-bold text-slate-700 group-hover:text-white border border-slate-200 group-hover:border-white/10 transition-colors">
                  {cat.products_count} {cat.products_count === 1 ? "Product" : "Products"}
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-xl text-slate-900 group-hover:text-white transition-colors mb-2">
                {cat.name}
              </h3>

              <p className="text-xs text-slate-600 group-hover:text-slate-400 line-clamp-2 leading-relaxed flex-1 transition-colors">
                {cat.description || "In-house manufactured textiles crafted for superior infant comfort and durability."}
              </p>

              <div className="mt-6 pt-4 border-t border-slate-200/80 group-hover:border-white/10 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-amber-400 transition-colors">
                <span>Explore Lineup</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
