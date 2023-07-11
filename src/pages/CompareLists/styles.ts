import styled, { css } from 'styled-components';

export const Container = styled.section`
  height: 100%;
  padding-top: 5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 100%;
  max-width: 60rem;
  max-height: 12rem;
  padding: 3rem 1rem 1rem 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  position: fixed;
  top: 8rem;
  z-index: 10;

  background-color: ${({ theme }) => theme.colors.primary.lighter};
  box-shadow: 0 10px 10px 10px ${({ theme }) => theme.colors.primary.lighter};


  .listName {
    width: 100%;
    margin-top: 2rem;
    display: flex;
    justify-content: space-around;


    div {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 1rem;

      h2 {
        font-size: 1.8rem;
        font-weight: 500;
      }

      span {
        font-size: 1.3rem;
      }
    }
  }
`;

export const Content = styled.div`
  margin-top: 17rem;
  margin-bottom: 2rem;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`;

export const Card = styled.div`
  height: 100%;
  max-height: 20rem;
  min-height: 20rem;
  width: 100%;
  max-width: 60rem;

  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 0.5rem;

  background-color: ${({ theme }) => theme.colors.default.white};
  border-radius: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
`;

interface CardSmallProps {
  lowPrice?: string;
}

export const CardSmall = styled.div<CardSmallProps>`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  p {
    font-size: 1.3rem;
    text-align: center;
    margin: 1rem;
  }
`;

export const Title = styled.h3`
  width: 100%;
  max-height: 5.5rem;
  max-width: 13rem;

  font-size: 1.3rem;
  font-weight: 100;
  text-align: center;

  white-space: nowrap;
  overflow-x: scroll;

  &::-webkit-scrollbar{
        height: 0.5rem;
      }
  &::-webkit-scrollbar-thumb{
    background: ${({ theme }) => theme.colors.gray[100]};
  }

  @media(min-width: 600px) {
      max-width: 25rem;
      overflow-x: scroll;
      white-space: nowrap;
    }
`;

export const Image = styled.div`
  max-width: 5rem;

  img {
    width: 100%;
  }
`;

interface ContainerValueProps {
  lowPrice?: string | null;
}
export const ContainerValue = styled.div<ContainerValueProps>`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.3rem;

  .values {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .total {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    margin: 0 1rem;

    ${({ lowPrice }) => !lowPrice && css` background:${({ theme }) => theme.colors.primary.main};!important`}

    ${({ lowPrice }) => lowPrice === 'low' && css` background:${({ theme }) => theme.colors.success.main};`}

    ${({ lowPrice }) => lowPrice === 'hight' && css` background:${({ theme }) => theme.colors.danger.main};`}

    span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
