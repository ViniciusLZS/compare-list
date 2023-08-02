import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 53rem;

  display: flex;
  align-items: center;
  padding: 0 1rem;

  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  overflow-x: scroll;
  white-space: nowrap;


  @media(min-width: 500px) {
    overflow-x: hidden;
    }
`;

export const Input = styled.input`
  width: 100%;
  height: 35px;
  padding: 0 1rem;
  
  background: ${({ theme }) => theme.colors.default.white};
  border: transparent;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 10px;

  outline: none;
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
