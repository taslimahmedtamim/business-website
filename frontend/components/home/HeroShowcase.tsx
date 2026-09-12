"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SiteSettings, ProductListItem } from "@/types";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import {
  Factory,
  ChevronRight,
  MessageSquare,
  Building2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Layers,
  Check,
} from "lucide-react";

interface HeroShowcaseProps {
  settings: SiteSettings | null;
  featuredProducts?: ProductListItem[];
}

interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  colorName: string;
  hexCode: string;
  image: string;
  bgGradient: string;
  ambientGlow: string;
  tagline: string;
  fabric: string;
  moq: string;
  sizes: string[];
}

const AMBIENT_THEMES = [
  {
    bgGradient: "from-[#291503] via-[#140a01] to-[#080400]",
    ambientGlow: "rgba(217, 119, 6, 0.38)",
    hexCode: "#D97706",
  },
  {
    bgGradient: "from-[#071f33] via-[#040e18] to-[#01060a]",
    ambientGlow: "rgba(56, 189, 248, 0.36)",
    hexCode: "#38BDF8",
  },
  {
    bgGradient: "from-[#082417] via-[#04120b] to-[#010604]",
    ambientGlow: "rgba(16, 185, 129, 0.34)",
    hexCode: "#10B981",
  },
  {
    bgGradient: "from-[#2b0d12] via-[#140608] to-[#080203]",
    ambientGlow: "rgba(244, 63, 94, 0.35)",
    hexCode: "#F43F5E",
  },
];

const DEFAULT_VARIANTS: ProductVariant[] = [
  {
    id: "amber",
    name: "Combed Cotton Ribbed Romper",
    sku: "NR-BW-101",
    colorName: "Honey Amber",
    hexCode: "#D97706",
    image: "/products/hero-romper-amber.jpg",
    bgGradient: "from-[#291503] via-[#140a01] to-[#080400]",
    ambientGlow: "rgba(217, 119, 6, 0.38)",
    tagline: "Natural warmth, knitted for gentle baby comfort",
    fabric: "100% Combed Cotton • 220 GSM",
    moq: "50 Pcs / Color",
    sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
  },
  {
    id: "sky",
    name: "Infant Full-Sleeve Ribbed Romper",
    sku: "NR-BW-102",
    colorName: "Pastel Sky",
    hexCode: "#38BDF8",
    image: "/products/hero-romper-sky.jpg",
    bgGradient: "from-[#071f33] via-[#040e18] to-[#01060a]",
    ambientGlow: "rgba(56, 189, 248, 0.36)",
    tagline: "Breathable airy weave, anti-chafing flatlock seams",
    fabric: "Ultra-Soft Cotton Interlock • 200 GSM",
    moq: "50 Pcs / Color",
    sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
  },
  {
    id: "sage",
    name: "Sleeveless Ribbed Summer Romper",
    sku: "NR-BW-103",
    colorName: "Mint Sage",
    hexCode: "#10B981",
    image: "/products/hero-romper-sage.jpg",
    bgGradient: "from-[#082417] via-[#04120b] to-[#010604]",
    ambientGlow: "rgba(16, 185, 129, 0.34)",
    tagline: "Lightweight summer knit, irritation-free neckline",
    fabric: "Pure Organic Cotton Rib • 190 GSM",
    moq: "50 Pcs / Color",
    sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
  },
  {
    id: "blush",
    name: "Short-Sleeve Everyday Romper",
    sku: "NR-BW-104",
    colorName: "Blush Coral",
    hexCode: "#F43F5E",
    image: "/products/hero-romper-blush.jpg",
    bgGradient: "from-[#2b0d12] via-[#140608] to-[#080203]",
    ambientGlow: "rgba(244, 63, 94, 0.35)",
    tagline: "Skin-safe certified dyes, durable nickel-free snaps",
    fabric: "Double Jersey Cotton • 210 GSM",
    moq: "50 Pcs / Color",
    sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
  },
];

