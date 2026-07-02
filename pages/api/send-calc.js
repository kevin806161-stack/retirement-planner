// pages/api/send-calc.js
// 把試算結果寄到使用者信箱

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, result } = req.body;
  if (!email || !result) return res.status(400).json({ error: "缺少必要欄位" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return res.status(400).json({ error: "Email 格式不正確" });

  const {
    age, retire, income, saved, rate,
    totalTarget, savedGrow, gap, monthlySave, monthlyOut,
    allocation,
  } = result;

  const fmt = (n) => "NT$ " + Math.round(n).toLocaleString("zh-TW");

  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #fafaf8; border-radius: 12px;">
      <h2 style="font-size: 22px; color: #1a1a1a; margin-bottom: 4px;">你的退休金試算結果</h2>
      <p style="color: #666; font-size: 14px; margin-bottom: 28px;">由 退休咖 retirementplantw.com 產生</p>

      <div style="background: #fff; border: 1px solid #e5e5e0; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
        <div style="text-align: center; padding-bottom: 16px; border-bottom: 1px solid #e5e5e0; margin-bottom: 16px;">
          <p style="font-size: 12px; color: #888; margin: 0 0 6px;">退休後每月可用金額（估算）</p>
          <p style="font-size: 30px; font-weight: 700; color: #1d6fd8; margin: 0;">${fmt(monthlyOut)}</p>
        </div>

        <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #666;">目前年齡</td><td style="text-align: right; font-weight: 600;">${age} 歲</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">退休年齡</td><td style="text-align: right; font-weight: 600;">${retire} 歲</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">目前月收入</td><td style="text-align: right; font-weight: 600;">${fmt(income)}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">已存退休金</td><td style="text-align: right; font-weight: 600;">${fmt(saved)}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">預期年報酬率</td><td style="text-align: right; font-weight: 600;">${rate}%</td></tr>
          <tr style="border-top: 1px solid #eee;"><td style="padding: 10px 0 6px; color: #666;">退休目標總額</td><td style="text-align: right; font-weight: 600; padding-top: 10px;">${fmt(totalTarget)}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">現有資產成長後</td><td style="text-align: right; font-weight: 600;">${fmt(savedGrow)}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">退休缺口</td><td style="text-align: right; font-weight: 600; color: ${gap > 0 ? '#b07a0b' : '#2a7d2a'};">${gap > 0 ? fmt(gap) : '無缺口 ✓'}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">每月需額外儲蓄</td><td style="text-align: right; font-weight: 600; color: #2a7d2a;">${gap > 0 ? fmt(monthlySave) : '目標已達成'}</td></tr>
        </table>
      </div>

      <div style="background: #fff; border: 1px solid #e5e5e0; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
        <p style="font-size: 13px; font-weight: 600; margin: 0 0 12px;">建議資產配置</p>
        <p style="font-size: 13px; margin: 4px 0;">🇹🇼 台股 ETF：<strong>${allocation.stockPct}%</strong></p>
        <p style="font-size: 13px; margin: 4px 0;">🏦 債券 / 現金：<strong>${allocation.bondPct}%</strong></p>
        <p style="font-size: 13px; margin: 4px 0;">🇺🇸 美股 ETF：<strong>${allocation.usPct}%</strong></p>
      </div>

      <p style="font-size: 12px; color: #999; line-height: 1.6;">
        本試算結果為概略估算，不構成投資建議。實際退休規劃請參考勞保局個人試算，並諮詢合格財務顧問。<br><br>
        <a href="https://retirementplantw.com" style="color: #1d6fd8;">retirementplantw.com</a>
      </p>
    </div>
  `;

  try {
    console.log("📊 試算結果寄送請求:", { email, age, retire });

    // TODO: 取消註解並設定 RESEND_API_KEY 環境變數即可啟用寄信
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'noreply@retirementplantw.com',
      to: email,
      subject: '你的退休金試算結果 | 退休咖',
      html,
    });
    */

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("寄送失敗:", err);
    return res.status(500).json({ error: "寄送失敗" });
  }
}
