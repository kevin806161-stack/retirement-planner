import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Head>
        <title>聯絡我們 | 退休 AI 規劃師</title>
        <meta name="description" content="有任何問題、文章勘誤或合作洽詢，歡迎透過聯絡表單與退休 AI 規劃師聯繫。" />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>退休 AI 規劃師</Link>
        <div className="nav-links">
          <Link href="/#calc">試算工具</Link>
          <Link href="/tools">所有工具</Link>
          <Link href="/articles">理財知識</Link>
          <Link href="/about">關於我們</Link>
          <Link href="/contact">聯絡我們</Link>
        </div>
      </nav>

      <div className="contact-page">
        <h1>聯絡我們</h1>
        <p className="contact-sub">有任何問題、文章勘誤或合作洽詢，歡迎填寫表單，我們會在 2 個工作天內回覆。</p>

        {status === "success" ? (
          <div className="success-box">
            訊息已送出，我們會盡快回覆您。謝謝！
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">姓名 *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="請輸入您的姓名"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="請輸入您的 Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="message">訊息內容 *</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="請輸入您想詢問或反映的內容..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            {status === "error" && (
              <div className="error-box">送出失敗，請稍後再試或直接 Email 至 contact@retirementplantw.com</div>
            )}
            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "送出中..." : "送出訊息"}
            </button>
          </form>
        )}

        <div className="alt-contact">
          <p>也可以直接寄信至：<a href="mailto:contact@retirementplantw.com">contact@retirementplantw.com</a></p>
        </div>
      </div>

      <footer className="site-footer">
        <a href="/privacy-policy">隱私權政策</a>
        <a href="/disclaimer">免責聲明</a>
        <a href="/about">關於我們</a>
        <a href="/contact">聯絡我們</a>
      </footer>

      <style jsx>{`
        .contact-page {
          max-width: 600px;
          margin: 0 auto;
          padding: 48px 24px 80px;
        }
        h1 { font-size: 26px; font-weight: 700; margin-bottom: 8px; }
        .contact-sub { font-size: 14px; color: #6a7480; margin-bottom: 32px; line-height: 1.6; }
        .contact-form { display: flex; flex-direction: column; gap: 20px; }
        .field { display: flex; flex-direction: column; gap: 6px; }
        .field label { font-size: 13px; font-weight: 600; color: #26333f; }
        .field input, .field textarea {
          border: 1px solid rgba(15,33,48,0.25);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }
        .field input:focus, .field textarea:focus { border-color: #c9a24b; }
        .field textarea { resize: vertical; min-height: 120px; }
        button {
          background: #0f2130;
          color: #f2ecdf;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
          width: fit-content;
        }
        button:disabled { opacity: 0.6; cursor: not-allowed; }
        .success-box {
          background: rgba(201,162,75,0.1);
          border: 1px solid rgba(201,162,75,0.4);
          border-radius: 8px;
          padding: 20px;
          font-size: 15px;
          color: #7a5a1f;
        }
        .error-box {
          background: rgba(164,86,47,0.08);
          border: 1px solid rgba(164,86,47,0.4);
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 13px;
          color: #a4562f;
        }
        .alt-contact { margin-top: 32px; font-size: 13px; color: #6a7480; }
        .alt-contact a { color: #c9a24b; }
      `}</style>
    </>
  );
}
