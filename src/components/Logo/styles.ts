import styled from 'styled-components';

export const Container = styled.header`
  position: fixed;
  width: 100%;
  max-width: 98rem;
  z-index: 100;
  left: 50%;
  transform: translateX(-50%);

  padding-top: 2rem;
  padding-bottom: 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: ${({ theme }) => theme.colors.primary.lighter};
`;

export const Logo = styled.div`
  background: transparent;
  border: none;
`;

export const Arrow = styled.button`
  background: transparent;
  border: none;
  margin-left: 2rem;
`;

export const Menu = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 2rem;
`;
