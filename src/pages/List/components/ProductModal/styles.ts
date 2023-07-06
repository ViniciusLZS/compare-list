import styled from 'styled-components';

export const Amount = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const TotalContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.gray[200]};
  }
`;

export const Total = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.default.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
`;

export const Dropdown = styled.div`
  max-width: 50rem;
  max-height: 30rem;

  position: absolute;
  z-index: 1001;
  overflow-y: scroll;

  display: block;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: white;
  margin-top: 0.5rem;
  border-radius: 4px 4px 8px 8px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 0;
    background-color: transparent;
    border: none;
    padding: 0.2rem;
    text-align: center;

    img {
      max-width: 4rem;
      max-height: 4rem;
    }
  }

  .spinner {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
