import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  a{
    text-decoration: none;
  }
`;

export const Header = styled.header`
  width: 100%;
  max-width: 60rem;

  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 2.5rem;

  strong {

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

      transform: ${({ orderBy }) => (orderBy === 'asc' ? 'rotate(90deg)' : 'rotate(270deg)')};
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
  margin-top: 2rem;
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
`;

export const Card = styled.div`
  width: 100%;
  max-width: 60rem;
  max-height: 12rem;

  background-color: ${({ theme }) => theme.colors.default.white};
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 100;
  padding: 0.2rem;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  position: relative;
`;

export const Data = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
`;

export const Value = styled.div`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: 1rem;
`;

export const Trash = styled.div`
  width: 100%;
  max-width: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  button {
  background-color: transparent;
  border: none;
  }
`;
