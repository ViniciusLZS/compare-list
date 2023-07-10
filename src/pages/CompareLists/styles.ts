import styled from 'styled-components';

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
  width: 100%;
  max-width: 60rem;
  max-height: 16rem;
  display: flex;
  align-items: center;
  justify-content: space-around;

  background-color: ${({ theme }) => theme.colors.default.white};
  border-radius: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
`;

export const CardSmall = styled.div`
  height: 10rem;
  width: 10rem;

  display: flex;
  justify-content: center;
`;
