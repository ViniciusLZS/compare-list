import styled from 'styled-components';

export const Header = styled.div`
  position: fixed;

  width: 100%;
  max-width: 98rem;
  padding-right: 2rem;
  margin-top: 7rem;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.primary.lighter};

  @media(min-width: 960px) {
    padding-left: 2rem;
  }
`;

export const Content = styled.div`
  padding-top: 21rem;
  padding-bottom: 8rem;
`;

export const ButtonContainer = styled.div`
  position: fixed;
  bottom: 0;

  width: 100%;
  max-width: 98rem;
  padding-right: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 2rem 0;

  button {
    width: 100%;
    max-width: 25rem;
  }
`;
