export default function EstimateRow({ label, value, highlight, warn, good }) {
  const tone = warn ? "warning" : good ? "positive" : highlight ? "accent" : "neutral";
  return <dl className={`estimate-row estimate-row--${tone}`}><dt>{label}</dt><dd>{value}</dd></dl>;
}
