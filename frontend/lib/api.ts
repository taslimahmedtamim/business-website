import {
  Category,
  ProductListItem,
  ProductDetail,
  FactoryProcessStep,
  FactorySection,
  Showroom,
  GalleryItem,
  SiteSettings,
  ContactInquiryPayload,
  PaginatedResponse,
} from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

/**
 * Generic typed fetcher with graceful fallbacks
 */
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Accept': 'application/json',
        ...(options?.headers || {}),
      },
      next: process.env.NODE_ENV === 'development' ? { revalidate: 0 } : { revalidate: 60 },
      cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'default',
    });

    if (!res.ok) {
      console.warn(`API request to ${endpoint} returned status ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return fetchApi<SiteSettings>('/settings/');
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchApi<Category[]>('/categories/');
  return data || [];
}

export async function getProducts(params?: {
  category?: string;
  featured?: boolean;
  search?: string;
  page?: number;
}): Promise<PaginatedResponse<ProductListItem>> {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.featured !== undefined) query.append('featured', String(params.featured));
  if (params?.search) query.append('search', params.search);
  if (params?.page) query.append('page', String(params.page));

  const endpoint = `/products/?${query.toString()}`;
  const data = await fetchApi<PaginatedResponse<ProductListItem>>(endpoint);
  return data || { count: 0, next: null, previous: null, results: [] };
}

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  return fetchApi<ProductDetail>(`/products/${slug}/`);
}

export async function getFactoryProcessSteps(): Promise<FactoryProcessStep[]> {
  const data = await fetchApi<FactoryProcessStep[]>('/factory/process-steps/');
  return data || [];
}

export async function getFactorySections(): Promise<FactorySection[]> {
  const data = await fetchApi<FactorySection[]>('/factory/sections/');
  return data || [];
}

export async function getShowroom(): Promise<Showroom[]> {
  const data = await fetchApi<Showroom[]>('/showroom/');
  return data || [];
}

export async function getGalleryItems(category?: string): Promise<GalleryItem[]> {
  const endpoint = category ? `/gallery/?category=${category}` : '/gallery/';
  const data = await fetchApi<GalleryItem[]>(endpoint);
  return data || [];
}

export async function submitContactInquiry(payload: ContactInquiryPayload) {
  try {
    const res = await fetch(`${API_BASE}/contact/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
  } catch (error) {
    return { ok: false, status: 500, error: 'Network error occurred while submitting inquiry.' };
  }
}
