import { useEffect, useState } from 'react';

export default function useProgressBar({ list }: {list: {estimated: number, total: number}}) {
  const [percentege, setPercentege] = useState(0);

  const valueTotal = list.total;

  const estimatedNumber = Number(list.estimated.toString());

  useEffect(() => {
    setPercentege((valueTotal / estimatedNumber) * 100);
  }, [valueTotal, estimatedNumber]);

  const exceededLimit = valueTotal > estimatedNumber;

  return {
    percentege,
    valueTotal,
    estimatedNumber,
    exceededLimit,
  };
}
