/**
 * products.ts — Product Catalog Data
 * 
 * This file contains ALL product data for the e-commerce store.
 * 
 * Key Components:
 * 1. Product interface - Defines the shape of a product object
 * 2. products array - Contains all 20 products organized by collection
 * 3. Helper functions - For finding/filtering products
 * 4. collections array - Collection metadata (title, description, image)
 * 
 * Data Structure:
 * - Products are organized into 4 collections
 * - Each collection has 5 products
 * - Each product has: id, name, price, category, collection, description, image, sizes, colors, inStock
 * 
 * Why this approach?
 * - Hardcoded data (no database needed for a demo)
 * - TypeScript interfaces ensure type safety
 * - Helper functions make it easy to query products
 * - Local images (no external CDN dependency)
 */

/**
 * Product Interface - Defines what a product looks like
 * 
 * TypeScript interfaces ensure every product has these exact properties.
 * If you try to create a product without a "price", TypeScript will error.
 */
export interface Product {
  id: string;        // Unique identifier (e.g., "soft-layer-ivory")
  name: string;      // Display name (e.g., "Soft Layer")
  price: number;     // Price in Nepalese Rupees (NPR)
  category: string;  // Product type (e.g., "Knits", "T-Shirts")
  collection: string; // Collection name (e.g., "Soft Layers")
  description: string; // Product description
  image: string;     // Path to product image (local file)
  sizes: string[];   // Available sizes (e.g., ["XS", "S", "M", "L", "XL"])
  colors: string[];  // Available colors (e.g., ["Ivory", "Cocoa", "Rose"])
  inStock: boolean;  // Whether product is available (true/false)
}

/**
 * products Array - The complete product catalog
 * 
 * Contains 20 products organized into 4 collections:
 * 1. Soft Layers (5 items) - Cardigans, knits, overshirts
 * 2. Everyday Tees (5 items) - T-shirts, long sleeves
 * 3. Relaxed Bottoms (5 items) - Trousers, culottes, jeans
 * 4. Effortless Dresses (5 items) - Slip dresses, wraps, shirt dresses
 * 
 * Price Range: NPR 28 - NPR 68
 */
