import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  max-width: 60rem;
  max-height: 15rem;

  position: fixed;
  z-index: 1000;
  margin: 0 1rem;

  background: ${({ theme }) => theme.colors.default.white};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary.dark};

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
    max-width: 10rem;
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

// export const Container = styled.section`

// `;
