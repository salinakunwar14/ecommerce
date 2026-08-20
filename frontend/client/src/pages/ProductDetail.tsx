import { useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { getProduct } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

export default function ProductDetail() {
  const params = useParams<{ id: string }>();
  const product = getProduct(params.id ?? "");
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="page-wrapper">
        <div className="page-body site-frame" style={{ padding: "100px 0", textAlign: "center" }}>
          <h2>Product not found</h2>
          <p className="empty-copy" style={{ margin: "16px auto" }}>This product doesn't exist.</p>
          <Link href="/shop" className="rose-button">Back to shop</Link>
        </div>
      </div>
    );
  }

  const p = product!;

  function handleAdd() {
    const size = selectedSize || p.sizes[0];
    const color = selectedColor || p.colors[0];
    for (let i = 0; i < quantity; i++) {
      addItem(p, size, color);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="page-wrapper">
      <div className="page-body site-frame">
        <Link href="/shop" className="back-link">
          <ArrowLeft size={16} /> Back to shop
        </Link>

        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info">
            <p className="eyebrow">{product.collection}</p>
            <h2>{product.name}</h2>
            <p className="product-detail-price">NPR {product.price.toFixed(2)}</p>
            <p className="product-detail-desc">{product.description}</p>

            <div className="option-group">
              <label>Size</label>
              <div className="option-pills">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`option-pill ${(selectedSize || product.sizes[0]) === s ? "active" : ""}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label>Colour</label>
              <div className="option-pills">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    className={`option-pill ${(selectedColor || product.colors[0]) === c ? "active" : ""}`}
                    onClick={() => setSelectedColor(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label>Quantity</label>
              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">
                  <Minus size={14} />
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <button className="rose-button wide" onClick={handleAdd}>
              {added ? "Added to bag!" : "Add to bag"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
