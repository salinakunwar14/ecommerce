import { Link } from "wouter";
import { collections, products } from "@/data/products";

export default function Collections() {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="site-frame">
          <p className="eyebrow">Collections</p>
          <h2>Find your everyday favourites</h2>
          <p className="page-subtitle">Curated edits of thoughtful pieces, designed to work together and last season after season.</p>
        </div>
      </div>

      <div className="page-body site-frame">
        <div className="collections-grid">
          {collections.map((c) => {
            const count = products.filter((p) => p.collection === c.title).length;
            return (
              <Link
                key={c.title}
                href={`/shop?collection=${encodeURIComponent(c.title)}`}
                className="collection-detail-card"
              >
                <img src={c.image} alt={`${c.title} collection`} />
                <div className="collection-detail-info">
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                  <span className="text-link">{count} products — Shop now</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
