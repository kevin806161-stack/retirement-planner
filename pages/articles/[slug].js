import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getAllArticleSlugs, getArticleBySlug } from "../../lib/articles";
import AdUnit from "../../components/AdUnit";
import { adsenseConfig } from "../../lib/affiliateLinks";

export default function ArticlePage({ article }) {
  if (!article) return null;

  return (
    <>
      <Head>
        <title>{article.title} | 退休 AI 規劃師</title>
        <meta name="description" content={article.description} />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>
          退休 AI 規劃師
        </Link>
        <div className="nav-links">
          <Link href="/#calc">試算工具</Link>
          <Link href="/articles">理財知識</Link>
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

        <Link href="/articles" className="back-link">
          ← 返回文章列表
        </Link>
      </article>

      <style jsx>{`
        .article-page {
          max-width: 720px;
          margin: 0 auto;
          padding: 48px 24px 80px;
        }
        .article-category {
          font-size: 11px;
          color: #1d6fd8;
          background: #e6f1fb;
          display: inline-block;
          padding: 3px 10px;
          border-radius: 12px;
          margin-bottom: 14px;
        }
        h1 {
          font-size: 28px;
          font-weight: 700;
          line-height: 1.4;
          margin-bottom: 10px;
        }
        .article-meta {
          font-size: 13px;
          color: #999;
          margin-bottom: 32px;
        }
        .article-body :global(h1) {
          font-size: 24px;
          font-weight: 700;
          margin: 32px 0 16px;
        }
        .article-body :global(h2) {
          font-size: 20px;
          font-weight: 600;
          margin: 28px 0 14px;
        }
        .article-body :global(p) {
          font-size: 15px;
          line-height: 1.9;
          color: #333;
          margin-bottom: 16px;
        }
        .article-body :global(ul),
        .article-body :global(ol) {
          padding-left: 22px;
          margin-bottom: 16px;
        }
        .article-body :global(li) {
          font-size: 15px;
          line-height: 1.8;
          color: #333;
          margin-bottom: 8px;
        }
        .article-body :global(pre) {
          background: #f5f5f3;
          border: 1px solid #e5e5e0;
          border-radius: 8px;
          padding: 16px;
          overflow-x: auto;
          margin-bottom: 16px;
          font-size: 13px;
        }
        .article-body :global(code) {
          font-family: "SF Mono", Menlo, monospace;
        }
        .article-body :global(strong) {
          font-weight: 700;
        }
        .article-body :global(hr) {
          margin: 32px 0;
          border: none;
          border-top: 1px solid #e5e5e0;
        }
        .article-body :global(em) {
          font-size: 13px;
          color: #888;
        }
        .back-link {
          display: inline-block;
          font-size: 14px;
          color: #1d6fd8;
          text-decoration: none;
          margin-top: 24px;
        }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getAllArticleSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const article = getArticleBySlug(params.slug);
  return {
    props: { article },
  };
}
