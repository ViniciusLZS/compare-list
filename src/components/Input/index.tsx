/* eslint-disable react/require-default-props */
import { useState, ChangeEvent } from 'react';

import * as S from './styles';

import openEye from '../../assets/image/icons/openEye.svg';
import closeEye from '../../assets/image/icons/closeEye.svg';

interface InputProps {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled: boolean;
  maxLength?: number;
}

export default function Input({
  label, placeholder, type, value, onChange, error, disabled, maxLength,
}: InputProps) {
  const [eye, setEye] = useState(false);

  function handleEye() {
    setEye(
      (prevState) => !prevState,
    );
  }
  return (
    <S.Label>
      <span>{label}</span>
      <S.Input
        onChange={onChange}
        value={value}
        type={eye ? 'text' : type}
        placeholder={placeholder}
        error={error}
        disabled={disabled}
        maxLength={maxLength}
      />
      {type === 'password' && (
        <button className="eye" type="button" onClick={() => handleEye()}>
          {eye
            ? <img src={openEye} alt="Olho para visualizar senha" />
            : <img src={closeEye} alt="Olho para não visualizar senha" />}
        </button>
      )}
    </S.Label>
  );
}