export const products: Product[] = [
  // ── Soft Layers Collection ──────────────────────────────────────────
  // Cardigans, knits, and overshirts in brushed cotton and merino
  
  {
    id: "soft-layer-ivory",
    name: "Soft Layer",
    price: 48,  // NPR 48
    category: "Knits",
    collection: "Soft Layers",
    description: "A lightweight knit layer in brushed cotton, designed to drape gently over your everyday essentials.",
    image: "/assets/source-images/softlayer.jpg",  // Local image
    sizes: ["XS", "S", "M", "L", "XL"],  // Available sizes
    colors: ["Ivory", "Cocoa", "Rose"],  // Available colors
    inStock: true,  // Available for purchase
  },
  {
    id: "soft-cardigan-oat",
    name: "Soft Cardigan",
    price: 52,
    category: "Cardigans",
    collection: "Soft Layers",
    description: "A button-front cardigan in brushed merino blend, perfect for layering over tees and dresses.",
    image: "/assets/source-images/cardigan.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Oat", "Cocoa", "Cream"],
    inStock: true,
  },
  {
    id: "brushed-overshirt-stone",
    name: "Brushed Overshirt",
    price: 58,
    category: "Shackets",  // Shirt + Jacket = Shacket
    collection: "Soft Layers",
    description: "A brushed cotton overshirt with a relaxed fit, chest pockets, and a soft hand feel.",
    image: "/assets/source-images/brushed over shirt.jpg",
    sizes: ["S", "M", "L", "XL"],  // No XS for this item
    colors: ["Stone", "Cocoa"],
    inStock: true,
  },
  {
    id: "cotton-crew-knit-cream",
    name: "Cotton Crew Knit",
    price: 44,
    category: "Knits",
    collection: "Soft Layers",
    description: "A mid-weight crewneck knit in organic cotton, with ribbed cuffs and hem.",
    image: "/assets/source-images/cotton crew knit.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Navy", "Rose"],
    inStock: true,
  },
  {
    id: "merino-zip-hoodie-cocoa",
    name: "Merino Zip Hoodie",
    price: 62,  // Most expensive in Soft Layers
    category: "Knits",
    collection: "Soft Layers",
    description: "A lightweight zip-through hoodie in fine merino blend, with a brushed interior.",
    image: "/assets/source-images/Merino Zip Hoodie.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cocoa", "Grey"],
    inStock: true,
  },

  // ── Everyday Tees Collection ────────────────────────────────────────
  // T-shirts, tops, and long sleeves in breathable cotton jersey
  
  {
    id: "everyday-tee-white",
    name: "Essential Crew Tee",
    price: 32,
    category: "T-Shirts",
    collection: "Everyday Tees",
    description: "A relaxed-fit crew neck in breathable cotton jersey, made for daily rotation.",
    image: "/assets/source-images/Essential Crew Tee.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Stone", "Black"],
    inStock: true,
  },
  {
    id: "classic-crew-tee-grey",
    name: "Classic Crew Tee",
    price: 28,  // Cheapest product in the catalog
    category: "T-Shirts",
    collection: "Everyday Tees",
    description: "A classic crew-neck tee in midweight cotton, with a slightly relaxed fit.",
    image: "/assets/source-images/classic crew tee.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Grey", "White", "Navy"],
    inStock: true,
  },
  {
    id: "v-neck-tee-ivory",
    name: "V-Neck Tee",
    price: 30,
    category: "T-Shirts",
    collection: "Everyday Tees",
    description: "A clean V-neck tee in smooth cotton jersey, with a flattering neckline.",
    image: "/assets/source-images/v neck tee.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ivory", "Black", "Rose"],
    inStock: true,
  },
  {
    id: "long-sleeve-tee-navy",
    name: "Long Sleeve Tee",
    price: 36,
    category: "T-Shirts",
    collection: "Everyday Tees",
    description: "A long-sleeve crew in brushed cotton jersey, ideal for cooler days.",
    image: "/assets/source-images/long sleeve tee.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "White", "Stone"],
    inStock: true,
  },
  {
    id: "pocket-tee-stone",
    name: "Pocket Tee",
    price: 34,
    category: "T-Shirts",
    collection: "Everyday Tees",
    description: "A relaxed pocket tee in washed cotton, with a single chest pocket detail.",
    image: "/assets/source-images/pocket tee.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Stone", "White", "Cocoa"],
    inStock: true,
  },

  // ── Relaxed Bottoms Collection ──────────────────────────────────────
  // Trousers, culottes, jeans, and shorts in washed linen and cotton
  
  {
    id: "relaxed-trouser-sand",
    name: "Relaxed Trouser",
    price: 56,
    category: "Trousers",
    collection: "Relaxed Bottoms",
    description: "A wide-leg trouser in washed linen, cut for comfort and easy movement.",
    image: "/assets/source-images/relaxed trouser.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Sand", "Cocoa", "Cream"],
    inStock: true,
  },
  {
    id: "linen-culottes-cream",
    name: "Linen Culottes",
    price: 44,
    category: "Culottes",  // Cropped wide-leg pants
    collection: "Relaxed Bottoms",
    description: "Cropped wide-leg culottes in pure linen, with an elasticated back waistband.",
    image: "/assets/source-images/linen culottes.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Stone", "Black"],
    inStock: true,
  },
  {
    id: "straight-leg-jean-indigo",
    name: "Straight Leg Jean",
    price: 54,
    category: "Jeans",
    collection: "Relaxed Bottoms",
    description: "A straight-leg jean in midweight indigo denim, with a comfortable mid rise.",
    image: "/assets/source-images/straight leg jean.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Indigo", "Black"],
    inStock: true,
  },
  {
    id: "drawstring-short-khaki",
    name: "Drawstring Short",
    price: 38,
    category: "Shorts",
    collection: "Relaxed Bottoms",
    description: "An easy drawstring short in washed cotton twill, with side pockets.",
    image: "/assets/source-images/drawstring short.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Khaki", "Stone", "Navy"],
    inStock: true,
  },
  {
    id: "wide-leg-pant-cocoa",
    name: "Wide Leg Pant",
    price: 52,
    category: "Trousers",
    collection: "Relaxed Bottoms",
    description: "A high-rise wide leg pant in flowing viscose, with pressed front crease.",
    image: "/assets/source-images/wide leg pant.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cocoa", "Cream", "Black"],
    inStock: true,
  },

  // ── Effortless Dresses Collection ───────────────────────────────────
  // Slip dresses, wraps, shirt dresses in soft viscose and cotton
  
  {
    id: "effortless-dress-rose",
    name: "Drape Midi Slip",
    price: 64,
    category: "Slip Dresses",
    collection: "Effortless Dresses",
    description: "A midi-length slip dress in soft viscose, with delicate straps and a relaxed drape.",
    image: "/assets/source-images/drape midi slip.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Rose", "Ivory", "Black"],
    inStock: true,
  },
  {
    id: "wrap-dress-cocoa",
    name: "Wrap Dress",
    price: 58,
    category: "Wrap Dresses",
    collection: "Effortless Dresses",
    description: "A flattering wrap-front dress in creased cotton, with adjustable tie waist.",
    image: "/assets/source-images/wrap dress.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cocoa", "Rose", "Ivory"],
    inStock: true,
  },
  {
    id: "shirt-dress-linen",
    name: "Shirt Dress",
    price: 60,
    category: "Shirt Dresses",
    collection: "Effortless Dresses",
    description: "A button-through shirt dress in washed linen, with a belted waist and side pockets.",
    image: "/assets/source-images/shirt dress.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Stone", "Cream", "Navy"],
    inStock: true,
  },
  {
    id: "midi-tiered-dress-ivory",
    name: "Midi Tiered Dress",
    price: 68,  // Most expensive product in the catalog
    category: "Maxi Dresses",
    collection: "Effortless Dresses",
    description: "A tiered midi dress in soft cotton voile, with puff sleeves and a smocked bodice.",
    image: "/assets/source-images/midi tiered dress.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ivory", "Rose"],
    inStock: true,
  },
  {
    id: "knit-tank-dress-black",
    name: "Knit Tank Dress",
    price: 54,
    category: "Slip Dresses",
    collection: "Effortless Dresses",
    description: "A body-skimming tank dress in ribbed cotton knit, with a midi hemline.",
    image: "/assets/source-images/knit tank dress.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Cocoa", "Cream"],
    inStock: true,
  },
];

