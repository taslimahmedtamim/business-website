"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductDetail, ProductColor, ProductSize, SiteSettings } from "@/types";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import {
  MessageSquare,
  ShieldCheck,
  Factory,
  Layers,
  Sparkles,
  Check,
  Shirt,
  Share2,
  Mail,
  Building2,
  ChevronRight,
  Info,
} from "lucide-react";

interface ProductDetailClientProps {
  product: ProductDetail;
  settings: SiteSettings | null;
}

export function ProductDetailClient({ product, settings }: ProductDetailClientProps) {
  // All images: combine color-specific images and product gallery images
  const allImages = React.useMemo(() => {
    const list: { url: string; alt: string; label?: string }[] = [];

    // Gallery images
    if (product.images && product.images.length > 0) {
      product.images.forEach((img) => {
        list.push({ url: img.image, alt: img.alt_text || product.name });
      });
    }

    // Add color images if distinct
    if (product.colors && product.colors.length > 0) {
      product.colors.forEach((c) => {
        if (c.image && !list.some((item) => item.url === c.image)) {
          list.push({ url: c.image, alt: `${product.name} - ${c.name}`, label: c.name });
        }
      });
    }

    return list;
  }, [product]);

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0].size_name : ""
  );
  const [showInquiryModal, setShowInquiryModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // When a user selects a color, if that color has a dedicated photo, switch to it
  const handleColorSelect = (color: ProductColor) => {
    setSelectedColor(color);
    if (color.image) {
      const idx = allImages.findIndex((item) => item.url === color.image);
      if (idx !== -1) {
        setActiveImageIndex(idx);
      }
    }
  };

  const whatsappPhone = settings?.whatsapp_number || "+880 1XXX-XXXXXX";
  
  // Custom WhatsApp message with selected color and size
  const customWhatsAppMsg = `Hello New Rahad Hosiery & Garments, I am interested in inquiring about your manufactured product: "${product.name}" (SKU: ${product.product_code})${selectedColor ? ` in Color: ${selectedColor.name}` : ''}${selectedSize ? ` and Size: ${selectedSize}` : ''}. Please provide bulk pricing, sample options, and minimum order details.`;

  const whatsappUrl = buildWhatsAppInquiryUrl({
    phone: whatsappPhone,
    customMessage: customWhatsAppMsg,
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const currentDisplayImage = allImages[activeImageIndex]?.url || null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      {/* Left Column: Image Gallery */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        {/* Main Display Stage */}
        <div className="relative aspect-[4/3] w-full rounded-3xl bg-slate-100 border border-slate-200 overflow-hidden shadow-sm">
          {currentDisplayImage ? (
            <Image
              src={currentDisplayImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center transition-all duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-gradient-to-br from-slate-100 to-slate-200/80">
              <Shirt className="w-16 h-16 text-slate-300 mb-3 stroke-[1.5]" />
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                In-House Manufactured Product
              </span>
              <span className="text-xs text-slate-400 mt-1">
                Visual demonstration placeholder
              </span>
            </div>
          )}

          {/* Direct Manufacturer Badge Stamp */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-md text-slate-900 shadow-md border border-slate-100">
              <Factory className="w-3.5 h-3.5 text-sky-600" />
              In-House Manufactured
            </span>
          </div>

          {/* SKU Code Pill */}
          <div className="absolute top-4 right-4 z-10">
            <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-950/80 text-white backdrop-blur-md shadow">
              SKU: {product.product_code}
            </span>
          </div>
        </div>

        {/* Thumbnail Selector (if multiple photos exist) */}
        {allImages.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                aria-label={`View photo ${idx + 1}`}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                  activeImageIndex === idx
                    ? "border-sky-600 ring-2 ring-sky-500/20 shadow-md scale-105"
                    : "border-slate-200 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="80px"
                  className="object-cover object-center"
                />
              </button>
            ))}
          </div>
        )}

        {/* Manufacturing Highlights Row */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Layers className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase">Circular Knit</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Gentle crosswise stretch</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase">Flatlock Seams</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Anti-chafing infant softness</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase">100% Inspected</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Verified snap durability</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Product Details & Inquiry Controls */}
      <div className="lg:col-span-5 flex flex-col items-start">
        {/* Category Tag */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
            {product.category?.name || "Garments"}
          </span>
          {product.is_featured && (
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              Featured Flagship
            </span>
          )}
        </div>

        {/* Product Title */}
        <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight leading-snug mb-3">
          {product.name}
        </h1>

        {/* Fabric / Material Highlight */}
        {product.material && (
          <div className="p-3 rounded-xl bg-slate-100/90 border border-slate-200 text-xs font-semibold text-slate-800 w-full mb-5 flex items-center gap-2">
            <span className="text-slate-500 font-normal">Fabric Composition:</span>
            <span>{product.material}</span>
          </div>
        )}

        {/* Short Summary */}
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {product.short_description || product.description}
        </p>

        {/* Color Selection (Enforcing Max 3) */}
        {product.colors && product.colors.length > 0 && (
          <div className="w-full mb-6 pb-6 border-b border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Available Colors ({product.colors.length}/3):
              </span>
              <span className="text-xs font-medium text-sky-700">
                {selectedColor?.name || "Select color"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {product.colors.slice(0, 3).map((color) => {
                const isSelected = selectedColor?.name === color.name;
                return (
                  <button
                    key={color.id || color.name}
                    onClick={() => handleColorSelect(color)}
                    className={`group flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                      isSelected
                        ? "border-sky-600 bg-sky-50 ring-2 ring-sky-500/20"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-slate-300 shadow-inner inline-block"
                      style={{ backgroundColor: color.hex_code }}
                    />
                    <span className="text-xs font-medium text-slate-700">
                      {color.name}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-sky-600 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="w-full mb-8 pb-6 border-b border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Available Sizes:
              </span>
              <span className="text-xs font-medium text-sky-700">
                {selectedSize || "Select size"}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size.size_name;
                return (
                  <button
                    key={size.id || size.size_name}
                    onClick={() => setSelectedSize(size.size_name)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {size.size_name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Direct Action Buttons: WhatsApp & Inquiry */}
        <div className="w-full flex flex-col gap-3 mb-8">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-lg shadow-emerald-900/20 transition-all hover:shadow-xl active:scale-[0.99]"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Inquire on WhatsApp (Pre-Filled)</span>
          </a>

          <Link
            href={`/contact?product=${encodeURIComponent(product.name)}&sku=${encodeURIComponent(product.product_code)}`}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow transition-all"
          >
            <Mail className="w-4 h-4 text-sky-400" />
            <span>Request Sample / Bulk Quotation</span>
          </Link>

          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-medium transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "Link Copied to Clipboard!" : "Share Product Link"}</span>
          </button>
        </div>

        {/* Full Specifications Accordion/Box */}
        <div className="w-full rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Info className="w-4 h-4 text-sky-600" />
            <span>Manufacturing Details & Specifications</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-start justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Product SKU:</span>
              <span className="font-mono font-semibold text-slate-800">{product.product_code}</span>
            </div>

            <div className="flex items-start justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Category:</span>
              <span className="font-semibold text-slate-800">{product.category?.name}</span>
            </div>

            {product.material && (
              <div className="flex items-start justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Fabric Composition:</span>
                <span className="font-semibold text-slate-800 text-right max-w-[60%]">{product.material}</span>
              </div>
            )}

            <div className="flex items-start justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Facility Origin:</span>
              <span className="font-semibold text-slate-800">In-House Factory (Bangladesh)</span>
            </div>

            <div className="flex items-start justify-between py-1">
              <span className="text-slate-500">Showroom Inspection:</span>
              <span className="font-semibold text-emerald-700">Available at Showroom</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 text-xs mb-1.5">Description</h4>
            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
