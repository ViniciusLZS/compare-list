/* eslint-disable react/require-default-props */
import { useState, ChangeEvent } from 'react';

import * as S from './styles';

import openEye from '../../assets/image/icons/openEye.svg';
import closeEye from '../../assets/image/icons/closeEye.svg';
import Spinner from '../Spinner';

interface InputProps {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled: boolean;
  maxLength?: number;
  isLoading?: boolean;
}

export default function Input({
  label, placeholder, type, value, onChange, error, disabled, maxLength, isLoading,
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
      {isLoading && <div className="spinner"><Spinner size={16} /></div>}

      {!isLoading && type === 'password' && (
        <button className="eye" type="button" onClick={() => handleEye()}>
          {eye
            ? <img src={openEye} alt="Olho para visualizar senha" />
            : <img src={closeEye} alt="Olho para não visualizar senha" />}
        </button>
      )}
    </S.Label>
  );
}
