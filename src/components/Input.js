import styled, { css } from 'styled-components';

export default styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.default.white};
  border: 2px solid ${({ theme }) => theme.colors.default.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  height: 52px;
  border-radius: 4px;
  outline: none;
  padding: 0 1.6rem;
  font-size: 1.6rem;
  transition: border-color 0.2s ease-in;
  appearance: none;

  &::placeholder {
    font-size: 1.2rem;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.light};
  }

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
