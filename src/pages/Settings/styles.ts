import styled from 'styled-components';

export const Container = styled.section`
  padding-top: 14rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;


`;

export const Content = styled.section`
  margin-top: 5rem;
  padding: 2rem;
  height: 100%;
  width: 100%;
  max-width: 65rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  border-radius: 2rem;
  background: white;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.default.black};
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;

    h2 {
      font-size: 1.5rem;
      font-weight: 500;
    }

    img {
      max-width: 2.5rem;
    }
  }
`;
