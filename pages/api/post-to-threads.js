// pages/api/post-to-threads.js
// 發布 Threads 貼文：不帶 text 時自動用最新文章組導流貼文，帶 text 時直接發布自訂內容
import { publishThreadsPost } from "../../lib/threads";
import { getAllArticles } from "../../lib/articles";

const SITE_URL = "https://www.retirementplantw.com";
const MAX_LENGTH = 500;
const FOOTER = "☕ 追蹤退休咖，每天一個退休數字";
const HEADLINE_MAX_LENGTH = 60;

function buildArticlePost(article) {
  const link = `${SITE_URL}/articles/${article.slug}`;
  const cta = `完整試算 👉 ${link}`;
  const fixedSuffix = `\n\n${cta}\n\n${FOOTER}`;

  const threadsHook = (article.threadsHook || "").trim();
  let headline;

  if (threadsHook) {
    // 優先使用文章 frontmatter 手動指定的 threadsHook 當開頭
    headline = threadsHook;
  } else {
    // 沒有 threadsHook 時，退回用 description 第一句（或前 60 字）的邏輯
    const rawDescription = (article.description || article.title || "").trim();
    const firstSentenceMatch = rawDescription.match(/^[^。！？]*[。！？]/);
    headline = firstSentenceMatch ? firstSentenceMatch[0] : rawDescription;

    if (headline.length > HEADLINE_MAX_LENGTH) {
      headline = `${headline.slice(0, HEADLINE_MAX_LENGTH)}…`;
    }
  }

  let text = `${headline}${fixedSuffix}`;

  // 保險檢查：確保連結與結尾標語一定完整保留，超過上限就再截斷描述部分
  if (text.length > MAX_LENGTH) {
    const maxHeadlineLength = MAX_LENGTH - fixedSuffix.length - 1;
    headline = `${headline.slice(0, Math.max(0, maxHeadlineLength))}…`;
    text = `${headline}${fixedSuffix}`;
  }

  return text;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (req.headers["x-notify-secret"] !== process.env.NOTIFY_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const customText = req.body && req.body.text;
    let text;

    if (customText) {
      text = String(customText).trim();
      if (text.length > MAX_LENGTH) {
        return res.status(400).json({
          error: `text 超過 Threads ${MAX_LENGTH} 字元上限（目前 ${text.length} 字），請自行縮短後再送出`,
        });
      }
    } else {
      const articles = getAllArticles(); // 已依 publishedAt 新到舊排序
      const latest = articles[0];

      if (!latest) {
        return res.status(500).json({ error: "找不到可發布的文章" });
      }

      text = buildArticlePost(latest);
    }

    const postId = await publishThreadsPost(text);

    console.log("✅ Threads 貼文成功:", { postId });
    return res.status(200).json({ success: true, postId });
  } catch (err) {
    console.error("Threads 發文錯誤:", err);
    return res.status(500).json({ error: "發文失敗", detail: err.message });
  }
}
