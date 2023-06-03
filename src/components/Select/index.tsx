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
  optionsSelect: Measure[];
  optionId: string;
  setOptionId: (value: string) => void;
  handleSubmitOptions?: () => void;
}

export default function Select({
  label, placeholder, disabled = false, optionsSelect, optionId, setOptionId, handleSubmitOptions,
}: SelectProps) {
  function handleOptions(event: ChangeEvent<HTMLSelectElement>) {
    setOptionId(event.target.value);
  }

  const handleSubmitOption = () => {
    if (handleSubmitOptions && optionId) {
      handleSubmitOptions();
    }
  };
  handleSubmitOption();

  return (
    <S.Label>
      <span>{label}</span>
      <S.Select
        disabled={disabled}
        value={optionId}
        onChange={(event) => handleOptions(event)}
      >
        <option value="">{placeholder}</option>

        {optionsSelect.map((options) => (
          <option value={options.id} key={options.id}>{options.name}</option>
        ))}
      </S.Select>
    </S.Label>
  );
}
