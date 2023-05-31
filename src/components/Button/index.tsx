/* eslint-disable react/require-default-props */
import { ReactNode } from 'react';

import * as S from './styles';

import Spinner from '../Spinner';

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  handleClick?: () => void;
  variant?: 'default' | 'transparent';
  danger?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export default function Button({
  children,
  disabled = false,
  isLoading = false,
  handleClick,
  variant = 'default',
  danger = false,
  type = undefined,
}: ButtonProps) {
  return (
    <S.StyledButton
      onClick={handleClick}
      disabled={disabled || isLoading}
      variant={variant}
      danger={danger}
      type={type}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </S.StyledButton>
  );
}
