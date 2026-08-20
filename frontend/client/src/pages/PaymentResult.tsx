import { useEffect } from "react";
import { Link, useSearch } from "wouter";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { decodeEsewaResponse } from "@/lib/esewa";
import { useCart } from "@/contexts/CartContext";

export default function PaymentResult() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const { clearCart } = useCart();

  // eSewa sends base64 data on success redirect
  const encodedData = params.get("data");
  let esewaData: Record<string, any> | null = null;
  let isSuccess = false;

  if (encodedData) {
    esewaData = decodeEsewaResponse(encodedData);
    isSuccess = esewaData?.status === "COMPLETE";
  }

  // If no data param, it might be a direct failure redirect
  if (!encodedData) {
    isSuccess = false;
  }

  // Clear cart only after confirmed successful payment
  useEffect(() => {
    if (isSuccess) {
      clearCart();
    }
  }, [isSuccess, clearCart]);

  return (
    <div className="page-wrapper">
      <div className="page-body site-frame" style={{ padding: "100px 0", textAlign: "center" }}>
        {isSuccess ? (
          <>
            <CheckCircle size={56} strokeWidth={1.2} style={{ color: "#2d8a4e", margin: "0 auto 20px" }} />
            <h2>Payment Successful!</h2>
            <p className="empty-copy" style={{ margin: "16px auto", maxWidth: 480 }}>
              Thank you for your purchase. Your payment has been confirmed by eSewa.
            </p>
          </>
        ) : (
          <>
            <XCircle size={56} strokeWidth={1.2} style={{ color: "#c0392b", margin: "0 auto 20px" }} />
            <h2>Payment Failed</h2>
            <p className="empty-copy" style={{ margin: "16px auto", maxWidth: 480 }}>
              {esewaData
                ? `Payment status: ${esewaData.status || "unknown"}`
                : "Something went wrong. Please try again."}
            </p>
          </>
        )}

        {isSuccess && esewaData && (
          <div className="payment-details">
            {esewaData.ref_id && (
              <div className="detail-row">
                <span>Reference ID</span>
                <strong>{esewaData.ref_id}</strong>
              </div>
            )}
            {esewaData.transaction_uuid && (
              <div className="detail-row">
                <span>Transaction UUID</span>
                <strong>{esewaData.transaction_uuid}</strong>
              </div>
            )}
            {esewaData.total_amount && (
              <div className="detail-row">
                <span>Amount Paid</span>
                <strong>NPR {esewaData.total_amount}</strong>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 40, display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href="/shop" className="rose-button">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
          <Link href="/" className="outline-button" style={{ color: "var(--cocoa)", borderColor: "var(--line)" }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
