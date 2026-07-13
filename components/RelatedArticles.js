import Link from "next/link";

export default function RelatedArticles({ currentSlug, currentCategory, allArticles }) {
  // 先找同分類文章，排除當前文章
  const sameCategory = allArticles.filter(
    (a) => a.slug !== currentSlug && a.category === currentCategory
  );

  // 補足不同分類，總共最多 3 篇
  const different = allArticles.filter(
    (a) => a.slug !== currentSlug && a.category !== currentCategory
  );

  const related = [...sameCategory, ...different].slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="related">
      <h3>延伸閱讀</h3>
      <div className="related-list">
        {related.map((article) => (
          <Link href={`/articles/${article.slug}`} key={article.slug} className="related-card">
            <div className="related-category">{article.category}</div>
            <div className="related-title">{article.title}</div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .related {
          margin-top: 40px;
          padding-top: 32px;
          border-top: 1px solid var(--line2);
        }
        h3 {
          font-size: 17px;
          font-weight: 800;
          margin-bottom: 16px;
          color: var(--cream);
        }
        .related-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .related-card {
          display: block;
          border: 1px solid var(--line2);
          border-radius: 12px;
          padding: 15px 17px;
          text-decoration: none;
          color: inherit;
          background: var(--panel);
          transition: transform 0.3s, border-color 0.3s;
        }
        .related-card:hover { transform: translateY(-3px); border-color: rgba(212,169,90,.45); }
        .related-category {
          font-size: 11px;
          color: var(--gold2);
          margin-bottom: 4px;
        }
        .related-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--cream);
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
