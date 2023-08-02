import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 98rem;
  height: 5rem;

  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 2rem;

  gap: 1rem;
`;

export const Title = styled.h1`
  width: 100%;
  max-width: 53rem;
  max-height: 5em;

  font-size: 2rem;
  font-weight: 500;
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

  width: 10rem;

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


  @media(max-width: 340px){
    .gridView{
      display: none;
    }
  }

  @media(min-width: 700px) {
    img {
      width: 3rem;
    }
  }
`;
