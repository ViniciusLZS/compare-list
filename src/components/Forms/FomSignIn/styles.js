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

export const PasswordRescue = styled.div`
  max-width: 50rem;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: end;

  padding: 2rem 1rem 0rem 1rem;

  font-size: 1.2rem;
`;

export const ContainerSignUp = styled.div`
  margin-top: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.default.black};;
  }

  .signUp {
    padding: 1rem 3rem;
    border-radius: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.primary.dark};

    p {
      text-align: center;
      font-size: 1.4rem;
    }
  }
`;
