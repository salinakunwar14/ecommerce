/**
 * Home.tsx — Landing Page
 * 
 * The main page users see when they first visit the site.
 * 
 * Sections (in order):
 * 1. Hero — Full-screen background image with headline and CTA
 * 2. Story — Editorial section explaining the brand's approach
 * 3. Editorial Banner — Large lifestyle image with overlay text
 * 4. Collections — Grid of 4 collection cards linking to filtered shop
 * 5. Products — Featured products (first 4 items)
 * 6. Why — 3-column value propositions
 * 7. Footer — Brand info, links, and copyright
 * 
 * This is a static page (no state management needed).
 * All data comes from the products.ts file.
 */

import { Link } from "wouter";

// Import product data and collections from the data file
import { products, collections } from "@/data/products";

// Local image paths for hero and editorial sections
const images = {
  hero: "/assets/source-images/hero.jpg",
  editorial: "/assets/source-images/editorial-banner.jpg",
};

// Brand values displayed in the "Why Buy Me?" section
const values = [
  {
    title: "Easy to wear",
    copy: "Versatile pieces designed to work beautifully across your everyday wardrobe.",
  },
  {
    title: "Thoughtful details",
    copy: "From soft textures to flattering shapes, every choice is made with comfort in mind.",
  },
  {
    title: "Made to return to",
    copy: "Build a wardrobe of dependable favourites that feel right season after season.",
  },
];

/**
 * Home Component
 * 
 * This is the landing page component. It renders multiple sections:
 * - Hero section with background image
 * - Brand story section
 * - Editorial banner
 * - Collection cards
 * - Featured products
 * - Brand values
 * - Footer
 */
export default function Home() {
  return (
    <>
      <main>
        {/* ── Hero Section ───────────────────────────────────────────── */}
        {/* Full-screen background image with headline and call-to-action */}
        <section className="hero" style={{ backgroundImage: `url(${images.hero})` }}>
          <div className="site-frame hero-content">
            <div className="hero-copy">
              <p className="eyebrow">The Buy Me edit</p>
              <h1>Feel good in<br />what you wear</h1>
              <p className="hero-description">Thoughtful essentials, refined textures, and easy silhouettes made for every day.</p>
              {/* Link to shop page */}
              <Link href="/shop" className="rose-button">Shop the collection</Link>
            </div>
          </div>
        </section>

        {/* ── Story Section ──────────────────────────────────────────── */}
        {/* Editorial layout describing the brand's approach */}
        <section className="story-section">
          <div className="site-frame story-grid">
            <div><p className="eyebrow">Our approach</p></div>
            <div className="story-copy">
              <h2>Everyday style, thoughtfully considered.</h2>
              <p>Buy Me brings together versatile clothing designed to move with your day. From soft layers to effortless dresses, each piece is chosen for comfort, confidence, and repeat wear.</p>
            </div>
          </div>
        </section>

        {/* ── Editorial Banner ───────────────────────────────────────── */}
        {/* Large lifestyle image with overlay text */}
        <section className="editorial-banner" style={{ backgroundImage: `url(${images.editorial})` }}>
          <div className="site-frame editorial-content">
            <div className="editorial-copy">
              <p className="eyebrow light">The latest edit</p>
              <h2>Made for your everyday<br />rhythm.</h2>
              <p>Discover considered layers, breathable fabrics, and easy shapes that feel as good as they look.</p>
              <Link href="/shop" className="outline-button">Explore the collection</Link>
            </div>
          </div>
        </section>

        {/* ── Collections Section ────────────────────────────────────── */}
        {/* Grid of 4 collection cards linking to filtered shop views */}
        <section className="collections-section">
          <div className="site-frame">
            <div className="section-heading">
              <h2>Find your everyday favourites</h2>
              <Link href="/collections" className="text-link">View all</Link>
            </div>
            <div className="collection-grid">
              {/* Map over collections array to render each card */}
              {collections.map((item) => (
                <Link key={item.title} href={`/shop?collection=${encodeURIComponent(item.title)}`} className="collection-card">
                  <img src={item.image} alt={`${item.title} collection`} />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Products Section ──────────────────────────────── */}
        {/* Shows first 4 products as featured items */}
        <section className="products-section">
          <div className="site-frame">
            <div className="section-heading">
              <h2>New this season</h2>
              <Link href="/shop" className="text-link">View all</Link>
            </div>
            <div className="product-grid">
              {/* slice(0, 4) = show only first 4 products */}
              {products.slice(0, 4).map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <div className="product-card-info">
                    <h3>{product.name}</h3>
                    <p className="product-card-category">{product.category}</p>
                    <p className="product-card-price">NPR {product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Buy Me Section ─────────────────────────────────────── */}
        {/* 3-column value propositions on dark background */}
        <section className="why-section">
          <div className="site-frame">
            <h2>Why Buy Me?</h2>
            <div className="why-grid">
              {values.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      {/* Site-wide footer with brand info, links, and copyright */}
      <footer className="site-footer">
        <div className="site-frame footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <Link className="footer-brand-name" href="/">Buy Me</Link>
            <p>Everyday clothing with a softer point of view — thoughtful layers, easy silhouettes, and pieces made to be worn on repeat.</p>
          </div>
          
          {/* Quick links column */}
          <div>
            <h3>Quick links</h3>
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          
          {/* Information column */}
          <div>
            <h3>Information</h3>
            <Link href="/contact">Shipping &amp; Returns</Link>
            <Link href="/contact">Privacy Policy</Link>
            <Link href="/contact">Terms</Link>
          </div>
          
          {/* Support column */}
          <div className="footer-help">
            <h3>Need a hand?</h3>
            <p>Questions about sizing, styling, or your order? Our team is here to help.</p>
            <Link href="/contact" className="text-link">Ask a question</Link>
          </div>
        </div>
        
        {/* Copyright bar */}
        <div className="site-frame copyright">
          <span>© 2026 Buy Me. All rights reserved.</span>
          <span>Everyday clothing, thoughtfully chosen.</span>
        </div>
      </footer>
    </>
  );
}
