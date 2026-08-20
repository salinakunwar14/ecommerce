# Buy Me — Project Documentation

## What Is This Website?

**Buy Me** is a modern, responsive e-commerce storefront for an everyday clothing brand. It's a front-end replica of the homepage at **buyme.gt.tc**, built as a single-page React application with a warm, editorial design aesthetic. The site showcases clothing collections (Soft Layers, Everyday Tees, Relaxed Bottoms, Effortless Dresses) with a working shopping cart, product browsing, and eSewa payment integration (sandbox mode).

The brand's tagline: *"Everyday clothing, thoughtfully chosen."*

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **TypeScript 5.6** | Type safety |
| **Vite 7** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first CSS (via `@tailwindcss/vite`) |
| **shadcn/ui (New York style)** | Pre-built UI component library (53 components in `components/ui/`) |
| **wouter** | Lightweight client-side routing |
| **Radix UI** | Headless accessible primitives (behind shadcn components) |
| **Lucide React** | Icon library |
| **eSewa API** | Nepali digital payment gateway (sandbox/test mode) |
| **pnpm** | Package manager |

---

## Project Structure

```
buymee/
└── frontend/
    ├── package.json              # Dependencies and scripts
    ├── pnpm-lock.yaml            # Lockfile
    ├── tsconfig.json             # TypeScript configuration
    ├── tsconfig.node.json        # TypeScript config for Node/Vite
    ├── vite.config.ts            # Vite build config + custom plugins
    ├── components.json           # shadcn/ui configuration
    ├── README.md                 # Original project readme
    ├── dist/                     # Production build output
    ├── node_modules/             # Installed packages
    └── client/
        ├── index.html            # HTML entry point
        ├── public/
        │   └── assets/
        │       └── source-images/    # All static image assets
        │           ├── buyme-logo.png
        │           ├── hero.jpg
        │           ├── editorial-banner.jpg
        │           ├── soft-layers.jpg
        │           ├── everyday-tees.jpg
        │           ├── relaxed-bottoms.jpg
        │           ├── effortless-dresses.jpg
        │           ├── softlayer.jpg
        │           ├── cardigan.jpg
        │           ├── brushed over shirt.jpg
        │           ├── cotton crew knit.jpg
        │           ├── Merino Zip Hoodie.jpg
        │           ├── Essential Crew Tee.jpg
        │           ├── classic crew tee.jpg
        │           ├── v neck tee.jpg
        │           ├── long sleeve tee.jpg
        │           ├── pocket tee.jpg
        │           ├── relaxed trouser.jpg
        │           ├── linen culottes.jpg
        │           ├── straight leg jean.jpg
        │           ├── drawstring short.jpg
        │           ├── wide leg pant.jpg
        │           ├── drape midi slip.jpg
        │           ├── wrap dress.jpg
        │           ├── shirt dress.jpg
        │           ├── midi tiered dress.jpg
        │           └── knit tank dress.jpg
        └── src/
            ├── main.tsx              # App entry point (renders React root)
            ├── App.tsx               # Router setup, providers, layout
            ├── index.css             # All custom CSS (219 lines)
            ├── components/
            │   ├── Header.tsx        # Site header + mobile menu + cart drawer
            │   ├── ErrorBoundary.tsx  # React error boundary fallback UI
            │   ├── ManusDialog.tsx   # Manus AI dialog component
            │   └── ui/              # 53 shadcn/ui components
            ├── contexts/
            │   ├── CartContext.tsx    # Shopping cart state (localStorage-backed)
            │   └── ThemeContext.tsx   # Light/dark theme provider
            ├── data/
            │   └── products.ts       # Product catalog (20 items, 4 collections)
            ├── hooks/
            │   ├── useComposition.ts # IME composition event handler hook
            │   ├── useMobile.tsx     # Mobile viewport detection hook
            │   └── usePersistFn.ts   # Stable function reference hook
            ├── lib/
            │   ├── esewa.ts          # eSewa payment integration (HMAC signing, form submit)
            │   └── utils.ts          # cn() utility (clsx + tailwind-merge)
            └── pages/
                ├── Home.tsx           # Landing page (hero, collections, products, footer)
                ├── Shop.tsx           # Product grid with quick-add, collection filtering
                ├── ProductDetail.tsx   # Single product view (size/color/qty selectors)
                ├── Collections.tsx    # Collection listing with product counts
                ├── About.tsx          # Brand story, approach, sustainability
                ├── Contact.tsx        # Contact form with toast notifications
                ├── Checkout.tsx       # Order summary + eSewa payment button
                ├── PaymentResult.tsx   # Payment success/failure handling
                └── NotFound.tsx       # 404 page
```

