// pages/api/subscribe.js
// 電子報訂閱：記錄訂閱者，並寄歡迎信給訂閱者、通知信給管理者
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_TO = "kevin806161@gmail.com";
const FROM = "退休咖 <noreply@retirementplantw.com>";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "請輸入 Email" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email 格式不正確" });
  }

  try {
    // 寄歡迎信給訂閱者
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "歡迎訂閱退休咖理財報告 ☕",
      html: `
        <div style="font-family: sans-serif; max-width: 560px;">
          <h2 style="color:#1d6fd8;">感謝訂閱退休咖！</h2>
          <p>你已成功訂閱退休咖的每週理財報告。</p>
          <p>之後我們會定期寄送最新的 ETF 動態、退休規劃技巧與實用理財知識到你的信箱。</p>
          <p>現在就先來試算你的退休金缺口吧：</p>
          <p><a href="https://retirementplantw.com/tools" style="color:#1d6fd8;">前往免費 AI 試算工具 →</a></p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
          <p style="font-size:12px;color:#999;">如不想再收到此類信件，可回覆本信告知取消訂閱。</p>
        </div>
      `,
    });

    // 通知管理者有新訂閱
    await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      subject: `[退休咖] 新訂閱者：${email}`,
      html: `<p>新的電子報訂閱者：<strong>${email}</strong></p><p>時間：${new Date().toLocaleString("zh-TW")}</p>`,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("訂閱錯誤:", err);
    return res.status(500).json({ error: "訂閱失敗，請稍後再試" });
  }
}
