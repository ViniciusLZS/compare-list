import styled from 'styled-components';

export default styled.form`
  margin-top: 5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    margin-top: 5rem;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.default.black};
  }
`;
