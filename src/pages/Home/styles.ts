import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;

  span {
    position: relative;
    margin-top: 2rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray[200]};

    &::before {
      position: absolute;
      left: -14rem;
      bottom: 0.8rem;

      display: inline-block;
      content: '';
      width: 12rem;
      height: 0.2rem;
      background: ${({ theme }) => theme.colors.gray[200]};
    }

    &::after {
      position: absolute;
      right: -14rem;
      bottom: 0.8rem;

      display: inline-block;
      content: '';
      width: 12rem;
      height: 0.2rem;
      background: ${({ theme }) => theme.colors.gray[200]};
    }
  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 15rem;
    gap: 5rem;
    width: 100%;
    max-width: 50rem;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5rem;
    width: 100%;
    text-decoration: none;
  }

  @media(min-width: 700px) {
    margin-top: 20rem;
  }
`;

export const ContainerGoogle = styled.div`
  margin-top: 2rem;
`;
