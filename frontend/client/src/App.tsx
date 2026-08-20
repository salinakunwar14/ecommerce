/**
 * App.tsx — Root component of the application
 * 
 * This is the main component that sets up:
 * 1. Provider hierarchy (ErrorBoundary, Theme, Cart, Tooltips)
 * 2. Client-side routing with Wouter
 * 3. Global components (Header, Toast notifications)
 * 
 * Provider Hierarchy Explained:
 * - ErrorBoundary: Catches any JavaScript errors and shows fallback UI
 * - CartProvider: Shopping cart state (items, quantities, totals)
 * - TooltipProvider: Enables tooltip interactions across the app
 */

import { useEffect } from "react";

// Wouter is a lightweight React router (alternative to React Router)
import { Route, Switch, useLocation } from "wouter";

// Sonner toast notifications (for success/error messages)
import { Toaster } from "@/components/ui/sonner";

// Radix UI tooltip provider
import { TooltipProvider } from "@/components/ui/tooltip";

// Context providers for global state
import { CartProvider } from "./contexts/CartContext";

// Error boundary catches render errors and shows fallback UI
import ErrorBoundary from "./components/ErrorBoundary";



// Components
import Header from "./components/Header";

// Page components (lazy-loaded would be better for production)
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import PaymentResult from "./pages/PaymentResult";
import NotFound from "./pages/NotFound";

/**
 * ScrollToTop — Automatically scrolls to top when navigating between pages
 * 
 * Uses wouter's useLocation hook to detect route changes,
 * then scrolls the window to the top of the page.
 */
function ScrollToTop() {
  const [location] = useLocation();
  
  // This effect runs whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); // dependency: re-run when location changes
  
  return null; // This component doesn't render anything visible
}

/**
 * App — The root component
 * 
 * Structure:
 * - ErrorBoundary wraps everything to catch render errors
 * - CartProvider provides shopping cart state
 * - TooltipProvider enables tooltips
 * - ScrollToTop handles scroll position on navigation
 * - Toaster renders toast notifications
 * - Header appears on every page
 * - Switch/Route handles page routing
 */
function App() {
  return (
    <ErrorBoundary>
      {/* Cart provider gives access to cart state everywhere */}
      <CartProvider>
        {/* Tooltip provider enables Radix tooltips */}
        <TooltipProvider>
          {/* Auto-scroll to top on page navigation */}
          <ScrollToTop />
          
          {/* Toast notification system (for "Added to cart" etc.) */}
          <Toaster />
          
          {/* Site header with logo, nav, cart drawer - shown on all pages */}
          <Header />
          
          {/* Switch renders the first matching Route (client-side routing) */}
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/shop" component={Shop} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route path="/collections" component={Collections} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/payment-result" component={PaymentResult} />
            <Route component={NotFound} />
          </Switch>
        </TooltipProvider>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
