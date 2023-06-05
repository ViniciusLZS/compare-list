import styled from 'styled-components';

export default styled.form`
  margin-top: 1rem;

  &+& {
    margin-top: 0rem;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;


  button {
    margin-top: 3rem;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.default.black};
  }
`;
