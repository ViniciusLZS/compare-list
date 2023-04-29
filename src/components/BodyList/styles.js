import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;

  ${({ layout }) => layout === 'grid' && css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  `}
`;

export const Card = styled.div`
  width: 100%;
  max-height: 12rem;
  max-width: 60rem;
  background: ${({ theme }) => theme.colors.default.white};
  border-radius: 1rem;
  margin-top: 2rem;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
`;

export const Title = styled.div`
  position: absolute;
  top: 0;

  max-width: 10rem;
  font-size: 2rem;
  padding: 0.2rem;
  text-align: center;
`;

export const Image = styled.div`
  max-width: 15rem;
  max-height: 10rem;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const ContainerValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  margin-top: 4rem;
  margin-bottom: 1rem;
  width: 24rem;

  span {
    max-width: 10rem;
    overflow-wrap: break-word;
  }

  @media(min-width: 700px) {
    gap: 5rem;
    width: 40rem;
  }

  .values {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .total {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.6rem;
    background-color: ${({ theme }) => theme.colors.primary.lighter};
    border-radius: 0.5rem;
  }
`;

export const Trash = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;

  button {
    background-color: transparent;
    border: none;
  }
`;