---

## How It Was Built

### 1. Project Scaffolding
The project was bootstrapped with **Vite + React + TypeScript**. Tailwind CSS 4 was added via the `@tailwindcss/vite` plugin. **shadcn/ui** was initialized in "New York" style, providing 53 pre-built accessible UI components under `client/src/components/ui/`.

### 2. Routing & Layout (`App.tsx`)
Client-side routing uses **wouter** (lightweight alternative to React Router). The `App` component wraps everything in provider hierarchy:

```
ErrorBoundary → ThemeProvider → CartProvider → TooltipProvider → Router
```

Routes defined:
| Path | Page |
|---|---|
| `/` | Home |
| `/shop` | Shop (with `?collection=` filtering) |
| `/product/:id` | Product detail |
| `/collections` | Collections listing |
| `/about` | About page |
| `/contact` | Contact form |
| `/checkout` | Checkout + eSewa payment |
| `/payment-result` | Payment result handler |
| `*` | 404 Not Found |

A `ScrollToTop` component resets scroll position on navigation.

### 3. Design System (`index.css`)
All custom styling lives in a single 219-line CSS file using CSS custom properties:

- **Color palette**: Warm editorial — `--cream` (#f7f1e9), `--ivory` (#fffdf9), `--cocoa` (#3d2924), `--rose` (#b78378)
- **Typography**: Georgia serif for headings, Arial/sans-serif for body
- **Layout**: Max-width 1180px container (`.site-frame`), CSS Grid layouts throughout
- **Responsive**: Breakpoints at 900px (tablet) and 600px (mobile)
- **Components**: Custom CSS for cart drawer, mobile menu, product cards, checkout forms, etc.

The site imports Tailwind via `@import "tailwindcss"` but primarily uses custom CSS classes.

### 4. Product Data (`data/products.ts`)
20 products defined across 4 collections:
- **Soft Layers** (5 items): Cardigans, knits, overshirts — NPR 44-62
- **Everyday Tees** (5 items): T-shirts, long sleeves, pocket tees — NPR 28-36
- **Relaxed Bottoms** (5 items): Trousers, culottes, jeans, shorts — NPR 38-56
- **Effortless Dresses** (5 items): Slip dresses, wraps, shirt dresses — NPR 54-68

Each product has: `id`, `name`, `price`, `category`, `collection`, `description`, `image` (local files in `public/assets/source-images/`), `sizes` (XS-XL), `colors`, and `inStock`.

Helper functions: `getProduct()`, `getProductsByCollection()`, `getProductsByCategory()`.

### 5. Shopping Cart (`contexts/CartContext.tsx`)
A React Context providing full cart functionality:
- **State**: Array of `CartItem` (product + quantity + selected size/color)
- **Persistence**: Auto-saves to `localStorage` under key `"buyme-cart"`
- **Operations**: `addItem`, `removeItem`, `updateQuantity`, `clearCart`
- **Derived values**: `totalItems` (count), `subtotal` (sum of prices)

Items are uniquely identified by `productId-size-color` composite key.

### 6. Header & Navigation (`components/Header.tsx`)
Three-part header:
1. **Announcement bar** — Rose-colored strip with promotional text
2. **Desktop nav** — Logo + nav links (Home, Shop, Collections, About, Contact) + cart icon
3. **Mobile menu** — Slide-in drawer from left (triggered by hamburger icon, <900px)

**Cart drawer** — Slides in from right, showing:
- Empty state with "Browse the shop" CTA
- Cart items with image, name, size/color, price, quantity controls, remove button
- Footer with subtotal and "Continue to checkout" button
- Scrim (overlay) behind drawer

### 7. Pages

**Home** (`pages/Home.tsx`): Hero section with background image + gradient overlay → "Our approach" text section → Editorial banner → Collection cards grid → Product grid → "Why Buy Me?" values section → Full footer with links.

**Shop** (`pages/Shop.tsx`): Page header with collection description → Product grid with quick-add functionality (size/color dropdowns + "Add to bag" button per card). Filters by `?collection=` URL parameter.

**ProductDetail** (`pages/ProductDetail.tsx`): Large product image → Size/color pill selectors → Quantity control → "Add to bag" button. Shows "Product not found" if ID doesn't match.

**Collections** (`pages/Collections.tsx`): Two-column cards showing each collection's image, title, description, and product count with "Shop now" link.

**About** (`pages/About.tsx`): Brand story, approach, sustainability sections + three value cards.

**Contact** (`pages/Contact.tsx`): Contact info + form (name, email, message). Uses `sonner` toast for success notification. Shows success state after submission.

**Checkout** (`pages/Checkout.tsx`): Two-column layout — order items list + payment form (name, email, phone). Calculates 13% VAT. Redirects to eSewa sandbox for payment.

**PaymentResult** (`pages/PaymentResult.tsx`): Handles eSewa redirect. Decodes base64 response data, shows success (with reference ID, transaction UUID, amount) or failure. Clears cart on success.

**NotFound** (`pages/NotFound.tsx`): Simple 404 with "Back to home" link.

### 8. Payment Integration (`lib/esewa.ts`)
**eSewa** (Nepali digital wallet) sandbox integration:
- Uses HMAC-SHA256 signature via Web Crypto API (browser-side, no server needed)
- Generates unique transaction UUIDs (date + random string)
- Creates a hidden HTML form and auto-submits it to eSewa's test endpoint
- Test credentials provided on checkout page (ID: 9711111111, Password: Nepal@123)
- Handles success/failure redirects by decoding base64 response data

### 9. Custom Hooks
- **`useMobile`**: Detects viewport < 768px using `matchMedia`
- **`usePersistFn`**: Stable function reference (avoids re-renders, alternative to `useCallback`)
- **`useComposition`**: Handles IME composition events for East Asian text input

### 10. Vite Configuration (`vite.config.ts`)
Custom configuration:
- **Path aliases**: `@/` → `client/src/`, `@shared/` → `shared/`, `@assets/` → `attached_assets/`
- **Plugins**: React, Tailwind CSS, JSX location plugin, Manus runtime, debug collector, storage proxy
- **Dev server**: Port 5173, allows Manus domains + localhost
- **Build output**: `dist/public/`

### 11. Static Assets (`public/assets/source-images/`)
7 original image files that make the site self-contained:
- `buyme-logo.png` — Header logo mark
- `hero.jpg` — Main hero background
- `editorial-banner.jpg` — "Made for your everyday rhythm" section
- `soft-layers.jpg` — Soft Layers collection card
- `everyday-tees.jpg` — Everyday Tees collection card
- `relaxed-bottoms.jpg` — Relaxed Bottoms collection card
- `effortless-dresses.jpg` — Effortless Dresses collection card

Product images are now served locally from `public/assets/source-images/` — 20 product images plus brand assets (logo, hero, collection images).

---

## Key Features

1. **Responsive design** — Works on desktop, tablet, and mobile
2. **Shopping cart** — Add/remove/update items, persists across sessions via localStorage
3. **Collection filtering** — Shop page filters by collection via URL params
4. **Quick add** — Add to cart directly from product grid without visiting detail page
5. **eSewa payment** — Sandbox payment integration with HMAC signature verification
6. **Slide-in drawers** — Cart drawer (right) and mobile menu (left) with scrim overlays
7. **Form validation** — Contact form and checkout with required field validation
8. **Toast notifications** — Success messages via `sonner`
9. **Error boundary** — Graceful error recovery with reload option
10. **Theme support** — Light/dark theme infrastructure (currently light only, not switchable)

---

## Running the Project

```bash
cd frontend
pnpm install
pnpm dev
```

Opens at `http://localhost:5173`. No backend required — all data is client-side.

---

## What's NOT Included

This is a **front-end only** replica. There is no:
- Real payment processing (eSewa sandbox only)
- User accounts or authentication
- Backend API or database
- Inventory management
- Order tracking
- WooCommerce/WordPress connection
