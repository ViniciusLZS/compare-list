import styled from 'styled-components';

export const ContainerMessage = styled.div`
  width: 100%;
  max-width: 100rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;

  p {
    text-align: center;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.gray[900]};
  }
`;
