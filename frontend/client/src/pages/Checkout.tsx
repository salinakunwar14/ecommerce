import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { initiateEsewaPayment } from "@/lib/esewa";

export default function Checkout() {
  const { items, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const taxAmount = Math.round(subtotal * 0.13 * 100) / 100;
  const totalNPR = Math.round((subtotal + taxAmount) * 100) / 100;

  async function handlePay() {
    if (!fullName.trim() || !email.trim()) {
      alert("Please fill in your name and email.");
      return;
    }
    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const origin = window.location.origin;
      await initiateEsewaPayment(
        subtotal,
        `${origin}/payment-result`,
        `${origin}/payment-result`
      );
      // Cart is cleared in PaymentResult after successful payment
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to initialize payment. Please try again.");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="page-body site-frame" style={{ padding: "100px 0", textAlign: "center" }}>
          <ShoppingBag size={40} strokeWidth={1} style={{ margin: "0 auto 16px", opacity: 0.4 }} />
          <h2>Your bag is empty</h2>
          <p className="empty-copy" style={{ margin: "16px auto" }}>
            Add some items before checking out.
          </p>
          <Link href="/shop" className="rose-button">Browse the shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="page-body site-frame">
        <Link href="/shop" className="back-link">
          <ArrowLeft size={16} /> Back to shop
        </Link>

        <h2 style={{ marginTop: 24 }}>Checkout</h2>

        <div className="checkout-grid">
          {/* ── Order Items ── */}
          <div className="checkout-items">
            <h3>Your Items</h3>
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                className="checkout-item"
              >
                <img src={item.product.image} alt={item.product.name} />
                <div className="checkout-item-info">
                  <p className="checkout-item-name">{item.product.name}</p>
                  <p className="checkout-item-meta">
                    {item.selectedSize} / {item.selectedColor} × {item.quantity}
                  </p>
                </div>
                <p className="checkout-item-price">NPR {(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* ── Payment ── */}
          <div className="checkout-payment">
            <h3>Payment</h3>

            <div className="checkout-field">
              <label>Full Name *</label>
              <input
                type="text"
                placeholder="Ram Bahadur"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="checkout-field">
              <label>Email *</label>
              <input
                type="email"
                placeholder="ram@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="checkout-field">
              <label>Phone (optional)</label>
              <input
                type="tel"
                placeholder="98XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="checkout-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>NPR {subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (13%)</span>
                <span>NPR {taxAmount.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>NPR {totalNPR.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="esewa-button"
              onClick={handlePay}
              disabled={loading}
            >
              {loading ? (
                "Redirecting to eSewa..."
              ) : (
                <>
                  <img
                    src="https://static.esewa.com.np/esewa-app/images/esewa_logo_large.png"
                    alt="eSewa"
                    className="esewa-logo"
                  />
                  Pay with eSewa
                </>
              )}
            </button>

            <p className="payment-note">
              You will be redirected to eSewa sandbox to complete payment. No real money will be charged.
            </p>

            <div className="test-credentials">
              <p><strong>eSewa Test Credentials:</strong></p>
              <p>ID: 9711111111 / 9711111112</p>
              <p>Password: Nepal@123</p>
              <p>OTP: 123456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
