// pages/api/contact.js
// 目前用 console.log 記錄，之後可串接 Nodemailer 或 Resend 寄信
// 要真正收到信，在 Vercel 環境變數設定 EMAIL_TO，並整合 Resend/Nodemailer

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "所有欄位均為必填" });
  }

  // 基本 Email 格式驗證
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email 格式不正確" });
  }

  try {
    // TODO: 之後串接 Resend 寄信
    // 現在先 log 記錄，Vercel Function Logs 可以查到
    console.log("📬 新聯絡表單訊息:", {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // 之後串接 Resend 的範例程式碼（先保留，取消註解即可使用）:
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'noreply@retirementplantw.com',
      to: 'contact@retirementplantw.com',
      subject: `[退休 AI 規劃師] 新聯絡表單 - ${name}`,
      html: `
        <p><strong>姓名：</strong>${name}</p>
        <p><strong>Email：</strong>${email}</p>
        <p><strong>訊息：</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });
    */

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("聯絡表單錯誤:", err);
    return res.status(500).json({ error: "伺服器錯誤，請稍後再試" });
  }
}
