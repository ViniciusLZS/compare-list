import styled from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  width: 100%;
  max-width: 30rem;
  color: ${({ theme }) => theme.colors.default.black};
  font-size: 1.6rem;
  border: 2px solid ${({ theme }) => theme.colors.primary.main};
  background: ${({ theme }) => theme.colors.primary.main};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
`;
