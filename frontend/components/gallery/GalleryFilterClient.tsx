"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GalleryItem } from "@/types";
import { X, ZoomIn, Camera, Layers, Tag } from "lucide-react";

interface GalleryFilterClientProps {
  initialItems: GalleryItem[];
}

export function GalleryFilterClient({ initialItems }: GalleryFilterClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const categories = [
    { key: "all", label: "All Photos" },
    { key: "factory", label: "Factory & Facility" },
    { key: "production", label: "Production Activities" },
    { key: "machinery", label: "Machinery & Equipment" },
    { key: "products", label: "Product Showcase" },
    { key: "showroom", label: "Showroom" },
    { key: "packaging", label: "Packaging & Finishing" },
  ];

  const filteredItems = selectedCategory === "all"
    ? initialItems
    : initialItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="flex flex-col w-full">
      {/* Category Tab Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              aria-label={`View photo: ${item.title}`}
              onClick={() => setActiveItem(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveItem(item);
                }
              }}
              className="group relative rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200/80 text-slate-400 p-6 text-center">
                    <Camera className="w-10 h-10 text-slate-300 mb-2" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">Photo placeholder</span>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-md shadow">
                    {item.category_display || item.category}
                  </span>
                </div>

                {/* Hover Overlay with Zoom Icon */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Caption Area */}
              <div className="p-4">
                <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-sky-700 transition-colors">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center bg-white rounded-3xl border border-slate-200">
          <Camera className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">
            No gallery items in this category
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try choosing another category tab or check back after new facility photos are uploaded.
          </p>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {activeItem && (
        <div
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full rounded-3xl bg-slate-900 border border-slate-800 text-white overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white flex items-center justify-center transition-colors shadow"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Stage */}
            <div className="relative aspect-[16/10] w-full bg-slate-950 flex items-center justify-center">
              {activeItem.image ? (
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-500 p-8 text-center">
                  <Camera className="w-16 h-16 text-slate-600 mb-3" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                    {activeItem.title}
                  </span>
                  <span className="text-xs text-slate-500 mt-1">Photo demonstration placeholder</span>
                </div>
              )}
            </div>

            {/* Modal Details Footer */}
            <div className="p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-400 block mb-1">
                  {activeItem.category_display || activeItem.category}
                </span>
                <h3 className="font-heading font-bold text-xl text-white">
                  {activeItem.title}
                </h3>
                {activeItem.caption && (
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {activeItem.caption}
                  </p>
                )}
              </div>

              <button
                onClick={() => setActiveItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors self-start sm:self-auto"
              >
                Close Preview (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
