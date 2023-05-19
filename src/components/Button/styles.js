import styled, { css } from 'styled-components';

const buttonVariants = {
  default: css`
    background: ${({ theme }) => theme.colors.primary.light};
  `,
  transparent: css`
    background: ${({ theme }) => theme.colors.primary.lighter};
  `,
};

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  width: 100%;
  max-width: 50rem;
  padding: 0 1.6rem;
  color: ${({ theme }) => theme.colors.default.black};
  font-size: 1.6rem;
  border: 2px solid ${({ theme }) => theme.colors.primary.light};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;

  ${({ variant }) => buttonVariants[variant] || buttonVariants.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.main};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    background: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.gray[200]};
    border-color: ${({ theme }) => theme.colors.gray[100]};
    cursor: default;
  }
`;
