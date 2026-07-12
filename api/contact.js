// pages/api/contact.js
// 聯絡表單：使用者填寫後，寄通知信到網站管理者信箱
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_TO = "kevin806161@gmail.com"; // 接收聯絡表單通知的信箱
const FROM = "退休咖 <noreply@retirementplantw.com>";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "所有欄位均為必填" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email 格式不正確" });
  }

  try {
    await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      replyTo: email, // 直接回覆會寄給填表者
      subject: `[退休咖] 新聯絡表單 - ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px;">
          <h2 style="color:#1d6fd8;">新的聯絡表單訊息</h2>
          <p><strong>姓名：</strong>${name}</p>
          <p><strong>Email：</strong>${email}</p>
          <p><strong>訊息：</strong></p>
          <p style="background:#f5f5f3;padding:12px;border-radius:8px;">${String(message).replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("聯絡表單錯誤:", err);
    return res.status(500).json({ error: "伺服器錯誤，請稍後再試" });
  }
}
