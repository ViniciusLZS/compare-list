import styled, { css } from 'styled-components';
import { InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'ref'> {
  placeholder: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled: boolean;
}
export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  span {
    padding-left: 1rem;
    color: ${({ theme }) => theme.colors.gray[200]};
  }

 .eye {
    position: absolute;
    bottom: 1.4rem;
    right: 1.5rem;

    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    background: transparent;
    border: none;
  }
`;

export const Input = styled.input<InputProps>`
  width: 100%;
  background: ${({ theme }) => theme.colors.default.white};
  border: transparent;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  height: 50px;
  border-radius: 10px;
  outline: none;
  padding-left: 2rem;
  padding-right: 2rem;
  font-size: 1.6rem;
  transition: border-color 0.2s ease-in;
  appearance: none;


  &::placeholder {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.gray[200]};
  }


  &:focus, &:hover {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.light};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.light};
  }

  ${({ type }) => (type === 'text' || type === 'password') && css`
    padding-left: 2rem;
    padding-right: 4rem;
  `}

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `}

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};
  }

  @media(min-width: 700px){
    &::placeholder {
      font-size: 1.6rem;
    }
  }
`;
