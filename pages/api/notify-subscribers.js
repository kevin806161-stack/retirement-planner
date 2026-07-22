// pages/api/notify-subscribers.js
// 群發最新文章通知信：讀取最新一篇文章，透過 Resend Broadcasts API 寄給 Audience 名單
// 由 GitHub Actions（.github/workflows/notify-new-article.yml）在文章發布後觸發
import { Resend } from "resend";
import { getAllArticles } from "../../lib/articles";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "退休咖 <noreply@retirementplantw.com>";
const SITE_URL = "https://www.retirementplantw.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (req.headers["x-notify-secret"] !== process.env.NOTIFY_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    console.error("通知失敗：未設定 RESEND_AUDIENCE_ID");
    return res.status(500).json({ error: "缺少 RESEND_AUDIENCE_ID 設定" });
  }

  try {
    const articles = getAllArticles(); // 已依 publishedAt 新到舊排序
    const latest = articles[0];

    if (!latest) {
      return res.status(500).json({ error: "找不到可通知的文章" });
    }

    const articleUrl = `${SITE_URL}/articles/${latest.slug}`;

    const { data: broadcast, error: createError } = await resend.broadcasts.create({
      audienceId,
      from: FROM,
      subject: `【退休咖】新文章：${latest.title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px;">
          <h2 style="color:#1d6fd8;">退休咖發布新文章囉 ☕</h2>
          <h3 style="color:#333;">${latest.title}</h3>
          <p>${latest.description || ""}</p>
          <p><a href="${articleUrl}" style="color:#1d6fd8;">閱讀完整文章 →</a></p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
          <p style="font-size:12px;color:#999;">如不想再收到此類信件，可點此取消訂閱：{{{RESEND_UNSUBSCRIBE_URL}}}</p>
        </div>
      `,
    });

    if (createError) {
      console.error("Resend Broadcasts API 錯誤（建立通知信）:", JSON.stringify(createError));
      return res.status(500).json({ error: "建立通知信失敗" });
    }

    const { error: sendError } = await resend.broadcasts.send(broadcast.id);

    if (sendError) {
      console.error("Resend Broadcasts API 錯誤（寄送通知信）:", JSON.stringify(sendError));
      return res.status(500).json({ error: "寄送通知信失敗" });
    }

    console.log("✅ 新文章通知寄送成功:", { slug: latest.slug, broadcastId: broadcast.id });
    return res.status(200).json({ success: true, broadcastId: broadcast.id, article: latest.slug });
  } catch (err) {
    console.error("通知訂閱者錯誤（例外）:", err);
    return res.status(500).json({ error: "通知失敗，請稍後再試" });
  }
}
