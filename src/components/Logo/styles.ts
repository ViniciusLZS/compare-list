import styled from 'styled-components';

export const Container = styled.header`
  position: fixed;
  width: 100%;
  max-width: 98rem;
  padding-right: 2rem;

  z-index: 100;

  padding-top: 2rem;
  padding-bottom: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background: ${({ theme }) => theme.colors.primary.lighter};
`;

export const Arrow = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  top: 3rem;
  left: 0;
`;
