import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 98rem;
  gap: 1rem;
`;

export const Span = styled.span`
  width: 100%;
  max-width: 53rem;
  font-size: 2rem;
  max-height: 5rem;
  text-align: center;
  overflow-x: scroll;
  white-space: nowrap;


  @media(min-width: 500px) {
    overflow-x: hidden;
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
    width: 3rem;
    }
  }
`;
