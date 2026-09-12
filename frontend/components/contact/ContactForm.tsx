"use client";

import React, { useState } from "react";
import { submitContactInquiry } from "@/lib/api";
import { ContactInquiryPayload } from "@/types";
import { Send, CheckCircle2, AlertCircle, Building2, Tag, ShieldCheck } from "lucide-react";

interface ContactFormProps {
  initialProduct?: string;
  initialType?: string;
}

export function ContactForm({ initialProduct = "", initialType = "general" }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactInquiryPayload>({
    full_name: "",
    phone: "",
    email: "",
    subject: initialProduct ? `Inquiry regarding ${initialProduct}` : "",
    inquiry_type: (initialType as any) || "general",
    product_of_interest: initialProduct,
    message: "",
    website_hp: "", // Hidden anti-spam honeypot
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    // Submission to Django REST Framework POST /api/v1/contact/
    const res = await submitContactInquiry(formData);

    setIsLoading(false);

    if (res.ok) {
      setSubmitted(true);
    } else {
      setErrorMessage(
        res.error || "Unable to submit your inquiry at this moment. Please try again or reach us via WhatsApp."
      );
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 text-center shadow-sm animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2">
          Inquiry Successfully Received
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
          Thank you for reaching out to <strong>New Rahad Hosiery & Garments</strong>. Our manufacturing sales desk will review your requirements and respond promptly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              full_name: "",
              phone: "",
              email: "",
              subject: "",
              inquiry_type: "general",
              product_of_interest: "",
              message: "",
              website_hp: "",
            });
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow transition-all"
        >
          <span>Send Another Inquiry</span>
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col gap-6"
    >
      <div>
        <h3 className="font-heading font-bold text-2xl text-slate-900 mb-1">
          Send Us a Message
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">
          Direct communication with our manufacturing management and sales team.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-800">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Hidden Anti-Spam Honeypot Field */}
      <input
        type="text"
        name="website_hp"
        value={formData.website_hp}
        onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Name and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-full-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-full-name"
            type="text"
            required
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            placeholder="e.g., Haji Mohammad Traders"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Phone / WhatsApp Number <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+880 1XXX-XXXXXX"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
          />
        </div>
      </div>

      {/* Email and Inquiry Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Email Address <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="orders@yourbusiness.com"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
          />
        </div>

        <div>
          <label htmlFor="contact-inquiry-type" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Inquiry Category
          </label>
          <select
            id="contact-inquiry-type"
            value={formData.inquiry_type}
            onChange={(e) => setFormData({ ...formData, inquiry_type: e.target.value as any })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
          >
            <option value="general">General Business Inquiry</option>
            <option value="wholesale">Wholesale / Bulk Production Order</option>
            <option value="manufacturing">Contract / Custom Manufacturing</option>
            <option value="product">Specific Product Inquiry</option>
          </select>
        </div>
      </div>

      {/* Product of Interest */}
      <div>
        <label htmlFor="contact-product" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Product of Interest <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <input
          id="contact-product"
          type="text"
          value={formData.product_of_interest}
          onChange={(e) => setFormData({ ...formData, product_of_interest: e.target.value })}
          placeholder="e.g., Infant Full-Sleeve Combed Cotton Romper (NR-BW-101)"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Subject <span className="text-rose-500">*</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="e.g., Request for Bulk Wholesale Pricing (1,000 pcs)"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Message & Requirements <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Please describe your requested quantities, preferred fabric GSM, target delivery timelines, or sample request..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-500 text-white font-semibold text-sm shadow-md transition-all active:scale-[0.99]"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>Submitting Inquiry...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 text-sky-400" />
            <span>Submit Manufacturing Inquiry</span>
          </>
        )}
      </button>
    </form>
  );
}
