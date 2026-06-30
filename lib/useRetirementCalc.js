import { useState, useMemo } from "react";

export function useRetirementCalc() {
  const [age, setAge] = useState(35);
  const [retire, setRetire] = useState(65);
  const [income, setIncome] = useState(60000);
  const [saved, setSaved] = useState(500000);
  const [rate, setRate] = useState(6);

  const result = useMemo(() => {
    const r = rate / 100;
    const years = Math.max(retire - age, 1);
    const lifeAfter = 25;
    const monthlyNeed = income * 0.7;
    const totalTarget = monthlyNeed * 12 * lifeAfter;
    const savedGrow = saved * Math.pow(1 + r, years);
    const gap = Math.max(totalTarget - savedGrow, 0);

    const n = years * 12;
    const monthlyRate = r / 12;
    const monthlySave =
      monthlyRate > 0
        ? (gap * monthlyRate) / (Math.pow(1 + monthlyRate, n) - 1)
        : gap / n;

    const monthlyOut = totalTarget / (lifeAfter * 12);

    const youthFactor = Math.max(0, Math.min(1, (60 - age) / 40));
    const stockPct = Math.round(40 + youthFactor * 20);
    const bondPct = Math.round(50 - youthFactor * 20);
    const usPct = 100 - stockPct - bondPct;

    let tip = "";
    if (age < 35) {
      tip = "年紀尚輕，時間是你最大的資產，可以承擔較高風險，股票比例可拉高至 70%。";
    } else if (age < 50) {
      tip = "黃金積累期，建議股六債四，每月定期定額投入台美 ETF。";
    } else {
      tip = "接近退休，逐步調降股票比例，增加穩定配息資產，降低波動風險。";
    }

    return {
      years,
      lifeAfter,
      totalTarget,
      savedGrow,
      gap,
      monthlySave,
      monthlyOut,
      allocation: { stockPct, bondPct, usPct },
      tip,
    };
  }, [age, retire, income, saved, rate]);

  return {
    age, setAge,
    retire, setRetire,
    income, setIncome,
    saved, setSaved,
    rate, setRate,
    result,
  };
}
