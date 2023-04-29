import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;

  span {
    max-width: 15rem;
    font-size: 2rem;
    max-height: 5rem;
    text-align: center;
    word-break: break-word;
    overflow-y: scroll;
  }

  @media(min-width: 700px) {
    span {
      max-width: 70rem;
      font-size: 2rem;
    }
  }
`;

export const FormatView = styled.div`
  display: flex;
  gap: 2rem;

  button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  }

  img {
    width: 2.5rem;
    color: red;
  }

  @media(min-width: 700px) {
    img {
    width: 3.5rem;
  }
  }
`;
