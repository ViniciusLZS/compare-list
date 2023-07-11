import styled from 'styled-components';

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  span {
    padding-left: 1rem;
    color: ${({ theme }) => theme.colors.gray[200]};
  }
`;

export const Select = styled.select`
  width: 100%;
  background: ${({ theme }) => theme.colors.default.white};
  border: transparent;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  height: 50px;
  border-radius: 10px;
  outline: none;
  padding-left: 1rem;
  padding-right: 1rem;
  text-align: center;
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
