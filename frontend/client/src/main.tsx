/**
 * main.tsx — Entry point of the application
 * 
 * This file is the starting point of our React app. It:
 * 1. Imports the root App component
 * 2. Imports global CSS styles
 * 3. Mounts the React app into the HTML #root element
 * 
 * React 19 uses createRoot() instead of ReactDOM.render() for
 * concurrent rendering features (better performance).
 */

// createRoot is the React 19 way to render apps (replaces older ReactDOM.render)
import { createRoot } from "react-dom/client";

// The root component that contains all routes and providers
import App from "./App";

// Global CSS file with Tailwind and custom styles
import "./index.css";

// Find the #root div in index.html and render our React app inside it
// The ! is a TypeScript non-null assertion (we're sure #root exists)
createRoot(document.getElementById("root")!).render(<App />);
