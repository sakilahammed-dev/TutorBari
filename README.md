# TutorBari.com — Next-Generation Tutor Matching Platform

> **Lead Architect & Visionary:** **Sakil Ahammed** (*Full-Stack AI & Automation Architect*)  
> **Chief Technical Strategist & Pair Programmer:** **কলিজা (Kolija)**  
> **Base Domain Reference:** [Caretutors.com](https://caretutors.com/) (Completely Reverse-Engineered, Modernized & Upgraded)  
> **Tech Stack:** Next.js 16.4.3 (Turbopack, App Router, Cache Components), React 19, TypeScript, Tailwind CSS v4, Prisma, JWT, BcryptJS, Lucide React

---

## Executive Overview

**TutorBari.com** is an enterprise-grade, full-stack digital tutoring marketplace engineered to connect verified tutors with students and guardians across all 64 districts in Bangladesh. Built from the ground up by reverse-engineering Caretutors.com's frontend architecture, design tokens, legal frameworks, and operational workflows, TutorBari improves upon the original with an **Explainable 5-Factor AI Matchmaking Engine**, **Instant Guest Posting Funnel**, **Escrow & bKash/Nagad Payment Gateway**, and **Comprehensive Admin Operations Backoffice**.

---

## Key Architectural Innovations

### 1. Multi-Factor AI Matchmaking Algorithm (`src/lib/matchmaking.ts`)
- **Proximity & Commute Mapping (30%):** Evaluates geographic coordinates and neighboring cluster maps (e.g., Dhanmondi ⇄ Mohammadpur, Lalmatia, Shankar).
- **Curriculum & Category Alignment (25%):** Prioritizes matching specialization in English Medium (Cambridge/Edexcel), English Version, Bangla Medium, Madrasah, or Admission Test.
- **Academic Background & Department (25%):** Matches subject requirements with tutor's university and department (e.g. BUET CSE/EEE, DMC MBBS, DU Physics/Math/IBA).
- **Guardian Gender Preference (10%):** Enforces strict preference for Male / Female tutors.
- **Parent Trust & Verification Rating (10%):** Weights completed tuitions, parent ratings (4.8+), and verified KYC badge status.
- **Explainable Insights:** Every recommendation displays actionable reasoning pills (e.g., *"Direct location match in Mohammadpur"*, *"Cambridge English Medium Specialist"*, *"Parent Trust Verified"*).
- **1-Click SMS Dispatch:** Direct simulation for SMS tuition alert dispatches to matched candidates.

### 2. High-Conversion Guest "Hire a Tutor" Wizard (`/hire-a-tutor`)
- 3-step intuitive wizard (Class & Curriculum $\rightarrow$ Student Requirements $\rightarrow$ Location, Budget & Contact).
- **Frictionless Auto-Registration:** Guardians can post without prior sign-in. The system creates an account and sets an HTTP-only JWT auth cookie automatically upon submission.

### 3. Legal Confirmation Letter & Automated Invoicing (`/job/confirmation-letter/[id]`)
- **Caretutors Commission Structure:**
  - **Regular Tutoring:** **55%** platform charge on the 1st month tuition salary (e.g., ৳4,400 on ৳8,000 salary).
  - **Package Tutoring:** **35%** platform charge.
  - **Payment Window:** Due within 7 calendar days from confirmation letter generation.
  - **Guardian Guarantee:** 15-day free tutor replacement guarantee.
- **Simulated Payment Gateway (`/payment/[id]`):** Instant checkout via bKash (`#e2136e`), Nagad (`#f7941d`), Rocket, and Visa/Mastercard.
- **Official Tax Invoice (`/invoice/[id]`):** Auto-generated, itemized billing statement with 0% educational VAT exemption and "PAID IN FULL" verification seal.

### 4. Role-Based Access Control (RBAC) & Hardened Security
- **Strict Role Separation:** Guaranteed isolation between `GUARDIAN`, `TUTOR`, and `ADMIN`.
- **Duplicate Application Shield:** Prevents tutors from submitting multiple applications to the same tuition post.
- **Privacy Masking:** Guardian phone number remains masked from tutors until a Trial Demo Class is officially scheduled.
- **Security Headers (`next.config.ts`):** `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-XSS-Protection: 1; mode=block`.
- **Sliding-Window Rate Limiter & XSS Sanitizer (`src/lib/rateLimit.ts`):** Protects login, registration, and job application endpoints against brute-force and script injection attacks.

---

## Project Structure

```text
tutorbari/
├── prisma/
│   └── schema.prisma            # Full relational database schema (User, Profile, JobPost, Invoice, etc.)
├── public/
│   └── categories/              # Caretutors category visual icons
├── src/
│   ├── app/
│   │   ├── page.tsx             # Caretutors A to Z Homepage with counters & city filters
│   │   ├── layout.tsx           # Global Nunito font, viewport, OpenGraph & SEO tags
│   │   ├── globals.css          # Tailwind CSS v4 + Caretutors Design Tokens (#0675c1, #00a65a)
│   │   ├── sitemap.ts           # Dynamic XML sitemap generator
│   │   ├── robots.ts            # Dynamic robots.txt with disallow guards
│   │   ├── (auth)/
│   │   │   ├── signin/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   ├── signup/tutor/page.tsx
│   │   │   ├── signup/guardian/page.tsx
│   │   │   └── forget-password/
│   │   ├── job/
│   │   │   ├── list/page.tsx    # Live Faceted Job Board with search filters
│   │   │   ├── view/[id]/       # Google Jobs JSON-LD schema & 55% policy disclosure
│   │   │   └── confirmation-letter/[id]/ # Legal agreement & platform fee breakdown
│   │   ├── hire-a-tutor/        # 3-step wizard with guest auto-registration
│   │   ├── guardian/
│   │   │   ├── dashboard/       # Metric cards & job tracker
│   │   │   └── job/[id]/applicants/ # Applicant review, trial demo scheduling modal & appoint
│   │   ├── tutor/
│   │   │   ├── dashboard/       # Profile score, verification badge & applied jobs tracker
│   │   │   └── profile/info/    # 4-Tab manager (Bio, Education CRUD, Preferences, KYC)
│   │   ├── payment/[id]/        # bKash / Nagad / Card simulated checkout
│   │   ├── invoice/[id]/        # Official Tax Invoice with 0% VAT exemption & PDF print
│   │   ├── admin/
│   │   │   └── dashboard/       # Admin console (Queue, KYC center, Ledger, AI Match)
│   │   └── api/                 # 29 RESTful API routes with JWT cookie authentication
│   ├── components/
│   │   ├── layout/ (Navbar, Footer)
│   │   ├── ui/ (Button, Badge, modal primitives)
│   │   └── admin/ (AdminDashboardClient)
│   └── lib/
│       ├── auth.ts              # JWT signing, cookie management & bcryptjs hashing
│       ├── store.ts             # In-memory reactive state database engine
│       ├── matchmaking.ts       # 5-factor AI matchmaking algorithm
│       ├── rateLimit.ts         # Sliding-window rate limiter & XSS input sanitization
│       └── types.ts             # TypeScript domain schemas and enum contracts
├── run_production.sh            # 1-click production runner
└── README.md
```

---

## Demo & Test Credentials

All accounts come pre-seeded with encrypted passwords:

| Role | Mobile Identifier | Email | Password | Primary Console |
| :--- | :--- | :--- | :--- | :--- |
| **Super Admin** | `01700000001` | `admin@tutorbari.com` | `123456` | [http://localhost:3003/admin/dashboard](http://localhost:3003/admin/dashboard) |
| **Guardian** | `01711000001` | `guardian.karim@example.com` | `123456` | [http://localhost:3003/guardian/dashboard](http://localhost:3003/guardian/dashboard) |
| **Tutor (BUET)** | `01722000002` | `tanvir.buet@example.com` | `123456` | [http://localhost:3003/tutor/dashboard](http://localhost:3003/tutor/dashboard) |

---

## Running Locally

### Prerequisites
- Node.js $\ge$ 18.x
- npm $\ge$ 9.x

### Quick Start
```bash
# 1. Clone or navigate to the directory
cd tutorbari

# 2. Install dependencies
npm install

# 3. Run Development Server (Port 3003)
npm run dev -- -p 3003

# 4. Or Run Full Production Build & Start
./run_production.sh
```

---

## Comprehensive Automated Testing

To run the master 76-step end-to-end verification suite:
```bash
node scratch/master_atoz_verification.js
```

### Coverage:
- Public pages & dynamic routes HTTP 200 response
- Role-Based Access Control security enforcement (403 Forbidden checks)
- Full hiring lifecycle from Job Post $\rightarrow$ Application $\rightarrow$ Demo Class $\rightarrow$ Appointment
- Financial fee calculation (55% platform commission on 1st month salary)
- bKash transaction confirmation & Tax Invoice generation
- AI Matchmaking engine scoring accuracy and explainability
- Next.js 16 production compilation (71/71 routes, 0 errors)

---

## License & Attribution

Architected with precision by **Sakil Ahammed** & **কলিজা (Kolija)** for the educational empowerment and digital elevation of tutors and guardians across Bangladesh. All rights reserved © 2026 TutorBari.com.
