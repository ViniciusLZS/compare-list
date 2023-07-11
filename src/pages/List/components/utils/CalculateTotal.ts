import CleanMask from '../../../../utils/cleanMask';

interface CalculateTotalProps {
  value: string;
  amount: string;
  measureName: string;
}

export default function CalculateTotal({ value, amount, measureName }: CalculateTotalProps) {
  if (measureName === 'unid.') {
    const calc = Number(CleanMask(value)) * Number(amount);
    return calc.toString();
  }

  return CleanMask(value).toString();
}
