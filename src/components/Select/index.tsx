/* eslint-disable react/require-default-props */
import { ChangeEvent } from 'react';
import * as S from './styles';

interface Measure {
  id: string;
  name: string;
}

interface SelectProps {
  label: string;
  placeholder: string;
  disabled?: boolean
  measures: Measure[];
  measuresId: string;
  setMeasuresId: (value: string) => void;
}

export default function Select({
  label, placeholder, disabled = false, measuresId, setMeasuresId, measures,
}: SelectProps) {
  function handleMeasure(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setMeasuresId(value);
  }

  return (
    <S.Label>
      <span>{label}</span>
      <S.Select
        disabled={disabled}
        value={measuresId}
        onChange={(event) => handleMeasure(event)}
      >
        <option value="">{placeholder}</option>

        {measures.map((measure) => (
          <option value={measure.id} key={measure.id}>{measure.name}</option>
        ))}
      </S.Select>
    </S.Label>
  );
}
