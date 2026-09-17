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

## 4. Getting Started & How to Run the Project

### Prerequisites
- **Node.js**: v18.17+ or v20+
- **Python**: 3.10+
- **Git**

---

### Step 1: Backend Setup (Django & DRF)

Open a terminal and navigate to the `backend/` directory:

```bash
cd backend
```

#### 1. Create and activate a virtual environment

- **Windows (PowerShell):**
  ```powershell
  python -m venv venv
  venv\Scripts\Activate.ps1
  ```
  *(If script execution is restricted on Windows PowerShell, run: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` first, or use Command Prompt: `venv\Scripts\activate.bat`)*

- **macOS / Linux:**
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```

#### 2. Install dependencies
```bash
pip install -r requirements.txt
```

#### 3. Environment configuration
Copy the sample environment file:
- **Windows (PowerShell):**
  ```powershell
  Copy-Item .env.example .env
  ```
- **macOS / Linux:**
  ```bash
  cp .env.example .env
  ```

#### 4. Run database migrations
```bash
python manage.py migrate
```

#### 5. Seed initial demo data & create superuser (Optional but Recommended)
```bash
# Seed demo categories, products, factory data & settings
python manage.py seed_demo_data

# Create dev admin user (admin / admin123)
python manage.py create_dev_admin
```

#### 6. Start Django backend development server
```bash
python manage.py runserver 8000
```
- **API Base URL:** `http://127.0.0.1:8000/api/v1/`
- **Django Admin Panel:** `http://127.0.0.1:8000/admin/`

---

### Step 2: Frontend Setup (Next.js 14)

Open a **new separate terminal** and navigate to the `frontend/` directory:

```bash
cd frontend
```

#### 1. Install dependencies
```bash
npm install
```

#### 2. Environment configuration (Optional)
Copy the environment template:
- **Windows (PowerShell):**
  ```powershell
  Copy-Item .env.example .env.local
  ```
- **macOS / Linux:**
  ```bash
  cp .env.example .env.local
  ```
*(Default points to `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1`)*

#### 3. Start Next.js development server
```bash
npm run dev
```

Open your browser at:
**[http://localhost:3000](http://localhost:3000)**

---

### Running from Project Root (Convenience Scripts)

From the project root directory, you can also run:
```bash
# Install frontend dependencies from root
npm --prefix frontend install

# Run frontend dev server
npm run dev

# Build frontend for production
npm run build
```

---

### Vercel Deployment Guide (Frontend)

When deploying this project to [Vercel](https://vercel.com):

1. **Import** the repository `taslimahmedtamim/business-website`.
2. Under **Root Directory**, click **Edit** and set it to:
   ```text
   frontend
   ```
3. Vercel will automatically detect **Next.js** as the framework preset.
4. *(Optional)* Add the environment variable:
   - `NEXT_PUBLIC_API_URL`: Your live Django backend URL (e.g. `https://api.yourdomain.com/api/v1`)
5. Click **Deploy**.

---

