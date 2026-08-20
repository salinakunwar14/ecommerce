import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [location, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items, totalItems, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <>
      <div className="announcement">New season layers, made for every day</div>

      <header className="site-header">
        <div className="site-frame header-row">
          <Link className="brand" href="/" aria-label="Buy Me home">
            <img src="/assets/source-images/buyme-logo.png" alt="Buy Me logo" className="brand-mark" />
            <span>Buy Me</span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={location === href ? "active" : ""}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label="Open shopping cart">
              <ShoppingBag size={15} strokeWidth={1.8} />
              <span className="cart-count">{totalItems}</span>
            </button>
            <button className="menu-trigger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={22} strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </header>

      <aside className={`mobile-menu ${mobileOpen ? "is-open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-menu-head">
          <span>Menu</span>
          <button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={22} /></button>
        </div>
        <nav aria-label="Mobile navigation">
          {navItems.map(({ label, href }) => (
            <Link key={label} href={href} onClick={() => setMobileOpen(false)}>
              {label}
            </Link>
          ))}
          <button onClick={() => { setCartOpen(true); setMobileOpen(false); }}>Cart ({totalItems})</button>
        </nav>
      </aside>
      {mobileOpen && <button className="scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}

      <aside className={`cart-drawer ${cartOpen ? "is-open" : ""}`} aria-hidden={!cartOpen}>
        <div className="cart-drawer-head">
          <h2>Your bag</h2>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={22} /></button>
        </div>
        {items.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={28} strokeWidth={1.25} />
            <p>Your bag is waiting for a new favourite.</p>
            <Link href="/shop" className="rose-button" onClick={() => setCartOpen(false)}>
              Browse the shop
            </Link>
          </div>
        ) : (
          <div className="cart-items">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                className="cart-product"
              >
                <img src={item.product.image} alt={item.product.name} />
                <div>
                  <h3>{item.product.name}</h3>
                  <p className="cart-item-meta">{item.selectedSize} / {item.selectedColor}</p>
                  <p>NPR {item.product.price.toFixed(2)}</p>
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedSize,
                          item.selectedColor,
                          item.quantity - 1
                        )
                      }
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedSize,
                          item.selectedColor,
                          item.quantity + 1
                        )
                      }
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="cart-drawer-footer">
          <div>
            <span>Subtotal</span>
            <strong>NPR {subtotal.toFixed(2)}</strong>
          </div>
          <button
            className="rose-button wide"
            onClick={() => {
              setCartOpen(false);
              navigate("/checkout");
            }}
          >
            Continue to checkout
          </button>
        </div>
      </aside>
      {cartOpen && <button className="cart-scrim" aria-label="Close cart" onClick={() => setCartOpen(false)} />}
    </>
  );
}
