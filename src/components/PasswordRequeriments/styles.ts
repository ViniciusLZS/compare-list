import styled from 'styled-components';

export const Container = styled.div`
  max-width: 50rem;
  width: 100%;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div {
    display: flex;
    align-items: center;
    gap: 1rem;

    span {
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }

  img {
    max-width: 1.6rem;
  }
`;
