import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  padding-top: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  a{
    text-decoration: none;
  }

  @media(min-width: 700px) {
    padding-top: 14rem;
  }
`;

export const Header = styled.div`
  width: 100%;
  max-width: 60rem;
  padding-top: 5rem;
  position: fixed;
  top: 8rem;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 2.5rem;
  box-shadow: 0 10px 10px 10px ${({ theme }) => theme.colors.primary.lighter};
  background: ${({ theme }) => theme.colors.primary.lighter};
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

export const ListHeader = styled.div`
  padding: 1rem;
  button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;

    span {
      margin-right: 8px;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
    }

    img {

      transform: ${({ orderBy }: {orderBy: string}) => (orderBy === 'asc' ? 'rotate(270deg)' : 'rotate(90deg)')};
      transition: transform 0.2s ease-in;
    }
  }
`;

export const EmptyList = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 10rem;
  p {
    margin: 0 2rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[200]};

    strong {
      color: ${({ theme }) => theme.colors.primary.dark};
    }
  }
  a {
    margin-top: 10rem;
  }
`;

export const List = styled.div`
  width: 100%;
  margin-top: 10rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  a {
    width: 100%;
    max-width: 60rem;
    max-height: 12rem;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.default.black};
  }

  .select {
    box-shadow: 0px 5px 15px ${({ theme }) => theme.colors.success.main};
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 60rem;
  max-height: 16rem;
  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.default.white};
  border-radius: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  transition:  background-color 0.3s ease-in;

  @media(min-width: 700px) {
    &:hover {
      box-shadow: 0px 5px 15px ${({ theme }) => theme.colors.primary.dark};
    }
  }
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 100;
  padding: 0.2rem;
  margin-top: 1rem;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  position: relative;
`;

export const Date = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  letter-spacing: 0px;
  gap: 0.5rem;
`;

export const Value = styled.div`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary.lighter};
  border-radius: 1rem;
`;

export const ContainerButton = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;

  button {
    padding: 1rem;
    background-color: transparent;
    border: none;
  }

  @media(min-width: 700px) {

  }
`;
