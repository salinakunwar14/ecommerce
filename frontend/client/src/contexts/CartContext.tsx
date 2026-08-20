/**
 * CartContext.tsx — Shopping Cart State Management
 * 
 * This file manages the entire shopping cart using React Context API.
 * 
 * What is React Context?
 * - A way to share state across components without prop drilling
 * - Any component can access cart data using useCart() hook
 * - The cart state persists to localStorage (survives page refresh)
 * 
 * Key Features:
 * 1. Add items to cart (increments quantity if same item exists)
 * 2. Remove items from cart
 * 3. Update item quantities
 * 4. Clear entire cart
 * 5. Auto-persist to localStorage
 */

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Product } from "@/data/products";

/**
 * CartItem — Represents a single item in the cart
 * 
 * Each cart item contains:
 * - product: The full product object (with all details)
 * - quantity: How many of this item the user wants
 * - selectedSize: Which size they chose (e.g., "M")
 * - selectedColor: Which color they chose (e.g., "Blue")
 * 
 * Items are uniquely identified by: productId-size-color
 * This means the same product in different sizes/colors are separate items
 */
export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

/**
 * CartContextType — The shape of our cart context
 * 
 * Defines what data and functions are available to any component
 * that uses the useCart() hook
 */
interface CartContextType {
  items: CartItem[];              // All items in the cart
  totalItems: number;             // Total count (sum of all quantities)
  subtotal: number;               // Total price before tax
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
}

// Create the context (initially null, will be provided by CartProvider)
const CartContext = createContext<CartContextType | null>(null);

// localStorage key for persisting cart data
const CART_STORAGE_KEY = "buyme-cart";

/**
 * loadCart — Load cart from localStorage on app startup
 * 
 * This function runs once when the app loads to restore
 * any cart items from the previous session.
 * 
 * Uses try/catch because localStorage might be disabled
 * or corrupted (JSON.parse can fail).
 */
function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];  // Parse JSON or return empty array
  } catch {
    return [];  // If anything fails, start with empty cart
  }
}

/**
 * CartProvider — Wraps the app and provides cart state to all children
 * 
 * This component:
 * 1. Initializes cart state from localStorage
 * 2. Saves cart to localStorage whenever it changes
 * 3. Provides cart functions (add, remove, update, clear)
 */
export function CartProvider({ children }: { children: ReactNode }) {
  // useState with a function initializer = lazy initialization
  // This means loadCart() only runs once (not on every re-render)
  const [items, setItems] = useState<CartItem[]>(loadCart);

  // useEffect saves cart to localStorage whenever items change
  // This ensures the cart persists across page refreshes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]); // Re-run this effect whenever items array changes

  /**
   * addItem — Add a product to the cart
   * 
   * Uses useCallback for performance optimization:
   * - Returns a memoized function that only changes when dependencies change
   * - Empty dependency array [] means this function is created once
   * 
   * Logic:
   * 1. Create a unique key from product ID + size + color
   * 2. Check if this exact item already exists in cart
   * 3. If yes: increment quantity by 1
   * 4. If no: add new item with quantity 1
   */
  const addItem = useCallback((product: Product, size: string, color: string) => {
    setItems((prev) => {
      // Create unique identifier for this specific item variant
      const key = `${product.id}-${size}-${color}`;
      
      // Find if this exact item (same product, size, color) exists
      const existing = prev.find(
        (i) => `${i.product.id}-${i.selectedSize}-${i.selectedColor}` === key
      );
      
      if (existing) {
        // Item exists - increment quantity by 1
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // Item doesn't exist - add it with quantity 1
      return [...prev, { product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
  }, []);

  /**
   * removeItem — Remove an item completely from the cart
   * 
   * Filters out the item that matches the given product ID + size + color
   */
  const removeItem = useCallback((productId: string, size: string, color: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => `${i.product.id}-${i.selectedSize}-${i.selectedColor}` !== `${productId}-${size}-${color}`
      )
    );
  }, []);

  /**
   * updateQuantity — Set a specific quantity for an item
   * 
   * If quantity is 0 or less, the item is removed from cart
   * Otherwise, updates the quantity to the specified value
   */
  const updateQuantity = useCallback((productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      setItems((prev) =>
        prev.filter(
          (i) => `${i.product.id}-${i.selectedSize}-${i.selectedColor}` !== `${productId}-${size}-${color}`
        )
      );
      return;
    }
    // Update quantity for matching item
    setItems((prev) =>
      prev.map((i) =>
        `${i.product.id}-${i.selectedSize}-${i.selectedColor}` === `${productId}-${size}-${color}`
          ? { ...i, quantity }  // Update quantity
          : i  // Keep other items unchanged
      )
    );
  }, []);

  /** clearCart — Empty the entire cart */
  const clearCart = useCallback(() => setItems([]), []);

  /**
   * Derived values (computed from items array)
   * 
   * totalItems: Sum of all quantities (e.g., 2 shirts + 1 pants = 3 items)
   * subtotal: Sum of (price × quantity) for all items
   */
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  /**
   * Context Provider
   * 
   * Wraps children with the context value, making all cart data
   * and functions available to any descendant component
   */
  return (
    <CartContext.Provider
      value={{ items, totalItems, subtotal, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * useCart — Custom hook to access cart context
 * 
 * Usage in any component:
 * const { items, addItem, subtotal } = useCart();
 * 
 * Throws an error if used outside CartProvider,
 * which helps catch bugs early during development
 */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
