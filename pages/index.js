import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";
import RetirementCalculator from "../components/RetirementCalculator";
import BookList from "../components/BookList";
import AdUnit from "../components/AdUnit";
import { adsenseConfig } from "../lib/affiliateLinks";
import { getAllArticles } from "../lib/articles";

const HOME_TOOLS = [
  { href: "/tools/advanced-calculator", icon: "🧮", label: "進階退休試算", badge: "最熱門" },
  { href: "/tools/labor-insurance", icon: "🏛️", label: "勞保年金試算", badge: "台灣專屬" },
  { href: "/tools/fire-calculator", icon: "🔥", label: "FIRE 財務自由", badge: "新增" },
  { href: "/tools/compound-interest", icon: "📈", label: "複利成長試算", badge: null },
  { href: "/tools/etf-dividend", icon: "💰", label: "ETF 配息試算", badge: null },
  { href: "/tools/couple-calculator", icon: "💑", label: "夫妻退休試算", badge: "雙人" },
  { href: "/tools/dca-vs-lumpsum", icon: "⚖️", label: "定期定額 vs 單筆", badge: null },
];

function ShieldLogo({ size = 34 }) {
  return (
    <svg width={size} height={(size * 42) / 40} viewBox="0 0 40 42" fill="none" aria-hidden="true" style={{ display: "block", filter: "drop-shadow(0 3px 10px rgba(212,169,90,.28))" }}>
      <path d="M20 3 L34 8.5 V22 C34 31.5 27.5 37.5 20 40 C12.5 37.5 6 31.5 6 22 V8.5 Z" fill="none" stroke="#d4a95a" strokeWidth="2" />
      <path d="M13 24 Q19 24 22 19 T29 13" fill="none" stroke="#ecc776" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="29" cy="13" r="2.7" fill="#ecc776" />
    </svg>
  );
}

