export default function EstimateTile({ label, value, sub, color, positive = false }) {
  const currency = String(value).match(/^NT\$\s*(.*)$/);
  const tone = positive || color === "#2a7d2a" ? "positive" : color === "#ecc776" ? "accent" : "neutral";
  return (
    <div className={`estimate-tile estimate-tile--${tone}`}>
      <div className="estimate-tile-heading"><span>{label}</span>{currency && <span className="estimate-tile-unit">NT$</span>}</div>
      <div className="estimate-tile-value" aria-label={String(value)}>{currency ? currency[1] : value}</div>
      {sub && <div className="estimate-tile-note">{sub}</div>}
    </div>
  );
}
