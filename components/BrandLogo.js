export function BrandMark({ className = "", size = 44 }) {
  return (
    <svg className={`brand-mark ${className}`} width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
      <path d="M9 22h26v9c0 7-5 11-13 11S9 38 9 31v-9Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M35 24h3a5 5 0 0 1 0 10h-4M5 45h34M5 18h35M13 14a9 9 0 0 1 18 0M22 2v3M6 8l3 3M38 8l-3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export default function BrandLogo({ compact = false }) {
  return (
    <span className={`brand-logo ${compact ? "brand-logo--compact" : ""}`}>
      <BrandMark />
      <span className="brand-wordmark">
        <span className="brand-name">退休咖</span>
        {!compact && <span className="brand-caption">RETIREMENTPLAN TW</span>}
      </span>
    </span>
  );
}
