export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  display_order: number;
  products_count: number;
}

export interface ProductColor {
  id: string;
  name: string;
  hex_code: string;
  image: string | null;
}

export interface ProductSize {
  id: string;
  size_name: string;
  display_order: number;
}

export interface ProductImage {
  id: string;
  image: string;
  alt_text: string;
  is_primary: boolean;
  display_order: number;
}

export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  product_code: string;
  material: string;
  short_description: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  colors: ProductColor[];
  sizes: string[];
  primary_image: string | null;
  is_featured: boolean;
  created_at: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  product_code: string;
  material: string;
  short_description: string;
  description: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  colors: ProductColor[];
  sizes: ProductSize[];
  images: ProductImage[];
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  related_products: ProductListItem[];
}

export interface FactoryProcessStep {
  id: string;
  step_number: number;
  title: string;
  description: string;
  image: string | null;
  is_active: boolean;
}

export interface FactorySection {
  id: string;
  section_key: string;
  title: string;
  subtitle: string;
  content: string;
  image: string | null;
  display_order: number;
}

export interface Showroom {
  id: string;
  title: string;
  description: string;
  address_override: string;
  image: string | null;
  display_order: number;
}

export interface GalleryItem {
  id: string;
  category: 'factory' | 'production' | 'machinery' | 'products' | 'showroom' | 'packaging';
  category_display: string;
  title: string;
  caption: string;
  image: string;
  display_order: number;
  created_at: string;
}

export interface SiteSettings {
  company_name: string;
  tagline: string;
  logo: string | null;
  favicon: string | null;
  phone_primary: string;
  phone_secondary: string;
  whatsapp_number: string;
  email_primary: string;
  email_inquiry: string;
  physical_address: string;
  google_maps_embed_url: string;
  google_maps_page_url: string;
  facebook_url: string;
  meta_title_default: string;
  meta_description_default: string;
}

export interface ContactInquiryPayload {
  full_name: string;
  phone: string;
  email?: string;
  subject: string;
  inquiry_type: 'general' | 'wholesale' | 'manufacturing' | 'product';
  product_of_interest?: string;
  message: string;
  website_hp?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
