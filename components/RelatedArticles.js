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
          border-top: 1px solid #e5e5e0;
        }
        h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #1a1a1a;
        }
        .related-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .related-card {
          display: block;
          border: 1px solid #e5e5e0;
          border-radius: 10px;
          padding: 14px 16px;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.2s;
        }
        .related-card:hover { border-color: #1d6fd8; }
        .related-category {
          font-size: 11px;
          color: #1d6fd8;
          margin-bottom: 4px;
        }
        .related-title {
          font-size: 14px;
          font-weight: 500;
          color: #1a1a1a;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
