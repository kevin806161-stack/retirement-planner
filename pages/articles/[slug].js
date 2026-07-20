import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllArticleSlugs, getArticleBySlug, getAllArticles } from "../../lib/articles";
import AdUnit from "../../components/AdUnit";
import RelatedArticles from "../../components/RelatedArticles";
import EmailSubscribe from "../../components/EmailSubscribe";
import { adsenseConfig } from "../../lib/affiliateLinks";

const SITE_URL = "https://www.retirementplantw.com";

// 從文章 Markdown 中自動抽取「## 常見問題」段落，產生 FAQPage 結構化資料
function extractFaqJsonLd(content) {
  const section = content.match(/##\s*常見問題[^\n]*\n([\s\S]*?)(?=\n---|\n## |$)/);
  if (!section) return null;
  const items = [];
  const qa = /###\s+(.+)\n+([\s\S]*?)(?=\n###\s|$)/g;
  let m;
  while ((m = qa.exec(section[1])) !== null) {
    const question = m[1].trim();
    const answer = m[2]
      .trim()
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/\*\*/g, "")
      .replace(/\s*\n+\s*/g, " ");
    if (question && answer) {
      items.push({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      });
    }
  }
  if (items.length === 0) return null;
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items };
}

export default function ArticlePage({ article, allArticles }) {
  if (!article) return null;

  const canonicalUrl = `${SITE_URL}/articles/${article.slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首頁", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "理財知識", item: `${SITE_URL}/articles` },
      { "@type": "ListItem", position: 3, name: article.title, item: canonicalUrl },
    ],
  };

  const faqJsonLd = extractFaqJsonLd(article.content);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    author: {
      "@type": "Person",
      name: "退休咖",
      url: `${SITE_URL}/author`,
    },
    publisher: {
      "@type": "Organization",
      name: "退休咖",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon-512.png`,
      },
    },
  };

  return (
    <>
      <Head>
        <title>{`${article.title} | 退休咖`}</title>
        <meta name="description" content={article.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${article.title} | 退休咖`} />
        <meta property="og:description" content={article.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="article:published_time" content={article.publishedAt} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>退休咖</Link>
        <div className="nav-links">
          <Link href="/#calc">試算工具</Link>
          <Link href="/articles">理財知識</Link>
          <Link href="/about">關於我們</Link>
          <Link href="/author">關於作者</Link>
          <Link href="/contact">聯絡我們</Link>
        </div>
      </nav>

      <article className="article-page">
        <div className="article-category">{article.category}</div>
        <h1>{article.title}</h1>
        <div className="article-meta">{article.publishedAt}</div>

        <div className="article-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
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
        <a href="/author">關於作者</a>
        <a href="/contact">聯絡我們</a>
      </footer>

      <style jsx>{`
        .article-page { max-width: 720px; margin: 0 auto; padding: 48px 24px 80px; }
        .article-category {
          font-size: 11px; color: var(--gold2); background: rgba(212,169,90,.14);
          border: 1px solid rgba(212,169,90,.3);
          display: inline-block; padding: 3px 10px; border-radius: 12px; margin-bottom: 14px;
        }
        h1 { font-size: 30px; font-weight: 900; line-height: 1.4; margin-bottom: 10px; color: var(--cream); }
        .article-meta { font-size: 13px; color: var(--muted); margin-bottom: 32px; }
        .article-body :global(h1) { font-size: 25px; font-weight: 800; margin: 32px 0 16px; color: var(--cream); }
        .article-body :global(h2) { font-size: 21px; font-weight: 700; margin: 28px 0 14px; color: var(--cream); }
        .article-body :global(h3) { font-size: 18px; font-weight: 700; margin: 24px 0 12px; color: var(--gold2); }
        .article-body :global(p) { font-size: 16px; line-height: 1.95; color: var(--cream); margin-bottom: 16px; }
        .article-body :global(a) { color: var(--gold2); text-decoration: underline; text-underline-offset: 3px; }
        .article-body :global(ul), .article-body :global(ol) { padding-left: 22px; margin-bottom: 16px; }
        .article-body :global(li) { font-size: 16px; line-height: 1.85; color: var(--cream); margin-bottom: 8px; }
        .article-body :global(li)::marker { color: var(--gold); }
        .article-body :global(blockquote) {
          margin: 20px 0; padding: 12px 18px; border-left: 3px solid var(--gold);
          background: rgba(212,169,90,.07); border-radius: 0 10px 10px 0; color: var(--slate);
        }
        .article-body :global(pre) {
          background: #0d1c2b; border: 1px solid rgba(212,169,90,.28); border-radius: 12px;
          padding: 18px; overflow-x: auto; margin-bottom: 16px; font-size: 14px; color: var(--gold2);
        }
        .article-body :global(code) { font-family: var(--mono), "SF Mono", Menlo, monospace; color: var(--gold2); }
        .article-body :global(p) :global(code), .article-body :global(li) :global(code) {
          background: rgba(212,169,90,.12); padding: 2px 6px; border-radius: 5px; font-size: 14px;
        }
        .article-body :global(table) { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px; }
        .article-body :global(th) { background: rgba(212,169,90,.12); padding: 11px 13px; text-align: left; border: 1px solid var(--line); font-weight: 700; color: var(--cream); }
        .article-body :global(td) { padding: 11px 13px; border: 1px solid var(--line2); color: var(--cream); }
        .article-body :global(hr) { margin: 32px 0; border: none; border-top: 1px solid var(--line2); }
        .article-body :global(em) { font-size: 14px; color: var(--slate2); }
        .article-body :global(strong) { font-weight: 700; color: var(--gold2); }
        .back-link { display: inline-block; font-size: 14px; color: var(--gold2); text-decoration: none; margin-top: 32px; }
        .back-link:hover { text-decoration: underline; }
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
