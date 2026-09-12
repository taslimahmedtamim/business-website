"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteSettings } from "@/types";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import {
  Factory,
  Menu,
  X,
  Phone,
  MessageSquare,
  Building2,
  ChevronRight,
} from "lucide-react";

interface NavbarProps {
  settings: SiteSettings | null;
}

export function Navbar({ settings }: NavbarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const phone = settings?.phone_primary || "+880 1XXX-XXXXXX";
  const whatsappNumber = settings?.whatsapp_number || "+880 1XXX-XXXXXX";
  const whatsappUrl = buildWhatsAppInquiryUrl({ phone: whatsappNumber });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Factory", href: "/factory" },
    { name: "Products", href: "/products" },
    { name: "Showroom", href: "/showroom" },
    { name: "Gallery", href: "/gallery" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300 pt-3 sm:pt-4 px-3 sm:px-6">
      {/* Centered Floating Glassmorphic Pill */}
      <div
        className={`pointer-events-auto max-w-6xl mx-auto rounded-full transition-all duration-300 flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 ${
          scrolled
            ? "bg-slate-950/85 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/40"
            : "bg-slate-950/60 backdrop-blur-xl border border-white/10 shadow-xl"
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
            <Factory className="w-4 h-4 text-amber-400 group-hover:text-slate-950 transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold font-heading text-sm sm:text-base tracking-tight text-white leading-none">
              New Rahad
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mt-0.5">
              Hosiery & Garments
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  active
                    ? "bg-white text-slate-950 shadow-md scale-105"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Quick Actions */}
        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 transition-all"
            aria-label="Direct WhatsApp Contact"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white hover:bg-slate-100 text-slate-950 shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Wholesale Desk</span>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden p-2 rounded-full text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileOpen}
          aria-controls="mobile-navigation"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Floating Glass Card */}
      {isMobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="pointer-events-auto lg:hidden mt-2 max-w-sm mx-auto rounded-3xl bg-slate-950/95 backdrop-blur-2xl border border-white/15 p-5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-semibold transition-colors ${
                    active
                      ? "bg-white text-slate-950"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${active ? "text-slate-950" : "text-slate-500"}`} />
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/contact"
              onClick={() => setIsMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold bg-white text-slate-950 shadow"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-600" />
              <span>Wholesale Inquiry</span>
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
