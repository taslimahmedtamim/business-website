"use client";

import React, { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";

interface FloatingWhatsAppProps {
  phone: string;
}

export function FloatingWhatsApp({ phone }: FloatingWhatsAppProps) {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappUrl = buildWhatsAppInquiryUrl({ phone });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Interactive Tooltip Card */}
      {isOpen && (
        <div
          role="region"
          aria-label="Direct WhatsApp Support"
          className="mb-3 w-72 rounded-2xl bg-white p-4 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Direct WhatsApp Support
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close message"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 mb-3 leading-relaxed">
            Need pricing, sample requests, or wholesale manufacturing details? Chat directly with our sales team.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            Start Chat on WhatsApp
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        aria-label="Toggle WhatsApp Inquiry Assistant"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        {/* Radar ping ring */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
        </span>

        {isOpen ? (
          <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
        ) : (
          <MessageSquare className="w-6 h-6 transition-transform group-hover:scale-110" />
        )}
      </button>
    </div>
  );
}
