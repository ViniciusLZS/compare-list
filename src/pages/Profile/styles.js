import styled from 'styled-components';

export const Container = styled.section`
  padding-top: 14rem;
  max-width: 60rem;
  margin: 0 auto;

  h1 {
    font-size: 2rem;
    font-weight: 500;
  }
`;

export const Content = styled.div`
  margin-top: 10rem;

  display: flex;
  flex-direction: column;
  gap: 4rem;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.default.black};
  }
`;
