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
