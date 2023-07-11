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
  setOptionName?: (value: string) => void;
}

export default function Select({
  label,
  placeholder,
  disabled = false,
  optionsSelect,
  optionId,
  setOptionId,
  handleSubmitOptions,
  setOptionName,
}: SelectProps) {
  function handleOptions(event: ChangeEvent<HTMLSelectElement>) {
    setOptionId(event.target.value);

    const selectedOption = optionsSelect.find((option) => option.id === event.target.value);

    if (selectedOption && setOptionName) {
      setOptionName(selectedOption?.name);
    }
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
          <option
            value={options.id}
            key={options.id}
          >
            {options.name}

          </option>
        ))}
      </S.Select>
    </S.Label>
  );
}
