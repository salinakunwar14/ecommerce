/**
 * ThemeContext.tsx — Theme (Light/Dark Mode) Management
 * 
 * This file manages the light/dark theme of the application.
 * 
 * Current Implementation:
 * - Defaults to "light" theme
 * - Theme switching is disabled (switchable = false)
 * - Can be extended to support dark mode by setting switchable = true
 * 
 * How it works:
 * 1. Adds/removes "dark" CSS class on <html> element
 * 2. The CSS uses this class to apply different colors
 * 3. Theme preference can be persisted to localStorage
 */

import React, { createContext, useContext, useEffect, useState } from "react";

// Define allowed theme values
type Theme = "light" | "dark";

/**
 * ThemeContextType — What the theme context provides
 * 
 * - theme: Current theme ("light" or "dark")
 * - toggleTheme: Function to switch between themes
 * - switchable: Whether theme switching is enabled
 */
interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
}

// Create the context (undefined initially)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;    // Default theme (defaults to "light")
  switchable?: boolean;     // Whether user can toggle theme (defaults to false)
}

/**
 * ThemeProvider — Manages theme state and applies it to the DOM
 * 
 * @param children - Components that need access to theme
 * @param defaultTheme - Initial theme ("light" or "dark")
 * @param switchable - If true, user can toggle themes
 */
export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  /**
   * Initialize theme state
   * 
   * If switchable:
   *   - Try to load saved theme from localStorage
   *   - Fall back to defaultTheme if nothing saved
   * If not switchable:
   *   - Always use defaultTheme
   */
  const [theme, setTheme] = useState<Theme>(() => {
    if (switchable) {
      const stored = localStorage.getItem("theme");
      return (stored as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  /**
   * useEffect — Apply theme to DOM whenever theme changes
   * 
   * This effect:
   * 1. Adds/removes "dark" class on <html> element
   * 2. Saves theme to localStorage (if switchable)
   * 
   * The "dark" class triggers different CSS styles:
   * .dark { background: #1a1a1a; color: white; }
   */
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === "dark") {
      root.classList.add("dark");     // Add dark mode class
    } else {
      root.classList.remove("dark");  // Remove dark mode class
    }

    // Only save to localStorage if theme switching is enabled
    if (switchable) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, switchable]); // Re-run when theme or switchable changes

  /**
   * toggleTheme — Switch between light and dark themes
   * 
   * Only works if switchable = true
   * If switchable = false, it's a no-op (does nothing)
   */
  const toggleTheme = switchable
    ? () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
      }
    : () => {}; // Empty function when not switchable

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme — Custom hook to access theme context
 * 
 * Usage in any component:
 * const { theme, toggleTheme } = useTheme();
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
