import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="page-wrapper">
      <div className="page-body site-frame" style={{ padding: "100px 0", textAlign: "center" }}>
        <p className="eyebrow">Lost?</p>
        <h2>Page not found</h2>
        <p className="empty-copy" style={{ margin: "16px auto" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="rose-button">Back to home</Link>
      </div>
    </div>
  );
}
