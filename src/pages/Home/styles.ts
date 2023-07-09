import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;

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
  margin-top: 5rem;
`;
