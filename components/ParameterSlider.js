import { useId } from "react";

export default function ParameterSlider({ id, label, value, min, max, step = 1, unit, fmtVal, onChange }) {
  const generatedId = useId();
  const inputId = id || `parameter-${generatedId}`;
  const format = number => fmtVal ? fmtVal(number) : `${number}${unit || ""}`;
  const progress = max > min ? Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100)) : 0;

  return (
    <div className="parameter-control">
      <div className="parameter-label">
        <label htmlFor={inputId}>{label}</label>
        <output className="parameter-value" htmlFor={inputId}>{format(value)}</output>
      </div>
      <div className="parameter-track">
        <input
          id={inputId}
          className="professional-range"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={label}
          aria-valuetext={format(value)}
          style={{ "--range-progress": `${progress}%` }}
          onChange={event => onChange(parseFloat(event.target.value))}
        />
      </div>
      <div className="parameter-scale" aria-hidden="true"><span>{format(min)}</span><span>{format(max)}</span></div>
    </div>
  );
}
