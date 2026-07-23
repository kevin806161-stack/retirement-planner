// pages/api/refresh-threads-token.js
// 刷新 Threads long-lived access token（有效期 60 天）。
// 因為新 token 無法自動寫回 Vercel 環境變數，刷新成功後會寄信通知手動更新。
import { Resend } from "resend";
import { refreshThreadsToken } from "../../lib/threads";

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_TO = "kevin806161@gmail.com";
const FROM = "退休咖 <noreply@retirementplantw.com>";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (req.headers["x-notify-secret"] !== process.env.NOTIFY_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { access_token: newToken, expires_in: expiresIn } =
      await refreshThreadsToken();

    const expiresInDays = Math.round(expiresIn / 86400);

    const { error: emailError } = await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      subject: "[退休咖] Threads Token 已刷新，請更新 Vercel 環境變數",
      html: `
        <div style="font-family: sans-serif; max-width: 560px;">
          <h2 style="color:#1d6fd8;">Threads Access Token 已刷新</h2>
          <p>新的 token 效期約 ${expiresInDays} 天，請盡快到 Vercel 專案設定，把
          <code>THREADS_ACCESS_TOKEN</code> 更新為以下值：</p>
          <pre style="background:#f5f5f5;padding:12px;border-radius:8px;word-break:break-all;white-space:pre-wrap;font-size:12px;">${newToken}</pre>
          <p style="font-size:12px;color:#999;">更新後記得在 Vercel 觸發一次 Redeploy，環境變數才會生效。</p>
        </div>
      `,
    });

    if (emailError) {
      console.error("Threads token 刷新通知信寄送失敗:", JSON.stringify(emailError));
      // token 已經刷新成功，只是通知信寄送失敗，仍視為刷新成功但提醒有風險
      return res.status(200).json({
        success: true,
        warning: "token 已刷新，但通知信寄送失敗，請查看 Vercel Function Logs 取得新 token",
      });
    }

    console.log("✅ Threads token 刷新成功並已寄送通知信");
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Threads token 刷新錯誤:", err);
    return res.status(500).json({ error: "刷新失敗", detail: err.message });
  }
}
