import Head from "next/head";

const SITE_URL = "https://retirementplantw.com";
const SITE_NAME = "退休咖";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * 共用 SEO 元件 — 只輸出 <Head> 內的 meta / OG / JSON-LD，不含任何可見 UI。
 * props:
 *  - title, description, path
 *  - ogImage (可選)
 *  - type: "website" | "article"
 *  - schema: 額外的 JSON-LD 物件或陣列
 */
export default function SEO({ title, description, path = "", ogImage, type = "website", schema }) {
  const url = `${SITE_URL}${path}`;
  const img = ogImage || DEFAULT_OG_IMAGE;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  const schemaArray = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="zh_TW" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {/* JSON-LD 結構化資料 */}
      {schemaArray.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </Head>
  );
}

// 匯出常數供其他頁面組 schema 用
export { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE };
