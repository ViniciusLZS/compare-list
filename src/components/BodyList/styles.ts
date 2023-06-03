import styled, { css } from 'styled-components';

interface ContainerProps {
  view: string;
}
export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 70rem;
  margin: 0 auto;
  gap: 2rem;

  ${({ view }) => view === 'grid' && css`
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;

    @media(max-width: 340px) {
      display: flex;
      flex-direction: column;
    }
  `}
`;

export const ErrorContainer = styled.div`
  height: 50rem;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;


  .details {
    margin-left: 24px;

    strong {
      font-size: 22px;
      color: ${({ theme }) => theme.colors.danger.main};
      display: block;
      margin-bottom: 8px;
    }
  }
`;

export const EmptyList = styled.div`
  width: 100%;
  height: 42rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  p {
    margin: 0 2rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[200]};

    strong {
      color: ${({ theme }) => theme.colors.primary.dark};
    }
  }
`;

interface CardProps {
  view: string;
}

export const Card = styled.div<CardProps>`
  width: 100%;
  max-height: 12rem;
  max-width: 60rem;
  background: ${({ theme }) => theme.colors.default.white};
  border-radius: 1rem;

  &:hover {
    box-shadow: 0px 5px 15px ${({ theme }) => theme.colors.primary.dark};
  }

  ${({ view }) => view === 'grid' && css`
    width: 100%;
    max-width: 15rem;
    max-height: 25rem;

    @media(max-width: 340px) {
      width: 100%;
      max-height: 12rem;
      max-width: 60rem;
    }
  `}
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
`;

interface TitleProps {
  view: string;
}

export const Title = styled.h2<TitleProps>`
  position: absolute;
  top: 0;
  left: 53%;
  transform: translateX(-50%);

  width: 100%;
  max-width: 24rem;
  max-height: 4rem;
  font-size: 2rem;
  font-weight: 100;
  padding: 0.2rem;
  text-align: center;
  overflow-x: scroll;
  white-space: nowrap;

  &::-webkit-scrollbar{
        height: 5px;
      }
      &::-webkit-scrollbar-thumb{
        background: ${({ theme }) => theme.colors.primary.dark};
      }

  @media(min-width: 700px) {
    max-width: 45rem;
    overflow-x: hidden;
    white-space: nowrap;
  }

  @media(max-width: 340px) {
    font-size: 1.5rem;
    max-width: 19rem;
  }

  ${({ view }) => view === 'grid' && css`
    font-size: 1.5rem;
    left: 50%;

    @media(min-width: 700px) {
      max-width: 45rem;
      overflow-x: scroll;
      white-space: nowrap;
    }
  `}
`;

interface ImageProps {
  view: string;
}

export const Image = styled.div<ImageProps>`
  max-width: 15rem;
  max-height: 10rem;

  img {
    width: 100%;
    height: 100%;
  }

  ${({ view }) => view === 'grid' && css`
    max-width: 10rem;
    max-height: 8rem;
    position: absolute;
    top: 4rem;

    @media(max-width: 340px) {
      position: initial;
    }
  `}
`;

interface ContainerValueProps {
  view: string;
}

export const ContainerValue = styled.div<ContainerValueProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  margin-top: 4rem;
  margin-bottom: 1rem;
  width: 24rem;

  span {
    max-width: 10rem;
    font-size: 1.3rem;
    overflow-wrap: break-word;
  }

  @media(min-width: 700px) {
    gap: 2rem;
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

  ${({ view }) => view === 'grid' && css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 12rem;

    @media(max-width: 340px) {
      display: flex;
      flex-direction: row;
      margin-top: 3rem;
    }
  `}
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
