import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  max-width: 60rem;
  max-height: 15rem;

  position: fixed;
  top: 9rem;
  z-index: 1000;
  margin: 0 2rem;

  background: ${({ theme }) => theme.colors.default.white};
  border-radius: 8px;

  box-shadow: 0px 5px 15px ${({ theme }) => theme.colors.primary.dark};

  .close {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    border: none;
    background-color: transparent;

    img {
      width: 2rem;
    }
  }

`;

export const Content = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 50%;
    padding: 0.5rem;
    background: ${({ theme }) => theme.colors.success.main};
    box-shadow: 0px 0px 10px rgba(81, 202, 115, 0.5);;

    img {
      max-height: 4rem;
      max-width: 3rem;
    }
  }
`;

export const Info = styled.section`
  width: 100%;
  margin-top: 2rem;

  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;

  img {
    width: 5rem;
    max-height: 3rem;
  }

  div {
    width: 100%;
    max-width: 28rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    overflow-x: scroll;

    &::-webkit-scrollbar{
        height: 5px;
      }
    &::-webkit-scrollbar-thumb{
      background: ${({ theme }) => theme.colors.gray[100]};
    }

    span {
      width: 100%;
      max-width: 24rem;
      font-size: 1.6rem;
      text-align: center;

      &:last-child {
        font-size: 1.2rem;
        color: ${({ theme }) => theme.colors.gray[200]};
      }
    }
  }

`;
