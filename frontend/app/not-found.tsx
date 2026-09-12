import React from "react";
import Link from "next/link";
import { Factory, Home, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 px-4 pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-6 shadow-sm border border-sky-200">
          <Factory className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-700 block mb-2">
          Error 404
        </span>

        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-3">
          Page Not Found
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed mb-8">
          The page or product category you are looking for does not exist, has been moved, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold transition-all"
          >
            <Search className="w-4 h-4 text-sky-600" />
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