export default function Home({ articles }) {
  const heroCanvasRef = useRef(null);

  // 互動式成長曲線 hero 背景
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    const host = canvas.parentNode;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, raf = 0;
    const mouse = { x: -9999, y: -9999, active: false };
    let mx = -9999, my = -9999;

    function resize() {
      W = host.clientWidth; H = host.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e) {
      const r = host.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true;
    }
    function onLeave() { mouse.active = false; }
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    const layers = [
      { color: "236,199,118", op: 0.85, amp: 26, freq: 1.05, speed: 0.00042, base: 0.30, lw: 2.2, glow: true },
      { color: "212,169,90", op: 0.55, amp: 32, freq: 0.85, speed: 0.00034, base: 0.46, lw: 1.6, glow: false },
      { color: "90,113,132", op: 0.55, amp: 38, freq: 0.70, speed: 0.00028, base: 0.62, lw: 1.4, glow: false },
      { color: "44,71,99", op: 0.75, amp: 44, freq: 0.60, speed: 0.00022, base: 0.78, lw: 1.2, glow: false },
    ];
    const STEP = 12, RADIUS = 150;

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      if (mouse.active) {
        if (mx < -999) { mx = mouse.x; my = mouse.y; }
        mx += (mouse.x - mx) * 0.12; my += (mouse.y - my) * 0.12;
      } else { my += (H * 1.4 - my) * 0.06; }

      for (let li = 0; li < layers.length; li++) {
        const L = layers[li];
        const pts = [];
        for (let x = -STEP; x <= W + STEP; x += STEP) {
          const nx = x / W;
          const trend = -nx * H * 0.20;
          const wave = Math.sin(nx * 6.2 * L.freq + t * L.speed * 1000) * L.amp
            + Math.sin(nx * 3.1 * L.freq - t * L.speed * 620) * (L.amp * 0.5);
          let y = H * L.base + trend + wave;
          if (mouse.active || mx > -999) {
            const dx = x - mx;
            const infl = Math.exp(-(dx * dx) / (2 * RADIUS * RADIUS));
            y -= infl * 70 * (1 - li * 0.16);
          }
          pts.push([x, y]);
        }
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length - 1; i++) {
          const xc = (pts[i][0] + pts[i + 1][0]) / 2;
          const yc = (pts[i][1] + pts[i + 1][1]) / 2;
          ctx.quadraticCurveTo(pts[i][0], pts[i][1], xc, yc);
        }
        const grad = ctx.createLinearGradient(0, 0, W, 0);
        grad.addColorStop(0, `rgba(${L.color},0)`);
        grad.addColorStop(0.18, `rgba(${L.color},${L.op * 0.6})`);
        grad.addColorStop(0.7, `rgba(${L.color},${L.op})`);
        grad.addColorStop(1, `rgba(${L.color},${L.op * 0.85})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = L.lw;
        ctx.lineCap = "round";
        if (L.glow) { ctx.shadowColor = `rgba(${L.color},.7)`; ctx.shadowBlur = 14; } else { ctx.shadowBlur = 0; }
        ctx.stroke();
        ctx.shadowBlur = 0;
        if (L.glow) {
          const head = pts[pts.length - 2];
          ctx.beginPath();
          ctx.arc(head[0], head[1], 3.4, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(236,199,118,1)";
          ctx.shadowColor = "rgba(236,199,118,.9)"; ctx.shadowBlur = 18;
          ctx.fill(); ctx.shadowBlur = 0;
        }
      }
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll(".reveal-up"));
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("reveal-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>退休咖 | 免費退休金與資產配置 AI 試算</title>
        <meta name="description" content="退休咖 RetirementPlan TW — 免費 AI 退休試算工具。輸入現況，即時分析退休缺口、資產配置比例與每月需存金額。" />
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 42'%3E%3Cpath d='M20 3 L34 8.5 V22 C34 31.5 27.5 37.5 20 40 C12.5 37.5 6 31.5 6 22 V8.5 Z' fill='%230a1622' stroke='%23d4a95a' stroke-width='2'/%3E%3Cpath d='M13 24 Q19 24 22 19 T29 13' fill='none' stroke='%23ecc776' stroke-width='2.4' stroke-linecap='round'/%3E%3Ccircle cx='29' cy='13' r='2.6' fill='%23ecc776'/%3E%3C/svg%3E" />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <ShieldLogo />
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            退休咖
            <span style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: ".24em", color: "var(--gold)", marginTop: "5px", fontWeight: 400 }}>RETIREMENTPLAN&nbsp;TW</span>
          </span>
        </Link>
        <div className="nav-links">
          <a href="#calc">試算工具</a>
          <Link href="/tools">所有工具</Link>
          <Link href="/articles">理財知識</Link>
          <Link href="/about">關於我們</Link>
          <Link href="/contact">聯絡我們</Link>
        </div>
      </nav>

      <section className="hero">
        <canvas ref={heroCanvasRef} className="hero-canvas" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-badge reveal-up">AI 驅動 · 免費使用</div>
          <h1 className="reveal-up" style={{ "--d": ".08s" }}>
            <span className="shine">打造你的退休財務藍圖</span>
            <br />
            <span className="serif-i">從今天開始</span>
          </h1>
          <p className="hero-sub reveal-up" style={{ "--d": ".16s" }}>
            輸入你的現況，AI 幫你分析退休缺口、資產配置比例，以及每月需要存多少錢
          </p>
          <div className="hero-cta reveal-up" style={{ "--d": ".24s" }}>
            <a href="#calc" className="cta-gold">開始免費試算</a>
            <Link href="/tools" className="cta-ghost">看所有工具</Link>
          </div>
        </div>
      </section>

      {/* 工具入口（全部保留） */}
      <section className="home-tools">
        <div className="home-tools-head reveal-up">
          <div>
            <div className="eyebrow">AI TOOLKIT</div>
            <h2>AI 計算工具集</h2>
          </div>
          <Link href="/tools" className="more-link">查看全部 →</Link>
        </div>
        <div className="home-tools-grid">
          {HOME_TOOLS.map((tool, i) => (
            <Link key={tool.href} href={tool.href} className="home-tool reveal-up" style={{ "--d": `${i * 0.05}s` }}>
              <span className="home-tool-ic">{tool.icon}</span>
              <span className="home-tool-label">{tool.label}</span>
              {tool.badge && <span className="home-tool-badge">{tool.badge}</span>}
            </Link>
          ))}
        </div>
      </section>

      <div id="calc" className="reveal-up">
        <RetirementCalculator />
      </div>

      {/* 計算結果下方廣告版位 */}
      <div style={{ padding: "20px 28px", maxWidth: "1180px", margin: "0 auto" }} className="reveal-up">
        <AdUnit slot={adsenseConfig.slots.belowCalculator} />
      </div>

      <section className="home-articles">
        <div className="home-articles-head reveal-up">
          <div>
            <div className="eyebrow">INSIGHTS</div>
            <h2>最新理財知識文章</h2>
          </div>
          <Link href="/articles" className="more-link">查看所有文章 →</Link>
        </div>
        <div className="home-articles-grid">
          {articles.slice(0, 3).map((article, i) => (
            <Link href={`/articles/${article.slug}`} key={article.slug} className="home-article reveal-up" style={{ "--d": `${i * 0.09}s` }}>
              <div className="home-article-title">{article.title}</div>
              <div className="home-article-desc">{article.description}</div>
            </Link>
          ))}
        </div>
      </section>

      <div id="books">
        <BookList />
      </div>

      {/* 文章內廣告版位 */}
      <div style={{ padding: "20px 28px", maxWidth: "1180px", margin: "0 auto" }} className="reveal-up">
        <AdUnit slot={adsenseConfig.slots.inArticle} />
      </div>

      <footer className="site-footer">
        <a href="/about">關於我們</a>
        <a href="/contact">聯絡我們</a>
        <a href="/privacy-policy">隱私權政策</a>
        <a href="/disclaimer">免責聲明</a>
      </footer>

      <style jsx>{`
        .hero { position: relative; }
        .hero-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; display: block; }
        .hero-inner { position: relative; z-index: 2; }
        .hero-glow {
          position: absolute; z-index: 0; top: -80px; left: 50%; transform: translateX(-50%);
          width: 620px; height: 520px; pointer-events: none;
          background: radial-gradient(closest-side, rgba(212,169,90,.20), transparent 70%);
          animation: heroFloat 16s ease-in-out infinite;
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateX(-50%) translateY(0) scale(1); }
          50% { transform: translateX(-50%) translateY(28px) scale(1.08); }
        }
        .hero-cta { display: flex; gap: 14px; justify-content: center; margin-top: 30px; flex-wrap: wrap; }
        .cta-gold, .cta-ghost {
          display: inline-flex; align-items: center; padding: 13px 26px; border-radius: 12px;
          font-size: 15px; font-weight: 700; text-decoration: none; white-space: nowrap;
          transition: transform .25s, box-shadow .25s, border-color .25s, background .25s;
        }
        .cta-gold {
          background: linear-gradient(180deg, var(--gold2), var(--gold)); color: #1a1206;
          box-shadow: 0 14px 34px -14px rgba(212,169,90,.6);
        }
        .cta-gold:hover { transform: translateY(-3px); box-shadow: 0 22px 48px -14px rgba(212,169,90,.82); }
        .cta-ghost { border: 1px solid rgba(212,169,90,.4); color: var(--cream); font-weight: 500; }
        .cta-ghost:hover { border-color: var(--gold); background: rgba(212,169,90,.08); }

        .eyebrow { font-family: var(--mono); font-size: 11px; letter-spacing: .24em; color: var(--gold); text-transform: uppercase; }
        .more-link { color: var(--gold); font-size: 14px; text-decoration: none; white-space: nowrap; }

        .home-tools { max-width: 1180px; margin: 0 auto; padding: 56px 28px; border-top: 1px solid var(--line2); }
        .home-tools-head, .home-articles-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin-bottom: 26px; }
        .home-tools-head h2, .home-articles-head h2 { font-size: 26px; font-weight: 900; color: var(--cream); margin-top: 12px; }
        .home-tools-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 14px; }
        .home-tool {
          position: relative; display: flex; flex-direction: column; gap: 12px;
          background: var(--panel); border: 1px solid var(--line); border-radius: 16px;
          padding: 20px 18px; text-decoration: none; color: var(--cream);
          transition: transform .3s, border-color .3s, box-shadow .3s;
        }
        .home-tool:hover { transform: translateY(-8px); border-color: rgba(212,169,90,.55); box-shadow: 0 26px 50px -24px rgba(0,0,0,.8); }
        .home-tool-ic { width: 40px; height: 40px; display: grid; place-items: center; border-radius: 11px; background: rgba(212,169,90,.1); font-size: 21px; }
        .home-tool-label { font-size: 14px; font-weight: 700; color: var(--cream); }
        .home-tool-badge { position: absolute; top: 16px; right: 16px; font-size: 10px; font-weight: 700; color: #1a1206; background: var(--gold); padding: 2px 8px; border-radius: 6px; }

        .home-articles { max-width: 1180px; margin: 0 auto; padding: 56px 28px; border-top: 1px solid var(--line2); }
        .home-articles-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
        .home-article {
          display: block; background: var(--panel); border: 1px solid var(--line2);
          border-radius: 16px; padding: 22px; text-decoration: none; color: inherit;
          transition: transform .3s, border-color .3s;
        }
        .home-article:hover { transform: translateY(-8px); border-color: rgba(212,169,90,.4); }
        .home-article-title { font-family: var(--serif); font-size: 18px; font-weight: 700; color: var(--cream); line-height: 1.5; margin-bottom: 10px; }
        .home-article-desc { font-size: 13.5px; color: var(--slate2); line-height: 1.75; }

        @media (max-width: 560px) {
          .home-tools-head, .home-articles-head { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const articles = getAllArticles();
  return {
    props: { articles },
  };
}
