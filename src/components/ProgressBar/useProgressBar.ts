import { useEffect, useState } from 'react';

export default function useProgressBar({ list }: {list: {estimated: number}}) {
  const [percentege, setPercentege] = useState(0);

  const valueTotal = 200;

  const numberWithoutLastDigits = Number(list.estimated.toString().slice(0, -2));

  useEffect(() => {
    setPercentege((valueTotal / numberWithoutLastDigits) * 100);
  }, [valueTotal, numberWithoutLastDigits]);

  return { percentege, valueTotal, numberWithoutLastDigits };
}
