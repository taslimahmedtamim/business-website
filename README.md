# New Rahad Hosiery & Garments

> **Manufacturer-First Digital Showcase & Product Catalogue**  
> Genuine manufacturer of premium hosiery and baby wear products.

---

## 1. Project Overview

**New Rahad Hosiery & Garments** manufactures its own high-quality hosiery and baby wear garments. This website serves as the primary digital gateway for retail buyers, wholesalers, distributors, and business partners to explore factory capabilities, observe end-to-end production standards, browse dynamic product collections, and place direct business inquiries.

---

## 2. Technology Stack

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Python 3.10+, Django 5.x, Django REST Framework (DRF)
- **Database**: PostgreSQL (Production & Staging) / SQLite (Local quick-start)
- **Media Engine**: Local disk storage (development) / Cloudinary or AWS S3 (production)
- **Communication**: REST APIs with CORS protection

---

## 3. Repository Structure

```text
new-rahad-website/
├── backend/                  # Django & DRF application
│   ├── config/               # Django root settings, urls, wsgi
│   ├── core/                 # Shared utilities, storage, and models
│   ├── products/             # Products, Categories, Colors, Sizes
│   ├── factory/              # Factory steps, Machinery, Facility content
│   ├── inquiries/            # Contact inquiries & WhatsApp tracking
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/                 # Next.js App Router application
│   ├── app/                  # Next.js pages, layouts, routes
│   ├── components/           # UI components (Header, Footer, Cards)
│   ├── lib/                  # API client, WhatsApp helper, utilities
│   ├── types/                # TypeScript interfaces
│   ├── package.json
│   └── .env.example
├── .gitignore                # Git exclusions (credentials, media, node_modules)
└── README.md                 # Project documentation
```

---

## 4. Development Roadmap

- [x] **Phase 1**: Architecture & Master Specification
- [x] **Phase 2**: Project Initialization & Environment Templates
- [x] **Phase 3**: Django Backend Setup, DRF, CORS, Storage Engine
- [x] **Phase 4**: Database Models, Migrations & Demo Seed Data
- [x] **Phase 5**: DRF Serializers, ViewSets, Filters & Search APIs
- [x] **Phase 6**: Custom Django Admin Management Suite
- [x] **Phase 7**: Next.js App Router & Tailwind CSS Foundation
- [x] **Phase 8**: Design System, Typography & Global Layouts
- [x] **Phase 9**: Homepage (Manufacturing-First Storytelling)
- [x] **Phase 10**: Product Catalogue Page
- [x] **Phase 11**: Dynamic Product Details Page & WhatsApp Inquiry
- [x] **Phase 12**: Factory & Manufacturing Workflow Showcase
- [x] **Phase 13**: Showroom & Photo Gallery with Lightbox
- [x] **Phase 14**: Contact Page with Google Maps & Inquiry Form
- [x] **Phase 15**: Dynamic SEO, OpenGraph Metadata & Sitemap
- [x] **Phase 16**: Performance Optimization & Accessibility Audit
- [x] **Phase 17**: Modern Video-Style Showcase, Demo Media, CMS Sync & Bug Fixes
- [ ] **Phase 18**: Free/Low-Cost Cloud Deployment (Vercel + Render + Neon)
- [ ] **Phase 19**: Hostinger Production Deployment & Packaging