/**
 * getProduct — Find a single product by its ID
 * 
 * Usage: const product = getProduct("soft-layer-ivory");
 * 
 * @param id - The product ID to search for
 * @returns The product object, or undefined if not found
 */
export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/**
 * getProductsByCollection — Get all products in a collection
 * 
 * Usage: const softLayers = getProductsByCollection("Soft Layers");
 * 
 * @param collection - The collection name to filter by
 * @returns Array of products in that collection
 */
export function getProductsByCollection(collection: string): Product[] {
  return products.filter((p) => p.collection === collection);
}

/**
 * getProductsByCategory — Get all products in a category
 * 
 * Usage: const tshirts = getProductsByCategory("T-Shirts");
 * 
 * @param category - The category to filter by
 * @returns Array of products in that category
 */
export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

/**
 * collections — Collection metadata
 * 
 * Each collection has:
 * - title: Display name
 * - description: Brief description
 * - image: Path to collection image
 * 
 * These are used on the Collections page and for filtering on the Shop page
 */
export const collections = [
  {
    title: "Soft Layers",
    description: "Cardigans, knits, and overshirts in brushed cotton and merino — easy layers for every day.",
    image: "/assets/source-images/soft-layers.jpg",
  },
  {
    title: "Everyday Tees",
    description: "Relaxed-fit t-shirts, long sleeves, and pocket tees in breathable cotton jersey.",
    image: "/assets/source-images/everyday-tees.jpg",
  },
  {
    title: "Relaxed Bottoms",
    description: "Trousers, culottes, jeans, and shorts — relaxed fits in washed linen and cotton.",
    image: "/assets/source-images/relaxed-bottoms.jpg",
  },
  {
    title: "Effortless Dresses",
    description: "Slip dresses, wraps, shirt dresses, and tiered maxis in soft viscose and cotton.",
    image: "/assets/source-images/effortless-dresses.jpg",
  },
];
