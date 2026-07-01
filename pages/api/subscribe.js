// pages/api/subscribe.js
// 目前先記錄 Email，之後可串接 Mailchimp 或電子豹

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
    console.log("📧 新訂閱 Email:", { email, timestamp: new Date().toISOString() });

    // TODO: 串接 Mailchimp 範例（取消註解並設定 Vercel 環境變數）:
    /*
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
    const MAILCHIMP_DC = process.env.MAILCHIMP_DC; // e.g. "us1"

    const response = await fetch(
      `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `apikey ${MAILCHIMP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
        }),
      }
    );
    if (!response.ok) {
      const data = await response.json();
      if (data.title === "Member Exists") {
        return res.status(200).json({ success: true, message: "已是訂閱者" });
      }
      throw new Error(data.detail);
    }
    */

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("訂閱錯誤:", err);
    return res.status(500).json({ error: "訂閱失敗，請稍後再試" });
  }
}
