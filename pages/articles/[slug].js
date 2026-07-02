import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getAllArticleSlugs, getArticleBySlug, getAllArticles } from "../../lib/articles";
import AdUnit from "../../components/AdUnit";
import RelatedArticles from "../../components/RelatedArticles";
import EmailSubscribe from "../../components/EmailSubscribe";
import { adsenseConfig } from "../../lib/affiliateLinks";

export default function ArticlePage({ article, allArticles }) {
  if (!article) return null;

  return (
    <>
      <Head>
        <title>{article.title} | 退休 AI 規劃師</title>
        <meta name="description" content={article.description} />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>退休 AI 規劃師</Link>
        <div className="nav-links">
          <Link href="/#calc">試算工具</Link>
          <Link href="/articles">理財知識</Link>
          <Link href="/about">關於我們</Link>
          <Link href="/contact">聯絡我們</Link>
        </div>
      </nav>

      <article className="article-page">
        <div className="article-category">{article.category}</div>
        <h1>{article.title}</h1>
        <div className="article-meta">{article.publishedAt}</div>

        <div className="article-body">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>

        <div style={{ margin: "32px 0" }}>
          <AdUnit slot={adsenseConfig.slots.inArticle} />
        </div>

        <RelatedArticles
          currentSlug={article.slug}
          currentCategory={article.category}
          allArticles={allArticles}
        />

        <div style={{ marginTop: "40px" }}>
          <EmailSubscribe />
        </div>

        <Link href="/articles" className="back-link">← 返回文章列表</Link>
      </article>

      <footer className="site-footer">
        <a href="/privacy-policy">隱私權政策</a>
        <a href="/disclaimer">免責聲明</a>
        <a href="/about">關於我們</a>
        <a href="/contact">聯絡我們</a>
      </footer>

      <style jsx>{`
        .article-page { max-width: 720px; margin: 0 auto; padding: 48px 24px 80px; }
        .article-category {
          font-size: 11px; color: #c9a24b; background: rgba(201,162,75,0.12);
          display: inline-block; padding: 3px 10px; border-radius: 12px; margin-bottom: 14px;
        }
        h1 { font-size: 28px; font-weight: 700; line-height: 1.4; margin-bottom: 10px; }
        .article-meta { font-size: 13px; color: #8a929b; margin-bottom: 32px; }
        .article-body :global(h1) { font-size: 24px; font-weight: 700; margin: 32px 0 16px; }
        .article-body :global(h2) { font-size: 20px; font-weight: 600; margin: 28px 0 14px; }
        .article-body :global(p) { font-size: 15px; line-height: 1.9; color: #26333f; margin-bottom: 16px; }
        .article-body :global(ul), .article-body :global(ol) { padding-left: 22px; margin-bottom: 16px; }
        .article-body :global(li) { font-size: 15px; line-height: 1.8; color: #26333f; margin-bottom: 8px; }
        .article-body :global(pre) {
          background: #ece4d5; border: 1px solid rgba(15,33,48,0.14); border-radius: 8px;
          padding: 16px; overflow-x: auto; margin-bottom: 16px; font-size: 13px;
        }
        .article-body :global(code) { font-family: "SF Mono", Menlo, monospace; }
        .article-body :global(table) { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px; }
        .article-body :global(th) { background: #ece4d5; padding: 10px 12px; text-align: left; border: 1px solid rgba(15,33,48,0.14); font-weight: 600; }
        .article-body :global(td) { padding: 10px 12px; border: 1px solid rgba(15,33,48,0.14); }
        .article-body :global(hr) { margin: 32px 0; border: none; border-top: 1px solid rgba(15,33,48,0.14); }
        .article-body :global(em) { font-size: 13px; color: #6a7480; }
        .article-body :global(strong) { font-weight: 700; }
        .back-link { display: inline-block; font-size: 14px; color: #c9a24b; text-decoration: none; margin-top: 32px; }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getAllArticleSlugs();
  return { paths: slugs.map((slug) => ({ params: { slug } })), fallback: false };
}

export async function getStaticProps({ params }) {
  const article = getArticleBySlug(params.slug);
  const allArticles = getAllArticles();
  return { props: { article, allArticles } };
}
