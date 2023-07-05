import { useEffect, useState } from 'react';

export default function useProgressBar({ list }: {list: {estimated: number, total: number}}) {
  const [percentege, setPercentege] = useState(0);

  const valueTotal = list.total;

  const numberWithoutLastDigits = Number(list.estimated.toString());

  useEffect(() => {
    setPercentege((valueTotal / numberWithoutLastDigits) * 100);
  }, [valueTotal, numberWithoutLastDigits]);

  return { percentege, valueTotal, numberWithoutLastDigits };
}