export function HeroShowcase({ settings, featuredProducts = [] }: HeroShowcaseProps) {
  // Dynamically map products managed in the Django Admin into interactive showcase slides
  const variants: ProductVariant[] = React.useMemo(() => {
    if (featuredProducts && featuredProducts.length > 0) {
      return featuredProducts.map((prod, idx) => {
        const theme = AMBIENT_THEMES[idx % AMBIENT_THEMES.length];
        const primaryColor = prod.colors?.[0];
        const fallbackImg = DEFAULT_VARIANTS[idx % DEFAULT_VARIANTS.length].image;

        return {
          id: prod.id,
          name: prod.name,
          sku: prod.product_code,
          colorName: primaryColor?.name || "Natural",
          hexCode: primaryColor?.hex_code || theme.hexCode,
          image: prod.primary_image || fallbackImg,
          bgGradient: theme.bgGradient,
          ambientGlow: theme.ambientGlow,
          tagline: prod.short_description || "In-house manufactured comfort and gentle wear",
          fabric: prod.material || "100% Combed Cotton • In-House Knit",
          moq: "50 Pcs / Color",
          sizes: prod.sizes && prod.sizes.length > 0 ? prod.sizes : ["0-3M", "3-6M", "6-12M", "12-18M"],
        };
      });
    }
    return DEFAULT_VARIANTS;
  }, [featuredProducts]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("3-6M");
  const [direction, setDirection] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Keep index within bounds if products change
  const safeIndex = currentIndex % variants.length;
  const active = variants[safeIndex];
  const nextIndex = (safeIndex + 1) % variants.length;
  const nextVariant = variants[nextIndex];

  // Update selected size if current size isn't available on active product
  useEffect(() => {
    if (active.sizes && active.sizes.length > 0 && !active.sizes.includes(selectedSize)) {
      setSelectedSize(active.sizes[0]);
    }
  }, [active, selectedSize]);

  const whatsappPhone = settings?.whatsapp_number || "+880 1XXX-XXXXXX";
  const whatsappUrl = buildWhatsAppInquiryUrl({
    phone: whatsappPhone,
    productName: `${active.name} (${active.colorName})`,
    productCode: active.sku,
    customMessage: `Hello New Rahad Hosiery & Garments, I am inquiring about your manufactured "${active.name}" in ${active.colorName} (SKU: ${active.sku}, Size: ${selectedSize}). Please provide wholesale pricing and sample details.`,
  });

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? variants.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % variants.length);
  };

  const handleSelectVariant = (idx: number) => {
    setDirection(idx > safeIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Automatic slide rotation every 4.5 seconds (pauses on user interaction/hover)
  useEffect(() => {
    if (!isAutoPlaying || variants.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % variants.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, variants.length]);

  // Keyboard arrow listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [safeIndex, variants.length]);

  return (
    <section
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={() => setIsAutoPlaying(false)}
      onTouchEnd={() => setIsAutoPlaying(true)}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden transition-colors duration-1000 select-none"
    >
      {/* 1. Dynamic Ambient Background Gradient */}
      <motion.div
        key={active.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className={`absolute inset-0 bg-gradient-to-br ${active.bgGradient} pointer-events-none`}
      />

      {/* Subtle Dynamic Ambient Lighting Glow Sphere */}
      <motion.div
        animate={{
          background: `radial-gradient(circle at 50% 48%, ${active.ambientGlow} 0%, transparent 68%)`,
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Fine Background Grid Texture */}
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center min-h-[640px]">
          {/* =========================================================================
              LEFT COLUMN: Brand Narrative & Wholesale CTA
             ========================================================================= */}
          <div className="lg:col-span-4 flex flex-col items-start text-left z-20">
            {/* Manufacturing Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm"
            >
              <Factory className="w-3.5 h-3.5 text-amber-400" />
              <span>In-House Knitting & Assembly</span>
            </motion.div>

            {/* Headline with Staggered Fade */}
            <motion.h1
              key={`title-${active.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08] mb-5"
            >
              Stand out <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                In Pure Comfort.
              </span>
            </motion.h1>

            {/* Supporting Proposition */}
            <motion.p
              key={`desc-${active.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-md mb-8"
            >
              Manufactured on high-precision circular knitting looms. Skin-safe combed cotton, double-stitched flatlock seams, and non-toxic dyes tailored for sensitive infant wear.
            </motion.p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-slate-950 hover:bg-slate-100 text-xs sm:text-sm font-bold shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Explore Catalogue</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/20 transition-all duration-300 hover:border-white/40"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>

            {/* Authenticity Stamp */}
            <div className="flex items-center gap-5 text-xs text-slate-400 pt-6 border-t border-white/10 w-full">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Skin Safe</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-400" />
                <span>In-House Looms</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              CENTER COLUMN: 3D Floating Garment Levitation & Shadows
             ========================================================================= */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center my-4 lg:my-0">
            {/* Floating Garment Stage */}
            <div className="relative w-full max-w-[380px] sm:max-w-[440px] aspect-square flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active.id}
                  custom={direction}
                  initial={{ opacity: 0, scale: 0.85, x: direction * 80 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.85, x: -direction * 80 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {/* Floating Physics Wrapper */}
                  <motion.div
                    animate={{ y: [0, -18, 0] }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ width: "360px", height: "360px", maxWidth: "85vw" }}
                    className="relative w-[300px] sm:w-[360px] h-[300px] sm:h-[360px] rounded-3xl overflow-hidden shadow-2xl border border-white/15"
                  >
                    <Image
                      src={active.image}
                      alt={active.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 300px, 360px"
                      className="object-cover object-center"
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Dynamic Breathing Ground Drop Shadow */}
              <motion.div
                animate={{
                  scale: [1, 0.78, 1],
                  opacity: [0.35, 0.15, 0.35],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-2 w-64 h-8 rounded-[100%] bg-black/60 blur-xl pointer-events-none"
              />
            </div>

            {/* Poetic Tagline Under Garment (Direct Match to Video) */}
            <motion.div
              key={`tagline-${active.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-center max-w-xs"
            >
              <p className="text-xs sm:text-sm text-slate-300/90 font-medium italic">
                &ldquo;{active.tagline}&rdquo;
              </p>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mt-1 block">
                {active.fabric}
              </span>
            </motion.div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Sizing Chips, Color Swatches & Next Teaser
             ========================================================================= */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end text-left lg:text-right z-20">
            {/* Wholesale Price / MOQ Pill */}
            <div className="mb-8">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1 font-semibold">
                Factory Direct Supply
              </span>
              <div className="flex items-baseline lg:justify-end gap-2">
                <span className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                  Wholesale
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  ({active.moq})
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                SKU: {active.sku}
              </span>
            </div>

            {/* Size Selector Chips */}
            <div className="mb-8 w-full flex flex-col items-start lg:items-end">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 block">
                Choose Baby Size:
              </span>
              <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                {active.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  // Compact label for sleek display (e.g., '0-3 Months' -> '0-3M')
                  const label = size.replace(/\s*Months?/i, "M").replace(/\s*Years?/i, "Y");
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      title={size}
                      className={`min-w-[42px] h-10 px-3 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center justify-center ${
                        isSelected
                          ? "bg-white text-slate-950 shadow-xl scale-105"
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Swatch Selector with Active Glow */}
            <div className="mb-10 w-full flex flex-col items-start lg:items-end">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 block">
                Color ({active.colorName}):
              </span>
              <div className="flex items-center gap-2.5">
                {variants.map((v, idx) => {
                  const isSelected = safeIndex === idx;
                  return (
                    <button
                      key={v.id}
                      onClick={() => handleSelectVariant(idx)}
                      title={`${v.name} (${v.colorName})`}
                      className={`relative w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center ${
                        isSelected
                          ? "ring-4 ring-white/40 scale-125 shadow-lg"
                          : "opacity-60 hover:opacity-100 hover:scale-110"
                      }`}
                      style={{ backgroundColor: v.hexCode }}
                      aria-label={`Select ${v.colorName}`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Product Floating Teaser Thumbnail (Direct Match to Video) */}
            <div
              onClick={handleNext}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleNext();
                }
              }}
              className="group relative flex items-center gap-3 p-2.5 pr-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/15 cursor-pointer transition-all duration-300 hover:scale-105 shadow-xl"
              aria-label={`Next variant: ${nextVariant.name} in ${nextVariant.colorName}`}
            >
              <div
                style={{ width: "48px", height: "48px" }}
                className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0 border border-white/20"
              >
                <Image
                  src={nextVariant.image}
                  alt={nextVariant.name}
                  fill
                  sizes="48px"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white/50 block">
                  Next Variant
                </span>
                <span className="text-xs font-bold text-white block line-clamp-1">
                  {nextVariant.colorName}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 transition-transform ml-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
