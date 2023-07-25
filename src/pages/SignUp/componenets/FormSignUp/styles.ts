import styled from 'styled-components';

export const Container = styled.section`
  padding-top: 14rem;
  padding-bottom: 1rem;
  max-width: 60rem;
  margin: 0 auto;

  h1 {
    font-size: 2rem;
    font-weight: 500;
  }
`;

export const PasswordRequirements = styled.div`
  width: 100%;
  padding: 2rem 5rem 0 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div {
    display: flex;
    align-items: center;
    gap: 1rem;

    span {
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }

  img {
    max-width: 1.6rem;
  }
`;
