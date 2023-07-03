import styled, { css } from 'styled-components';

interface ContainerProps {
  view: string;
}
export const Container = styled.div<ContainerProps>`
  max-width: 70rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  gap: 2rem;

  ${({ view }) => view === 'grid' && css`
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
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
  max-height: 14rem;
  max-width: 60rem;
  background: ${({ theme }) => theme.colors.default.white};
  border-radius: 1rem;
  cursor: pointer;


  &:hover {
    box-shadow: 0px 5px 15px ${({ theme }) => theme.colors.primary.dark};
  }

  ${({ view }) => view === 'grid' && css`
    width: 100%;
    max-width: 15rem;
    max-height: 25rem;
  `}
`;

interface ContentProps {
  view: string;
}

export const Content = styled.div<ContentProps>`
  display: flex;
  justify-content: space-around;
  position: relative;
  margin: 0rem 2rem 0rem 1rem;

  button {
    display: flex;
    justify-content: space-around;
    background-color: transparent;
    border: none;
    width: 100%;

    ${({ view }) => view === 'grid' && css`
      justify-content: end;
      width: 100%;
      max-width: 12rem;
      max-height: 25rem;
    `}
  }
`;

interface TitleProps {
  view: string;
}

export const Title = styled.h2<TitleProps>`
  position: absolute;
  top: 0;
  left: 60%;
  transform: translateX(-50%);

  width: 100%;
  max-width: 24rem;
  max-height: 4rem;
  font-size: 1.5rem;
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
    left: 55%;
    max-width: 40rem;
    overflow-x: scroll;
    white-space: nowrap;

    ${({ view }) => view === 'grid' && css`
    font-size: 1.5rem;
    left: 50%;
  `}
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
  padding-top: 1rem;

  img {
    width: 100%;
    height: 100%;
    max-width: 8rem;
  }

  ${({ view }) => view === 'grid' && css`
    max-width: 10rem;
    max-height: rem;
    position: absolute;
    top: 4rem;
    padding-top: 0;

    img {
    width: 100%;
    height: 100%;
    max-width: 8rem;
    max-height: 7rem;
  }
  `}
`;

interface ContainerValueProps {
  view: string;
}

export const ContainerValue = styled.div<ContainerValueProps>`
  display: flex;
  align-items: end;
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
    justify-content: end;
  `}
`;

export const Trash = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
    margin-left: 1rem;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-color: transparent;
    border: none;
  }
`;
