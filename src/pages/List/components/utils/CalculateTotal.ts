import CleanMask from '../../../../utils/cleanMask';

interface CalculateTotalProps {
  value: string;
  amount?: string;
}

export default function CalculateTotal({ value, amount }: CalculateTotalProps) {
  const calc = Number(CleanMask(value)) * Number(amount);
  return calc.toString();
}
