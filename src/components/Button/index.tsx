/* eslint-disable react/require-default-props */
import { ReactNode } from 'react';

import * as S from './styles';

import Spinner from '../Spinner';

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'transparent';
  danger?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
}

export default function Button({
  children,
  disabled = false,
  isLoading = false,
  onClick,
  variant = 'default',
  danger = false,
  type = undefined,
  className,
}: ButtonProps) {
  return (
    <S.StyledButton
      onClick={onClick}
      disabled={disabled || isLoading}
      variant={variant}
      danger={danger}
      type={type}
      className={className}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </S.StyledButton>
  );
}
