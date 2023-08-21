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

      transform: ${({ orderBy }: {orderBy: string}) => (orderBy === 'desc' ? 'rotate(270deg)' : 'rotate(90deg)')};
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

  margin-bottom: 8rem;

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

  @media(min-width: 800px) {
    &:hover {
      box-shadow: 0px 5px 15px ${({ theme }) => theme.colors.primary.dark};
    }
  }
`;

export const Title = styled.div`
  margin: 0 5rem;

  h2 {
    width: 100%;

    white-space: nowrap;
    overflow-x: scroll;
    text-align: center;

    font-size: 1.8rem;
    font-weight: 100;
    padding: 0.2rem;
    margin-top: 1rem;

    &::-webkit-scrollbar{
      height: 0.5rem;
    }
    &::-webkit-scrollbar-thumb{
      background: ${({ theme }) => theme.colors.gray[100]};
    }
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  a {
    width: 100%;
    max-width: 60rem;
    max-height: 12rem;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.default.black};
  }

  .compare {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    border: none;
    background-color: transparent;
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  position: relative;
`;

export const Options = styled.button`
  position: absolute;
  top: -3.5rem;
  right: 0.6rem;

  padding: 1rem;

  border: none;
  background: transparent;


  img {
    height: 2rem;
    max-width: 2rem;
  }
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

export const ContainerOptions = styled.div`
  position: absolute;
  top: -3rem;
  right: 5rem;
  z-index: 10;


  width: 100%;
  max-height: 15rem;
  max-width: 12rem;
  padding: 1rem;

  background: ${({ theme }) => theme.colors.default.white};
  box-shadow: -5px -3px 5px 0px rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;

  div {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    border: none;
    background: transparent;

    img {
      max-width: 2rem;
    }
  }
`;
