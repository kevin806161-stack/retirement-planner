import { affiliateBooks } from "../lib/affiliateLinks";

export default function BookList() {
  return (
    <section className="books">
      <h2>精選理財書單</h2>
      <p className="books-sub">編輯嚴選，每一本都值得投資自己</p>
      <div className="book-grid">
        {affiliateBooks.map((b) => (
          <div className="book-card" key={b.id}>
            <div className={`book-cover ${b.id}`} aria-hidden="true">{b.title.slice(0, 1)}</div>
            <div className="book-title">{b.title}</div>
            <div className="book-author">{b.author}</div>
            <a
              className="book-btn"
              href={b.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
            >
              博客來購買 →
            </a>
          </div>
        ))}
      </div>
      <p className="affiliate-note">
        * 以上連結為聯盟行銷連結，購買時網站將獲得少額佣金，不影響你的定價
      </p>
    </section>
  );
}
