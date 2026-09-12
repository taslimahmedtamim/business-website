"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductListItem } from "@/types";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { ArrowRight, MessageSquare, Tag, Shirt, Check } from "lucide-react";

interface ProductCardProps {
  product: ProductListItem;
  whatsappPhone?: string;
}

export function ProductCard({ product, whatsappPhone = "+880 1XXX-XXXXXX" }: ProductCardProps) {
  const [activeColorIdx, setActiveColorIdx] = useState<number>(0);

  const colors = (product.colors || []).slice(0, 3);
  const activeColor = colors[activeColorIdx] || null;

  const whatsappUrl = buildWhatsAppInquiryUrl({
    phone: whatsappPhone,
    productName: product.name,
    productCode: product.product_code,
    customMessage: `Hello New Rahad Hosiery & Garments, I am inquiring about "${product.name}" (SKU: ${product.product_code})${activeColor ? ` in Color: ${activeColor.name}` : ""}. Please provide bulk wholesale pricing and sample terms.`,
  });

  return (
    <div className="group relative flex flex-col rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-slate-100 to-slate-200/60 overflow-hidden">
        {product.primary_image ? (
          <Image
            src={product.primary_image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center">
            <Shirt className="w-12 h-12 text-slate-300 mb-2 stroke-[1.5]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Manufactured Garment
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">In-House Knitting</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-white/95 backdrop-blur-md text-slate-800 shadow-sm border border-slate-100">
            <Tag className="w-3 h-3 text-sky-600" />
            {product.category?.name || "Garments"}
          </span>
          {product.is_featured && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-500 text-white shadow-sm">
              Flagship
            </span>
          )}
        </div>

        {/* Product SKU Code Pill */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-950/80 text-white backdrop-blur-md shadow">
            {product.product_code}
          </span>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Title */}
        <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 line-clamp-1 group-hover:text-amber-600 transition-colors">
          <Link href={`/products/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        {/* Fabric Composition */}
        {product.material && (
          <p className="text-xs text-slate-500 mt-1 font-medium line-clamp-1">
            {product.material}
          </p>
        )}

        {/* Short Description */}
        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {product.short_description || "Crafted with skin-safe combed cotton and high-density circular knitting."}
        </p>

        {/* Available Colors (Max 3) & Sizes */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2.5">
          {/* Colors */}
          {colors.length > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Colors ({colors.length}/3):
              </span>
              <div className="flex items-center gap-1.5">
                {colors.map((c, idx) => {
                  const isSelected = activeColorIdx === idx;
                  return (
                    <button
                      key={c.id || idx}
                      onClick={() => setActiveColorIdx(idx)}
                      title={c.name}
                      aria-label={`Color: ${c.name}`}
                      className={`relative w-4 h-4 rounded-full border border-slate-300 transition-all ${
                        isSelected ? "scale-125 ring-2 ring-slate-900" : "hover:scale-110 opacity-80 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: c.hex_code }}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                Sizes:
              </span>
              {product.sizes.slice(0, 3).map((s, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-700 border border-slate-200"
                >
                  {s}
                </span>
              ))}
              {product.sizes.length > 3 && (
                <span className="text-[10px] text-slate-400 font-medium">
                  +{product.sizes.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Controls Footer */}
        <div className="mt-auto pt-5 flex items-center justify-between gap-2.5">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all group-hover:shadow-lg"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Inquire via WhatsApp"
            aria-label={`Inquire about ${product.name} on WhatsApp`}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 hover:border-emerald-600 transition-all shadow-sm flex-shrink-0 hover:scale-105"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
