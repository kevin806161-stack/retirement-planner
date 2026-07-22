// pages/api/_debug-list-audiences.js
// 暫時性除錯用途：列出 Resend 帳號下所有 Audience 的真實 ID，用來確認 RESEND_AUDIENCE_ID 設定是否正確。
// 確認完成後應刪除此檔案，不留在正式程式碼中。
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (req.headers["x-notify-secret"] !== process.env.NOTIFY_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { data, error } = await resend.audiences.list();

    if (error) {
      console.error("Resend Audiences List API 錯誤:", JSON.stringify(error));
      return res.status(500).json({ error: "取得名單失敗", detail: error });
    }

    return res.status(200).json({ success: true, audiences: data });
  } catch (err) {
    console.error("列出 Audiences 錯誤（例外）:", err);
    return res.status(500).json({ error: "取得名單失敗，請稍後再試" });
  }
}
