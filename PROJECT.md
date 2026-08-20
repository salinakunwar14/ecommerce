# 🛍️ Buy Me — Everyday Clothing Storefront

> A responsive, front-end-only e-commerce storefront built with **React 19, Vite 7, TypeScript, and Tailwind CSS** — no Next.js, no Node.js backend, no database. Everything runs client-side in the browser.

---

## 📖 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [File-by-File Breakdown](#file-by-file-breakdown)
- [Key Features](#key-features)
- [Design System](#design-system)
- [Payment Integration (eSewa)](#payment-integration-esewa)
- [State Management](#state-management)
- [Routing](#routing)
- [Getting Started](#getting-started)
- [Scripts](#scripts)

---

## 🎯 Project Overview

**Buy Me** is a front-end e-commerce replica of a clothing storefront. It showcases everyday clothing collections — cardigans, knits, tees, bottoms, and dresses — with a warm, editorial design inspired by brands like Buy Me (buyme.gt.tc).

The project is a **single-page application (SPA)** with client-side routing, a persistent shopping cart, and a fully integrated **eSewa** (Nepali digital wallet) payment flow using the **sandbox/test** environment. No real money is charged.

### What it does:
- Displays a curated catalog of **20 clothing products** across **4 collections**
- Supports **product browsing**, filtering by collection, and detailed product views
- Features a **slide-out cart drawer** with quantity management
- Implements a **complete checkout flow** with eSewa payment integration
- Provides a **contact form** with toast notifications
- Renders responsive layouts for **mobile, tablet, and desktop**

---

## 🧰 Tech Stack

| Category | Technology | Purpose |
|---|---|---|
| **Language** | TypeScript 5.6 | Type-safe JavaScript with strict type checking |
| **Framework** | React 19 | Component-based UI library |
| **Build Tool** | Vite 7 | Fast dev server and production bundler |
| **Styling** | Tailwind CSS 4 + Custom CSS | Utility-first styling with a warm editorial palette |
| **Routing** | Wouter | Lightweight, React-friendly client-side router |
| **Icons** | Lucide React | Beautiful, consistent SVG icon library |
| **Forms** | React Hook Form + Zod | Performant forms with schema validation |
| **Animations** | Framer Motion | Declarative animations and transitions |
| **Notifications** | Sonner | Elegant toast notifications |
| **UI Components** | Radix UI | Accessible, unstyled UI primitives (dialog, tooltip, etc.) |
| **Payment** | eSewa (Nepal) | Digital wallet integration (sandbox mode) |
| **Package Manager** | pnpm | Fast, disk-efficient package manager |
| **Crypto** | Web Crypto API | HMAC-SHA256 signature generation for eSewa |

---

## 📁 Project Structure

```
frontend/
├── client/
│   ├── index.html                    # Entry HTML (SPA shell)
│   ├── public/
│   │   └── assets/
│   │       └── source-images/        # Brand assets + all 20 product images
│   └── src/
│       ├── main.tsx                  # React DOM root & app mount
│       ├── App.tsx                   # Root component: providers, routing, layout
│       ├── index.css                 # Global styles (editorial design system)
│       │
│       ├── components/
│       │   ├── Header.tsx            # Site header, nav, cart drawer, mobile menu
│       │   ├── ErrorBoundary.tsx     # React error boundary with recovery UI
│       │   ├── ManusDialog.tsx       # Manus login dialog (platform integration)
│       │   └── ui/                   # 50+ Radix-based UI primitives (buttons, dialogs, etc.)
│       │
│       ├── pages/
│       │   ├── Home.tsx              # Landing page: hero, collections, products, footer
│       │   ├── Shop.tsx              # Product catalog with filters & quick-add
│       │   ├── ProductDetail.tsx     # Individual product page with size/color/qty selection
│       │   ├── Collections.tsx       # Collection overview with descriptions & counts
│       │   ├── Checkout.tsx          # Checkout form with eSewa payment button
│       │   ├── PaymentResult.tsx     # Post-payment success/failure result page
│       │   ├── About.tsx             # Brand story and values page
│       │   ├── Contact.tsx           # Contact form with toast confirmation
│       │   └── NotFound.tsx          # 404 page with back-to-home link
│       │
│       ├── contexts/
│       │   ├── CartContext.tsx        # Shopping cart state (add/remove/update/persist)
│       │   └── ThemeContext.tsx       # Light/dark theme management
│       │
│       ├── data/
│       │   └── products.ts           # Product catalog (25 items), collections, helper functions
│       │
│       ├── hooks/
│       │   ├── useComposition.ts     # IME composition handling for text inputs
│       │   ├── useMobile.tsx         # Responsive breakpoint hook (768px)
│       │   └── usePersistFn.ts       # Stable function reference hook (like useCallback)
│       │
│       └── lib/
│           ├── esewa.ts              # eSewa payment: signature generation, form submission, response decoding
│           └── utils.ts              # cn() utility for merging Tailwind classes
│
├── package.json                      # Dependencies and scripts
├── vite.config.ts                    # Vite config with plugins & aliases
├── tsconfig.json                     # TypeScript configuration
├── components.json                   # shadcn/ui component configuration
├── pnpm-lock.yaml                    # pnpm lockfile
├── README.md                         # Basic usage instructions
└── PROJECT.md                        # This comprehensive documentation
    └── PROJECT-DOCS.md               # Project documentation with local assets
```

---

## 📄 File-by-File Breakdown

### Entry Points

#### `client/index.html`
The HTML shell for the single-page application. Sets the viewport meta tag, theme color (`#f7f1e9` — warm cream), and page title. Loads `main.tsx` as a module script.

#### `client/src/main.tsx`
The React entry point. Mounts the `<App />` component into the `#root` div using `createRoot()` (React 19's concurrent renderer).

#### `client/src/App.tsx`
The **root component** that orchestrates the entire application:
- Wraps everything in an `<ErrorBoundary>` for crash recovery
- Provides `<ThemeProvider>` for light/dark theme support
- Provides `<CartProvider>` for shopping cart state
- Provides `<TooltipProvider>` for tooltip interactions
- Includes `<ScrollToTop>` — auto-scrolls to top on route changes
- Renders the `<Header>` on every page
- Defines all routes using Wouter's `<Switch>` and `<Route>`

**Routes:**
| Path | Component | Description |
|---|---|---|
| `/` | Home | Landing page |
| `/shop` | Shop | Product catalog |
| `/product/:id` | ProductDetail | Individual product |
| `/collections` | Collections | Collection overview |
| `/about` | About | Brand story |
| `/contact` | Contact | Contact form |
| `/checkout` | Checkout | Checkout & payment |
| `/payment-result` | PaymentResult | Payment outcome |
| `*` | NotFound | 404 page |

---

### Pages

#### `pages/Home.tsx`
The **landing page** — the most content-rich component. Contains:
- **Hero section** — full-width background image with headline ("Feel good in what you wear") and CTA button
- **Story section** — editorial layout describing the brand's approach
- **Editorial banner** — large lifestyle image with overlay text and outline CTA
- **Collections grid** — 4 collection cards linking to filtered shop views
- **Products grid** — all 20 products displayed in a 4-column grid
- **Why section** — 3-column value propositions on a dark cocoa background
- **Footer** — brand info, quick links, information links, and support contact

#### `pages/Shop.tsx`
The **product catalog** page:
- Reads `?collection=` query param from URL to filter products
- Displays products in a responsive grid with image, name, category, and price
- Each product card has **inline size and color selectors** via `<select>` dropdowns
- **Quick-add button** adds items directly to the cart without visiting the detail page
- Shows "Added!" feedback for 1.2 seconds after adding to cart

#### `pages/ProductDetail.tsx`
The **single product** page:
- Loads product by ID from URL params (`/product/:id`)
- Shows large product image, collection name, price, and description
- Interactive **pill-style selectors** for size and color (highlighted active state)
- **Quantity control** with +/- buttons
- "Add to bag" button with 2-second "Added!" feedback
- Back-to-shop link at the top

#### `pages/Collections.tsx`
The **collections overview** page:
- Displays all 4 collections in a 2-column grid
- Each card shows collection image, title, description, and product count
- Links to the shop page with collection filter applied

#### `pages/Checkout.tsx`
The **checkout** page — the most complex page:
- Shows order summary (all cart items with images, sizes, quantities, and prices)
- Collects customer info: full name (required), email (required), phone (optional)
- Calculates **13% Nepal tax** on the subtotal
- Displays a line-by-line summary (subtotal, tax, total)
- Green "Pay with eSewa" button initiates the payment flow
- Shows test credentials for sandbox testing
- Empty cart state with a link back to the shop

#### `pages/PaymentResult.tsx`
The **payment result** page — shown after eSewa redirect:
- Decodes the base64 `data` query parameter from eSewa's response
- Checks if `status === "COMPLETE"` to determine success
- On success: shows green checkmark, reference ID, transaction UUID, and amount paid
- On failure: shows red X with the payment status
- **Clears the cart** only after a confirmed successful payment

#### `pages/About.tsx`
Static content page describing:
- Brand story ("Buy Me brings together versatile clothing...")
- Approach (natural/semi-natural fibres: cotton, linen, viscose, merino)
- Sustainability commitment (small batches, lasting pieces)
- Three brand values in a horizontal row

#### `pages/Contact.tsx`
Contact page with:
- Contact info (email, business hours)
- Name/email/message form with required field validation
- On submit: shows success state and triggers a **Sonner toast notification**
- Does NOT actually send emails (no backend) — purely UI

#### `pages/NotFound.tsx`
A simple 404 page with a "Page not found" message and a "Back to home" button.

---

### Components

#### `components/Header.tsx`
The **most complex component** in the project. It manages three layers:

1. **Announcement bar** — rose-colored banner with marketing text
2. **Site header** — contains logo, desktop nav (5 links), cart trigger with badge count, and mobile hamburger menu
3. **Cart drawer** — slides in from the right, shows all cart items with:
   - Product image, name, size/color, price
   - Quantity +/- controls
   - Remove button
   - Subtotal and "Continue to checkout" button
4. **Mobile menu** — slides in from the left with nav links and cart link

Uses a semi-transparent **scrim** overlay when drawers are open.

#### `components/ErrorBoundary.tsx`
A React class component error boundary that catches render errors and displays:
- Warning icon
- Error message
- Full stack trace in a `<pre>` block
- "Reload Page" button

#### `components/ManusDialog.tsx`
A platform integration dialog for Manus login. Uses Radix UI's `<Dialog>` component with a styled card layout, logo placeholder, and "Login with Manus" button.

#### `components/ui/*` (50+ files)
A comprehensive library of **shadcn/ui-style** components built on Radix UI primitives. Includes:
- **Layout**: accordion, card, separator, aspect-ratio, scroll-area, resizable
- **Forms**: button, input, select, checkbox, radio-group, switch, slider, textarea, label, form, field, input-group, input-otp
- **Overlays**: dialog, alert-dialog, popover, tooltip, hover-card, drawer, sheet
- **Navigation**: tabs, menubar, navigation-menu, breadcrumb, pagination, sidebar
- **Data display**: table, badge, avatar, calendar, chart, skeleton, spinner
- **Feedback**: progress, alert, toast (sonner), toggle, toggle-group
- **Utility**: command (cmdk), collapsible, context-menu, dropdown-menu, kbd, empty, item, button-group

---

### Contexts (State Management)

#### `contexts/CartContext.tsx`
The **shopping cart** — the core state of the application:
- Uses React Context + `useState` + `useCallback`
- **Persists to `localStorage`** under the key `buyme-cart`
- Cart items are identified by a composite key: `productId-size-color`
- Provides: `items`, `totalItems`, `subtotal`, `addItem`, `removeItem`, `updateQuantity`, `clearCart`
- Handles edge cases: duplicate items increment quantity, quantity ≤ 0 removes the item

#### `contexts/ThemeContext.tsx`
Theme management with light/dark mode support:
- Toggles the `dark` class on `document.documentElement`
- Persists to `localStorage` when switchable
- Currently defaults to `"light"` and is **not switchable** (no toggle in UI)

---

### Data

#### `data/products.ts`
The **product catalog** — 25 products organized into 4 collections:

| Collection | Products | Price Range |
|---|---|---|
| **Soft Layers** | Soft Layer, Soft Cardigan, Brushed Overshirt, Cotton Crew Knit, Merino Zip Hoodie | NPR 44–62 |
| **Everyday Tees** | Everyday Tee, Classic Crew Tee, V-Neck Tee, Long Sleeve Tee, Pocket Tee | NPR 28–36 |
| **Relaxed Bottoms** | Relaxed Trouser, Linen Culottes, Straight Leg Jean, Drawstring Short, Wide Leg Pant | NPR 38–56 |
| **Effortless Dresses** | Effortless Dress, Wrap Dress, Shirt Dress, Midi Tiered Dress, Knit Tank Dress | NPR 54–68 |

Each product has: `id`, `name`, `price`, `category`, `collection`, `description`, `image` (local files in `public/assets/source-images/`), `sizes`, `colors`, `inStock`.

Exports helper functions: `getProduct()`, `getProductsByCollection()`, `getProductsByCategory()`.

---

### Hooks

#### `hooks/useComposition.ts`
Handles IME (Input Method Editor) composition events for text inputs — prevents keydown events from firing during CJK character composition (common in Chinese/Japanese/Korean input).

#### `hooks/useMobile.tsx`
Returns `true` when the viewport is below 768px. Uses `matchMedia` for efficient breakpoint detection with automatic cleanup.

#### `hooks/usePersistFn.ts`
A utility hook that returns a **stable function reference** (similar to `useCallback` but without dependency arrays). Uses `useRef` to always call the latest version of the function.

---

### Lib (Utilities)

#### `lib/esewa.ts`
The **eSewa payment integration** — handles the complete payment lifecycle:

1. **`generateSignature()`** — Creates an HMAC-SHA256 signature using the Web Crypto API (runs entirely in the browser, no server needed)
2. **`generateTransactionUuid()`** — Creates a unique ID in `YYYYMMDD-RANDOM` format
3. **`initiateEsewaPayment()`** — Builds a hidden HTML form with all payment fields and auto-submits it to eSewa's payment URL
4. **`decodeEsewaResponse()`** — Decodes the base64-encoded response from eSewa's redirect

**eSewa Sandbox Configuration:**
- Product Code: `EPAYTEST`
- Secret Key: `8gBm/:&EnhH.1/q`
- Pay URL: `https://rc-epay.esewa.com.np/api/epay/main/v2/form`
- Status URL: `https://rc.esewa.com.np/api/epay/transaction/status/`

#### `lib/utils.ts`
Single utility function `cn()` that merges Tailwind CSS classes using `clsx` and `tailwind-merge` — handles conflicting classes intelligently.

---

### Configuration Files

#### `vite.config.ts`
Vite configuration with:
- **React plugin** for JSX/TSX transformation
- **Tailwind CSS v4** plugin for utility-first styling
- **JSX Loc plugin** for development debugging
- **Manus Runtime plugin** for platform integration
- Custom plugins for debug log collection and storage proxy
- Path aliases: `@` → `client/src`, `@shared` → `shared`, `@assets` → `attached_assets`
- Dev server on port 5173 with host access enabled

#### `tsconfig.json`
TypeScript configuration for strict type checking with ESNext target and React JSX transform.

#### `components.json`
shadcn/ui configuration for generating and managing UI components.

---

## ✨ Key Features

### 1. Responsive Design
- **Desktop** (≥900px): 4-column product grids, horizontal collection cards, full navigation
- **Tablet** (600–900px): 2-column grids, hidden desktop nav, hamburger menu
- **Mobile** (<600px): Single column, compact headers, mobile slide-out menu

### 2. Persistent Shopping Cart
- Cart data saved to `localStorage` — survives page refreshes and browser restarts
- Items keyed by product ID + size + color combination
- Real-time total and subtotal calculations

### 3. eSewa Payment Flow
- Client-side HMAC-SHA256 signature generation (no backend required)
- Hidden form auto-submission to eSewa's payment gateway
- Base64 response decoding on the result page
- Cart clearing only on confirmed successful payment

### 4. Editorial Design Language
- Warm cream/ivory/cocoa/rose color palette
- Georgia serif headings with tight letter-spacing
- Restrained borders and soft shadows
- Large lifestyle imagery (local assets)
- Minimal, refined UI with purposeful white space

### 5. Error Handling
- Global error boundary catches render crashes
- Graceful 404 page for unknown routes
- Empty state handling for cart, checkout, and product not found

---

## 🎨 Design System

### Color Palette
| Token | Hex | Usage |
|---|---|---|
| `--cream` | `#f7f1e9` | Page background |
| `--ivory` | `#fffdf9` | Card/surface background |
| `--cocoa` | `#3d2924` | Primary text, buttons |
| `--muted` | `#6c5750` | Secondary text |
| `--rose` | `#b78378` | Accent color, CTAs |
| `--rose-dark` | `#97665d` | Hover states |
| `--line` | `#e6d9ce` | Borders |

### Typography
- **Headings**: Georgia, Times New Roman, serif — 400 weight, tight letter-spacing (-0.04em)
- **Body**: Arial, Helvetica, sans-serif — 400 weight, 1.6 line height
- **Scale**: `h1` clamp(52px, 7vw, 96px), `h2` clamp(36px, 4vw, 56px)

### Spacing
- Max content width: 1180px
- Section padding: 76px vertical
- Grid gaps: 18px (products), 28px (collections)
- Content frame: `min(calc(100% - 40px), 1180px)` centered

---

## 💳 Payment Integration (eSewa)

The project integrates **eSewa**, Nepal's leading digital wallet, using their **sandbox/test environment**. No real money is charged.

### Flow:
1. User fills checkout form (name, email, phone)
2. Clicks "Pay with eSewa" → `initiateEsewaPayment()` is called
3. A hidden HTML form is created with:
   - Amount, tax (13%), total
   - Unique transaction UUID
   - HMAC-SHA256 signature (generated via Web Crypto API)
   - Success/failure redirect URLs
4. Form auto-submits → browser navigates to eSewa's sandbox page
5. User enters test credentials on eSewa
6. eSewa redirects back to `/payment-result?data=<base64>`
7. `PaymentResult.tsx` decodes the response and shows success/failure

### Test Credentials:
- **ID**: `9711111111` or `9711111112`
- **Password**: `Nepal@123`
- **OTP**: `123456`

---

## 📦 State Management

The app uses **React Context** for global state (no Redux, Zustand, or other state libraries):

| Context | State | Persistence |
|---|---|---|
| `CartContext` | Cart items, quantities, totals | `localStorage` (key: `buyme-cart`) |
| `ThemeContext` | Light/dark theme | `localStorage` (key: `theme`) |

Local component state (`useState`) handles:
- Mobile menu open/close
- Cart drawer open/close
- Selected sizes/colors on product pages
- Form inputs (checkout, contact)
- Loading states
- "Added to cart" feedback

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ (recommended: 20+)
- **pnpm** (the project uses pnpm as its package manager)

### Installation
```bash
cd frontend
pnpm install
```

### Development
```bash
pnpm dev
```
Opens at `http://localhost:5173`

### Production Build
```bash
pnpm build
pnpm preview
```

### Type Checking
```bash
pnpm check
```

---

## 📜 Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start Vite dev server with hot reload (host mode) |
| `pnpm build` | Build production bundle to `dist/public/` |
| `pnpm start` | Preview production build |
| `pnpm check` | Run TypeScript type checking (no emit) |
| `pnpm format` | Format code with Prettier |

---

## 📝 Notes

- This is a **front-end only** project — no backend, database, or authentication
- Product images are served locally from `public/assets/source-images/`
- All prices are in **Nepalese Rupees (NPR)** with 13% VAT
- The contact form and email collection are UI-only (no actual email sending)
- The project includes **50+ shadcn/ui components** in `components/ui/` — most are not actively used but are available for extending the UI
- The eSewa integration is **sandbox only** — swap the `ESEWA` constants in `lib/esewa.ts` for production credentials

---

## 🤖 How It Was Built

This project was built using **Codebuff** — an AI coding assistant that helps with software engineering tasks including bug fixes, feature development, refactoring, and code explanation.

### What this project is NOT:
- ❌ **Not Next.js** — uses React + Vite + Wouter (client-side SPA)
- ❌ **Not Node.js** — no server, no API routes, no SSR
- ❌ **Not a full-stack app** — pure front-end, no database
- ❌ **No real backend** — product data is hardcoded, cart is localStorage, contact form is UI-only

---

*Built with ❤️ using React, TypeScript, Tailwind CSS, and Codebuff*
