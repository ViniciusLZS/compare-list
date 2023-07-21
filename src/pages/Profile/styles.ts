import styled from 'styled-components';

export const Container = styled.section`
  padding-top: 14rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  button {
    border: none;
    background: transparent;
  }
`;

export const Image = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.colors.default.white};
    width: 9rem;
    height: 9rem;
    overflow: hidden;
    border-radius: 10rem;
  }

  img {
    max-width: 9rem;
  }
`;

export const SpinnerContainer = styled.div`
  position: absolute;
`;

export const OptionsPhoto = styled.div`
  position: absolute;
  left: -9.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10rem;

  height: 9rem;
  max-width: 30rem;
  border-radius: 10rem;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  span:last-child {
    font-size: 1.4rem;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.gray[200]};
  }
`;

export const Content = styled.div`
  margin-top: 4rem;

  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;


  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.default.black};
  }
`;

export const Card = styled.div`
  height: 20rem;
  max-width: 15rem;
  max-height: 20rem;

  display: flex;
  padding: 2.2rem 1.8rem 1.1rem 1.8rem;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;

  border-radius: 1rem;
  background: #FFF;
  box-shadow: -4px 0px 10px -4px rgba(0, 0, 0, 0.25);

  &:hover {
    p {
      color: ${({ theme }) => theme.colors.gray[300]};
    }
  }

  span {
    font-size: 1.4rem;
    font-weight: 500;
  }

  p {
    color: ${({ theme }) => theme.colors.gray[200]};
    text-align: center;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 300;
    line-height: 1.7rem;

  }
`;
