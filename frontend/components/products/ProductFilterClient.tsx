"use client";

import React, { useState, useTransition, useMemo } from "react";
import { Category, ProductListItem } from "@/types";
import { ProductCard } from "./ProductCard";
import { Search, X, Filter, Sparkles, Tag, PackageSearch, RotateCcw } from "lucide-react";

interface ProductFilterClientProps {
  initialProducts: ProductListItem[];
  categories: Category[];
  whatsappPhone?: string;
  initialCategorySlug?: string;
}

export function ProductFilterClient({
  initialProducts,
  categories,
  whatsappPhone = "+880 1XXX-XXXXXX",
  initialCategorySlug = "all",
}: ProductFilterClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategorySlug);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [onlyFeatured, setOnlyFeatured] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  // Client-side instant filter and search
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Category check
      if (selectedCategory !== "all" && product.category?.slug !== selectedCategory) {
        return false;
      }

      // Featured check
      if (onlyFeatured && !product.is_featured) {
        return false;
      }

      // Search query check (matches name, SKU, material, or category)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCode = product.product_code.toLowerCase().includes(q);
        const matchesMaterial = product.material?.toLowerCase().includes(q) || false;
        const matchesCat = product.category?.name.toLowerCase().includes(q) || false;

        if (!matchesName && !matchesCode && !matchesMaterial && !matchesCat) {
          return false;
        }
      }

      return true;
    });
  }, [initialProducts, selectedCategory, onlyFeatured, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setOnlyFeatured(false);
  };

  const hasActiveFilters = selectedCategory !== "all" || searchQuery !== "" || onlyFeatured;

  return (
    <div className="flex flex-col w-full">
      {/* Control Bar: Search & Filter Pills */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name, SKU (e.g. NR-BW-101), or fabric..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Toggles: Featured Filter & Reset */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setOnlyFeatured(!onlyFeatured)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                onlyFeatured
                  ? "bg-amber-50 text-amber-800 border-amber-300 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${onlyFeatured ? "text-amber-500" : "text-slate-400"}`} />
              <span>Featured Only</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-5 pt-5 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
            }`}
          >
            <span>All Products</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === "all" ? "bg-slate-700 text-slate-200" : "bg-slate-200 text-slate-600"}`}>
              {initialProducts.length}
            </span>
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-sky-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                }`}
              >
                <Tag className="w-3 h-3 opacity-70" />
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-sky-700 text-sky-100" : "bg-slate-200 text-slate-600"}`}>
                  {cat.products_count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <p className="text-xs sm:text-sm text-slate-500">
          Showing <strong className="text-slate-900 font-semibold">{filteredProducts.length}</strong> manufactured {filteredProducts.length === 1 ? 'garment' : 'garments'}
          {selectedCategory !== 'all' && (
            <span> in <span className="text-sky-700 font-medium">"{categories.find(c => c.slug === selectedCategory)?.name}"</span></span>
          )}
        </p>
      </div>

      {/* Product Cards Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              whatsappPhone={whatsappPhone}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 sm:p-16 rounded-3xl bg-white border border-slate-200 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
            <PackageSearch className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="font-heading font-bold text-xl text-slate-900 mb-1">
            No products match your criteria
          </h3>
          <p className="text-sm text-slate-500 max-w-md mb-6 leading-relaxed">
            We could not find any products matching your search query or selected category. Try searching for another term or clearing the active filters.
          </p>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
