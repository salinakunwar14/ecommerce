import { useState } from "react";
import { Link, useSearch } from "wouter";
import { ShoppingBag } from "lucide-react";
import { products, collections, type Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

export default function Shop() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const activeCollection = params.get("collection");
  const { addItem } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [addedId, setAddedId] = useState<string | null>(null);

  const filtered = activeCollection
    ? products.filter((p) => p.collection === activeCollection)
    : products;

  function handleQuickAdd(product: Product, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const size = selectedSizes[product.id] || product.sizes[0];
    const color = selectedColors[product.id] || product.colors[0];
    addItem(product, size, color);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="site-frame">
          <p className="eyebrow">Shop</p>
          <h2>{activeCollection || "All products"}</h2>
          <p className="page-subtitle">
            {activeCollection
              ? collections.find((c) => c.title === activeCollection)?.description
              : "Thoughtful essentials, refined textures, and easy silhouettes made for every day."}
          </p>
        </div>
      </div>

      <div className="page-body site-frame">
        <div className="product-grid">
          {filtered.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-card-info">
                <h3>{product.name}</h3>
                <p className="product-card-category">{product.category}</p>
                <p className="product-card-price">NPR {product.price.toFixed(2)}</p>

                <div className="quick-add-options">
                  <select
                    className="quick-add-select"
                    value={selectedSizes[product.id] || product.sizes[0]}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedSizes((prev) => ({ ...prev, [product.id]: e.target.value }));
                    }}
                  >
                    {product.sizes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>

                  <select
                    className="quick-add-select"
                    value={selectedColors[product.id] || product.colors[0]}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedColors((prev) => ({ ...prev, [product.id]: e.target.value }));
                    }}
                  >
                    {product.colors.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <button
                  className="quick-add-btn"
                  onClick={(e) => handleQuickAdd(product, e)}
                >
                  <ShoppingBag size={14} />
                  {addedId === product.id ? "Added!" : "Add to bag"}
                </button>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="empty-copy">No products found in this collection.</p>
        )}
      </div>
    </div>
  );
}
