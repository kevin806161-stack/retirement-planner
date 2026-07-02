import { useState } from "react";

export default function EmailSubscribe({ variant = "default" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

  async function handleSubscribe() {
    if (!email) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={`subscribe-box ${variant}`}>
        <div className="success">✅ 訂閱成功！感謝你，我們會定期寄送最新理財知識。</div>
      </div>
    );
  }

  return (
    <div className={`subscribe-box ${variant}`}>
      <div className="subscribe-icon">📬</div>
      <h3>訂閱每週理財報告</h3>
      <p>最新 ETF 動態、退休規劃技巧，每週直送信箱，免費訂閱</p>
      <div className="subscribe-row">
        <input
          type="email"
          placeholder="輸入你的 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
        />
        <button onClick={handleSubscribe} disabled={status === "sending"}>
          {status === "sending" ? "訂閱中..." : "免費訂閱"}
        </button>
      </div>
      {status === "error" && <p className="err">訂閱失敗，請稍後再試</p>}
      <p className="note">不發垃圾信，隨時可取消訂閱</p>
    </div>
  );
}
